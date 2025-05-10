export type CropArea = { x: number; y: number; width: number; height: number };

export const getCroppedImage = async (
  image: string,
  croppedArea: CropArea,
  outputSize: number = 240,
): Promise<string> => {
  if (!image || !croppedArea) {
    throw new Error("Image or cropped area is missing");
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.src = image;
  if (!img.complete) {
    await new Promise((resolve) => {
      img.onload = resolve;
    });
  }

  const cropPx = {
    x: Math.floor((croppedArea.x / 100) * img.naturalWidth),
    y: Math.floor((croppedArea.y / 100) * img.naturalHeight),
    width: Math.floor((croppedArea.width / 100) * img.naturalWidth),
    height: Math.floor((croppedArea.height / 100) * img.naturalHeight),
  };

  canvas.width = outputSize;
  canvas.height = outputSize;

  if (ctx) {
    ctx.drawImage(
      img,
      cropPx.x,
      cropPx.y,
      cropPx.width,
      cropPx.height,
      0,
      0,
      outputSize,
      outputSize,
    );

    const padding = outputSize * 0.01;
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(
      outputSize / 2,
      outputSize / 2,
      outputSize / 2 - padding,
      0,
      Math.PI * 2,
    );
    ctx.closePath();
    ctx.fill();
  }

  return canvas.toDataURL("image/png");
};
