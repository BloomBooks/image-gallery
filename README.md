Currently, this is just the start of a project to re-implement the existing libpalaso Image Toolbox as react component.

## Stack

- [ViteJS](https://vitejs.dev/)
- Typescript
- [MUI](https://mui.com/)
- [Emotion](https://emotion.sh)
- [Express](https://expressjs.com/) (for backend server used for API development and image collection access)
- [Axios](https://axios-http.com/) (for calling API functions)
- [concurrently](https://github.com/open-cli-tools/concurrently) (to run front end and back end at same time for development)

## Design

It might eventually look something like this:
![image](https://user-images.githubusercontent.com/8448/147300507-7bba8dd1-b7e7-4125-ab36-851580170b86.png)

## Project setup

```
yarn install
```

### Compiles both front end and back end

```
yarn build
```

### Compiles front end and hot-reloads for development

```
yarn dev
```
