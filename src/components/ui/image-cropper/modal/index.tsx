import { Button } from "@components/ui/button";
import { DialogFooter, DialogTitle, DialogHeader } from "@components/ui/dialog";
import { Dialog, DialogContent } from "@components/ui/dialog";
import ImageCropper from "@components/ui/image-cropper";

import { CropArea } from "@helpers/image-cropper";

import styles from "./main.module.css";

const ImageCropperModal = ({
  open,
  onClose,
  onSave,
  image,
  onImageInfoChange,
}: {
  open: boolean;
  onClose: () => void;
  image: string;
  onImageInfoChange: (value: CropArea) => void;
  onSave: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader className={styles.dialogHeader}>
          <DialogTitle>Crop Profile Image</DialogTitle>
        </DialogHeader>
        <ImageCropper image={image} onImageInfoChange={onImageInfoChange} />
        <DialogFooter className={styles.dialogFooter}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropperModal;
