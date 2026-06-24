import { useEffect, useRef, useState } from "react";

import Skeleton from "react-loading-skeleton";
interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
}

const Img = ({ width, height, className, ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setIsLoading(false);
  }, []);

  return (
    <div className="block leading-none w-full h-full">
      {isLoading && (
        <Skeleton width={width ?? "100%"} height={height ?? "100%"} />
      )}

      <img
        {...props}
        className={`w-full h-full object-cover ${className}`}
        style={{ display: isLoading ? "none" : "block" }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default Img;
