"use client";

import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

import { Input } from "@components/ui/input";

import { CropArea } from "@helpers/image-cropper";
import { cn } from "@lib/utils";

import styles from "./main.module.css";

const ImageCropper = ({
  image = "",
  containerClassName = "",
  cropAreaClassName = "",
  zoomRangeClassName = "",
  cropperContainerClassName = "",
  zoomInputContainerClassName = "",
  onImageInfoChange,
  width = 240,
  height = 240,
}: {
  image: string;
  containerClassName?: string;
  cropAreaClassName?: string;
  zoomRangeClassName?: string;
  cropperContainerClassName?: string;
  zoomInputContainerClassName?: string;
  onImageInfoChange: (value: CropArea) => void;
  width?: number;
  height?: number;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea: CropArea) => {
    onImageInfoChange(croppedArea);
  }, []);

  return (
    <>
      <div
        className={cn(
          styles.container,
          `h-[${height}px] w-[${width}px]`,
          containerClassName,
        )}
      >
        {image && (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
            objectFit="contain"
            showGrid={false}
            restrictPosition={false}
            cropSize={{ width, height }}
            classes={{
              containerClassName: cn(
                styles.cropperContainer,
                cropperContainerClassName,
              ),
              cropAreaClassName: cn(styles.cropArea, cropAreaClassName),
            }}
          />
        )}
      </div>
      <div
        className={cn(
          styles.zoomInputContainer,
          zoomInputContainerClassName,
        )}
      >
        <Input
          type="range"
          id="zoom"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className={cn(
            styles.zoomRange,
            `w-[${width}px]`,
            zoomRangeClassName,
          )}
          animate={false}
        />
      </div>
    </>
  );
};

export default ImageCropper;
