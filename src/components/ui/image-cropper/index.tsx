"use client";

import React, { forwardRef, useCallback, useState } from "react";
import type AvatarEditor from "react-avatar-editor";

import { Input } from "@components/ui/input";
import AvatarEditorComponent, {
  AvatarImageCropInfo,
} from "@components/ui/avatar-editor";

import { cn } from "@lib/utils";

import styles from "./main.module.css";

const ImageCropper = forwardRef<
  AvatarEditor,
  {
    image: string;
    containerClassName?: string;
    zoomRangeClassName?: string;
    width?: number;
    height?: number;
    imageCropInfo?: AvatarImageCropInfo | null;
  }
>(
  (
    {
      image,
      containerClassName,
      zoomRangeClassName,
      width = 240,
      height = 240,
      imageCropInfo,
    },
    ref,
  ) => {
    const [zoom, setZoom] = useState(imageCropInfo?.scale || 1);
    const [position, setPosition] = useState({
      x: imageCropInfo?.crop?.x || 0,
      y: imageCropInfo?.crop?.y || 0,
    });

    const handleZoomChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setZoom(Number(e.target.value));
      },
      [],
    );

    const handlePositionChange = useCallback(
      (newPosition: { x: number; y: number }) => {
        setPosition(newPosition);
      },
      [],
    );

    return (
      <>
        <div className={cn(styles.container, containerClassName)}>
          {image && (
            <AvatarEditorComponent
              ref={ref}
              image={image}
              width={width}
              height={height}
              color={[0, 0, 0, 0.6]}
              scale={zoom}
              rotate={0}
              borderRadius={150}
              className={styles.avatarEditor}
              position={position}
              onPositionChange={handlePositionChange}
              crossOrigin="use-credentials"
            />
          )}
          <Input
            type="range"
            id="zoom"
            min={1}
            max={5}
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
  },
);

ImageCropper.displayName = "ImageCropper";

export default ImageCropper;
