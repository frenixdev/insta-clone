import { useState } from "react";
import Button from "../../feature/auth/components/Button";
import { downloadFile } from "../utils";
import { CiSaveDown2 } from "react-icons/ci";
import { FiRefreshCcw } from "react-icons/fi";
import Loader from "./Loader";

type Props = {
  imgUrl: string;
  title: string;
};

const DownloadFile = (props: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleDownload = async () => {
    setIsDownloading(true);
    setIsError(false);
    try {
      await downloadFile(props.imgUrl, props.title);
    } catch (error) {
      console.log('Download Failed: ',error);
      setIsError(true);
      setTimeout(()=> setIsError(false), 3000)
    } finally {
      setIsDownloading(false);
    }
  };
  if (isDownloading)
    return (
      <div className="w-7 h-7 flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <Button onClick={handleDownload} disabled={isDownloading}>
      {!isError ? (
        <CiSaveDown2 className="w-7 h-7" />
      ) : (
        <FiRefreshCcw className="w-7 h-7 text-red-500" />
      )}
    </Button>
  );
};

export default DownloadFile;
