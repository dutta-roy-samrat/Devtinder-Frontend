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

  const handleZoomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setZoom(Number(e.target.value));
    },
    [],
  );

  console.log(image);

  return (
    <>
      <div
        className={cn(styles.container, containerClassName)}
        style={{ height: `${height}px`, width: `${width}px` }}
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
            maxZoom={8}
          />
        )}
      </div>
      <div
        className={cn(styles.zoomInputContainer, zoomInputContainerClassName)}
      >
        <Input
          type="range"
          id="zoom"
          min={1}
          max={8}
          step={0.1}
          value={zoom}
          onChange={handleZoomChange}
          className={cn(styles.zoomRange, zoomRangeClassName)}
          style={{ width: `${width}px` }}
          animate={false}
        />
      </div>
    </>
  );
};

export default ImageCropper;
