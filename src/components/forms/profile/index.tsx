"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Pencil } from "lucide-react";

import { IconUpload, IconTrashXFilled } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label, LabelInputContainer } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import ErrorMsg from "@components/ui/error-msg";
import CustomFileUploadInput from "@components/ui/custom-file-upload-input.tsx";
import { Textarea } from "@components/ui/textarea";
import ImageCropperModal from "@components/ui/image-cropper/modal";

import { getCroppedImage } from "@helpers/image-cropper";

import { ProfileSchema } from "@schema-validations/profile";

import { DEFAULT_FORM_VALUES } from "@components/forms/registration/constants";

import styles from "./main.module.css";

const defaultObj = {};

const ProfileView = () => {
  const { register, handleSubmit, formState, getValues, getFieldState } =
    useForm<z.input<typeof ProfileSchema>>({
      resolver: zodResolver(ProfileSchema),
      defaultValues: DEFAULT_FORM_VALUES,
    });
  const [file, setFile] = useState<File | null>(null);
  const [profileImageCropInfo, setProfileImageCropInfo] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { errors } = formState;
  const {
    firstName: firstNameError,
    lastName: lastNameError,
    profileImageFile: profileImageFileError,
    bio: bioError,
  } = errors || defaultObj;

  const profileImageUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return imageUrl;
  }, [file, imageUrl]);

  const avatarRef = useRef<HTMLDivElement>(null);

  const onSubmit: SubmitHandler<z.input<typeof ProfileSchema>> = (
    data,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    console.log("Form submitted");
  };

  const { onChange: onImageCropInfoChange } = register("profileImageCropInfo");
  const { onChange: onProfileImageChange } = register("profileImageFile");

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setFile(null);
    setOpen(false);
    setProfileImageCropInfo(null);
  };

  const handleSave = async () => {
    setOpen(false);
    onProfileImageChange({ target: { name: "profileImageFile", value: file } });
    onImageCropInfoChange({
      target: { name: "profileImageCropInfo", value: profileImageCropInfo },
    });
    if (profileImageCropInfo && file) {
      const imageSrc = URL.createObjectURL(file);
      let avatarSize = 240;
      if (avatarRef.current) {
        const { width, height } = avatarRef.current.getBoundingClientRect();
        avatarSize = Math.round(Math.min(width, height));
      }
      const cropped = await getCroppedImage(
        imageSrc,
        profileImageCropInfo,
        avatarSize,
      );
      setImageUrl(cropped);
      URL.revokeObjectURL(imageSrc);
      return;
    }
    setImageUrl(profileImageUrl);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.title}>Profile Settings</div>
          <form className={styles.form}>
            <div className={styles.formContent}>
              <div className={styles.inputContainer}>
                <LabelInputContainer className={styles.labelInputContainer}>
                  <Label htmlFor="firstName" className={styles.label}>
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    type="text"
                    {...register("firstName")}
                    error={firstNameError}
                  />
                  <ErrorMsg error={firstNameError} />
                </LabelInputContainer>
                <LabelInputContainer className={styles.labelInputContainer}>
                  <Label htmlFor="lastName" className={styles.label}>
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    type="text"
                    {...register("lastName")}
                    error={lastNameError}
                  />
                  <ErrorMsg error={lastNameError} />
                </LabelInputContainer>
                <LabelInputContainer className={styles.labelInputContainer}>
                  <Label htmlFor="bio" className={styles.label}>
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Doe"
                    {...register("bio")}
                    error={bioError}
                    className={styles.textarea}
                  />
                  <ErrorMsg error={bioError} />
                </LabelInputContainer>
              </div>
              <div>
                <div className={styles.avatarContainer}>
                  <Avatar
                    className={styles.avatar}
                    src={imageUrl}
                    initials="JD"
                    ref={avatarRef}
                  />
                  <Button
                    className={styles.editButton}
                    onClick={(e) => {
                      e?.preventDefault();
                    }}
                  >
                    <Pencil className={styles.editIcon} />
                  </Button>
                </div>
                <ErrorMsg error={profileImageFileError} />
                <div className={styles.uploadContainer}>
                  <CustomFileUploadInput
                    animate={false}
                    onChange={handleProfileImageChange}
                    setFile={setFile}
                    file={file}
                    accept="image/jpeg,image/png,image/webp"
                  >
                    <div className={styles.uploadButton}>
                      <IconUpload className={styles.uploadIcon} />
                    </div>
                  </CustomFileUploadInput>
                  <Button
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e?.preventDefault();
                      setImageUrl("");
                      setFile(null);
                    }}
                    variant="ghost"
                  >
                    <IconTrashXFilled />
                  </Button>
                </div>
              </div>
            </div>
            <Button type="submit" className={styles.submitButton}>
              Save
            </Button>
          </form>
        </div>
      </div>
      <ImageCropperModal
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        image={profileImageUrl}
        onImageInfoChange={setProfileImageCropInfo}
      />
    </>
  );
};

export default ProfileView;
