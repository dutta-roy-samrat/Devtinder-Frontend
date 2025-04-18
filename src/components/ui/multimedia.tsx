import Image, { ImageProps } from "next/image";

type MultimediaImageProps = { alt: string } & ImageProps;
type CommonProps = {
  type?: "image" | "video" | "audio" | "text" | "file";
};

const Multimedia = ({
  type = "image",
  alt = "",
  ...rest
}: MultimediaImageProps & CommonProps) => {
  if (type === "image") {
    return <Image alt={alt} {...rest} />;
  }
  return "";
};

export default Multimedia;
