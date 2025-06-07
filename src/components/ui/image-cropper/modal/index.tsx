import { useRef, useCallback } from "react";
import type AvatarEditor from "react-avatar-editor";

import { Button } from "@components/ui/button";
import { DialogFooter, DialogTitle, DialogHeader } from "@components/ui/dialog";
import { Dialog, DialogContent } from "@components/ui/dialog";
import ImageCropper from "@components/ui/image-cropper";
import { AvatarImageCropInfo } from "@components/ui/avatar-editor";

// import { CropArea } from "@helpers/image-cropper";

import styles from "./main.module.css";

const ImageCropperModal = ({
  open,
  onClose,
  onSave,
  image,
  imageCropInfo,
}: {
  open: boolean;
  onClose: () => void;
  image: string;
  onSave: ({
    imageCropInfo,
    canvas,
  }: {
    imageCropInfo: AvatarImageCropInfo;
    canvas: HTMLCanvasElement;
  }) => void;
  imageCropInfo?: AvatarImageCropInfo | null;
}) => {
  const editorRef = useRef<AvatarEditor>(null);

  const handleSave = useCallback(() => {
    const croppedArea = editorRef.current;
    if (croppedArea) {
      const { position, scale } = croppedArea.props;
      const canvas = editorRef.current.getImageScaledToCanvas();
      onSave({
        imageCropInfo: {
          scale: scale as number,
          crop: position as AvatarEditor.Position,
        },
        canvas,
      });
    }
  }, [editorRef, onSave]);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader className={styles.dialogHeader}>
          <DialogTitle>Crop Profile Image</DialogTitle>
        </DialogHeader>
        <ImageCropper
          image={image}
          imageCropInfo={imageCropInfo}
          ref={editorRef}
        />
        <DialogFooter className={styles.dialogFooter}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropperModal;
