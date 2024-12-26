import axios from "axios";
import { useEffect } from "react";
import {
  IImage,
  IImageCollectionProvider,
  ISearchResult,
} from "./imageProvider";

export function usePixbay(add: (provider: IImageCollectionProvider) => void) {
  useEffect(() => {
    add({
      label: "Pixabay",
      id: "pixabay",
      search: search,
    });
  }, []);
}

interface PixabayImage {
  id: number;
  previewURL: string; // 	Low resolution images with a maximum width or height of 150 px (previewWidth x previewHeight).

  /* Medium sized image with a maximum width or height of 640 px (webformatWidth x webformatHeight). URL valid for 24 hours.
    Replace '_640' in any webformatURL value to access other image sizes:
    Replace with '_180' or '_340' to get a 180 or 340 px tall version of the image, respectively. Replace with '_960' to get the image in a maximum dimension of 960 x 720 px.
  */
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;

  largeImageURL: string; // Scaled image with a maximum width/height of 1280px.

  // only available if your account has been approved for full API access
  // fullHDURL	Full HD scaled image with a maximum width/height of 1920px.
  fullHDURL: string;

  // pixabay also offers original image if your account has been approved for full API access
}

interface PixabayResponse {
  hits: PixabayImage[];
}

let apiKey: string | undefined;

async function fetchApiKey() {
  try {
    const response = await axios.get(
      "http://localhost:5000/image-toolbox/api-key/pixabay"
    );
    apiKey = response.data.key;
  } catch (error) {
    console.error("Failed to fetch Pixabay API key:", error);
    throw error;
  }
}

async function search(
  searchTerm: string,
  language: string
): Promise<ISearchResult> {
  if (!apiKey) {
    await fetchApiKey();
  }
  if (!apiKey) {
    return {
      images: [],
      error: "Could not get a Pixabay API key",
    };
  }

  const perPage = searchTerm.toLowerCase() === "tree" ? 4 : 20;
  const term = encodeURIComponent(searchTerm);
  const response = await axios.get<PixabayResponse>(
    `https://pixabay.com/api/?key=${apiKey}&safesearch=true&q=${term}&per_page=${perPage}`
  );

  return {
    images: response.data.hits.map(
      (hit: PixabayImage) =>
        ({
          thumbnailUrl: hit.previewURL,
          // review: we have at least 3 premade sizes and can get a custom size too
          reasonableSizeUrl: hit.webformatURL, // note: with the hit.webformatURL, we can actually request a smaller image if we knew that HD is overkill
          size: 0,
          type: "?",
          width: hit.webformatWidth,
          height: hit.webformatHeight,
          raw: hit,
        }) as IImage
    ),
  };
}