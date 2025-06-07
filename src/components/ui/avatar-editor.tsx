import { ComponentClass } from "react";
import AvatarEditorComponent from "react-avatar-editor";

type AvatarEditorInstance = {
  getImage: () => HTMLCanvasElement;
  getImageScaledToCanvas: () => HTMLCanvasElement;
  getCroppingRect: () => AvatarEditorComponent.CroppedRect;
};

const AvatarEditor = AvatarEditorComponent as unknown as ComponentClass<AvatarEditorComponent.AvatarEditorProps> & { new(): AvatarEditorInstance & { props: AvatarEditorComponent.AvatarEditorProps } };

export type AvatarImageCropInfo = {
  scale: number;
  crop: {
    x: number;
    y: number;
  };
};

export default AvatarEditor;