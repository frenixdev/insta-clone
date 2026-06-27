import { useState } from "react";
import Input from "./Input";
import { CiInboxOut } from "react-icons/ci";

type Props = {
  width?: string;
  height?: string;
  itemRef: React.RefObject<HTMLInputElement | null>;
};

const ImagePreview = ({ width = "100%", height = "100%", itemRef }: Props) => {
  const [url, setUrl] = useState<string | null>(null);

  const handleInputChange = () => {
    const file = itemRef?.current?.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUrl(url);
  };
  return (
    <div>
      <label
        htmlFor="file"
        className={`cursor-pointer block`}
        style={{ width, height }}
      >
        {url && (
          <img
            src={url}
            alt={"image"}
            className="w-1/2 h-auto object-contain mx-auto"
          />
        )}
        {!url && (
          <div className="flex items-center justify-center flex-col border border-dashed p-5 ">
            <CiInboxOut className="w-30 h-30 text-zinc-400" />
            <p className="text-center text-zinc-300 font-semibold">
              upload image
            </p>
          </div>
        )}
      </label>
      <Input
        ref={itemRef}
        type="file"
        id="file"
        name="image-file"
        accept="image/*"
        hidden
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ImagePreview;
