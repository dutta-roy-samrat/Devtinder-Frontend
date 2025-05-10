"use client";

import { Input, InputProps } from "@components/ui/input";
import { ReactNode, useEffect, useRef } from "react";
import { Label } from "@components/ui/label";

const CustomFileUploadInput = ({
  children,
  label,
  labelClassName,
  showFileName = false,
  onChange,
  name,
  required,
  btnContainerClassName,
  file,
  setFile,
  ...props
}: {
  children: ReactNode;
  label?: string;
  labelClassName?: string;
  showFileName?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  btnContainerClassName?: string;
  setFile: (file: File | null) => void;
  file: File | null;
} & InputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fileInputRef.current && !file) {
      fileInputRef.current.value = "";
    }
  }, [file]);

  return (
    <div>
      {label && <div className={labelClassName}>{label}</div>}
      <Input
        type="file"
        className="hidden"
        id="file-upload-input"
        onChange={onChange}
        ref={fileInputRef}
        {...props}
      />
      {showFileName && file && <div>{file.name}</div>}
      <Label htmlFor="file-upload-input">{children}</Label>
    </div>
  );
};

CustomFileUploadInput.displayName = "CustomFileUploadInput";

export default CustomFileUploadInput;
