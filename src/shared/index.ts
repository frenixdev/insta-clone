//* Api
export { api } from "./lib/axios";

//* Components
export { default as Img } from "./components/Img";
export { default as Input } from "./components/Input";
export { default as Loader } from "./components/Loader";
export { default as Button } from "./components/Button";
export { default as NavBar } from "./components/NavBar";
export { default as ErrorText } from "./components/ErrorText";
export { default as PageLoader } from "./components/PageLoader";
export { default as ImagePreview } from "./components/ImagePreview";
export { default as DownloadFile } from "./components/DownloadFile";

//* Utilites
export { getErrMsg } from "./utils/getError";
export { getTimeAgo } from "./utils/getTimeAgo";
export { downloadFile } from "./utils/downloadFile";
