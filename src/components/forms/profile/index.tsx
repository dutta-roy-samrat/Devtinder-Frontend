"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Pencil } from "lucide-react";
import { IconUpload, IconTrashXFilled } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Label, LabelInputContainer } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import ErrorMsg from "@components/ui/error-msg";
import CustomFileUploadInput from "@components/ui/custom-file-upload-input.tsx";
import { Textarea } from "@components/ui/textarea";
import ImageCropperModal from "@components/ui/image-cropper/modal";
import { useAuthContext } from "@contexts/auth";
import { ProfileSchema } from "@schema-validations/profile";
import { updateProfileApi } from "@apis/profile";
import { getAllDirtyFields } from "@helpers/form";
import { AvatarImageCropInfo } from "@components/ui/avatar-editor";

import styles from "./main.module.css";

type FormValues = z.input<typeof ProfileSchema>;

const ProfileView = () => {
  const { mutate: updateProfile } = useMutation({
    mutationFn: updateProfileApi,
  });
  const userProfile = useAuthContext();

  const {
    profile,
    firstName: currentFirstName,
    lastName: currentLastName,
  } = userProfile;

  const {
    profileImageCropInfo: currentProfileImageCropInfo,
    bio: currentBio,
    croppedProfileImageUrl: currentImageUrl,
    originalProfileImageUrl: currentOriginalImageUrl,
  } = profile;

  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const defaultValues = useMemo<FormValues>(
    () => ({
      firstName: currentFirstName,
      lastName: currentLastName,
      originalProfileImageFile: null,
      profileImageCropInfo: currentProfileImageCropInfo,
      croppedProfileImageBlob: null,
      bio: currentBio,
    }),
    [
      currentFirstName,
      currentLastName,
      currentProfileImageCropInfo,
      currentBio,
    ],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
  });

  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImageUrl || "");
  const [isEditing, setIsEditing] = useState(false);

  const avatarRef = useRef<HTMLDivElement>(null);

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const initials = useMemo(() => {
    const firstInitial = firstName?.trim()?.[0]?.toUpperCase() || "";
    const lastInitial = lastName?.trim()?.[0]?.toUpperCase() || "";
    return firstInitial + lastInitial;
  }, [firstName, lastName]);

  const profileImageUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : currentOriginalImageUrl),
    [file, currentOriginalImageUrl],
  );
  const formData = watch();

  useEffect(() => {
    const dirtyFields = getAllDirtyFields({ data: formData, defaultValues });
    if (
      Object.keys(dirtyFields).length !== 0 ||
      !(imageUrl && currentImageUrl)
    ) {
      return setIsBtnDisabled(false);
    }
    return setIsBtnDisabled(true);
  }, [defaultValues, currentImageUrl, imageUrl, formData]);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data, e) => {
      e?.preventDefault();
      const formData = new FormData();
      const dirtyFields = getAllDirtyFields({ data, defaultValues });
      Object.entries(dirtyFields).forEach(([key, value]) => {
        if (key === "profileImageCropInfo") {
          formData.append(key, JSON.stringify(value));
          return;
        }
        if (value instanceof Blob) {
          formData.append(
            key,
            value,
            `${getValues("originalProfileImageFile")?.name || currentOriginalImageUrl.split("original/")[1]}`,
          );
          return;
        }
        formData.append(key, value as string);
      });

      if (!imageUrl && currentImageUrl) {
        formData.append("originalProfileImageFile", new File([], ""));
        formData.append("croppedProfileImageBlob", new Blob());
      }

      updateProfile(formData);
    },
    [
      currentImageUrl,
      currentOriginalImageUrl,
      defaultValues,
      getValues,
      imageUrl,
      updateProfile,
    ],
  );

  const handleProfileImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        setOpen(true);
      }
    },
    [],
  );

  const handleClose = useCallback(() => {
    setFile(getValues("originalProfileImageFile") || null);
    setOpen(false);
    setIsEditing(false);
  }, [getValues]);

  const handleSave = useCallback(
    async ({
      imageCropInfo,
      canvas,
    }: {
      imageCropInfo: AvatarImageCropInfo;
      canvas: HTMLCanvasElement;
    }) => {
      setOpen(false);
      setValue("originalProfileImageFile", file);
      setValue("profileImageCropInfo", imageCropInfo);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg"),
      );

      if (blob) {
        setValue("croppedProfileImageBlob", blob);
        setImageUrl(URL.createObjectURL(blob));
      }
    },
    [file, setValue],
  );

  const handleDeleteProfileImage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setImageUrl("");
      setFile(null);
      setValue("originalProfileImageFile", null);
      setValue("croppedProfileImageBlob", null);
    },
    [setValue],
  );

  const handleEditProfileImage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsEditing(true);
      setOpen(true);
    },
    [],
  );

  return (
    <div className={styles.formContainer}>
      <div className={styles.title}>Profile Settings</div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                error={errors.firstName}
              />
              <ErrorMsg error={errors.firstName} />
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
                error={errors.lastName}
              />
              <ErrorMsg error={errors.lastName} />
            </LabelInputContainer>

            <LabelInputContainer className={styles.labelInputContainer}>
              <Label htmlFor="bio" className={styles.label}>
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                {...register("bio")}
                error={errors.bio}
                className={styles.textarea}
              />
              <ErrorMsg error={errors.bio} />
            </LabelInputContainer>
          </div>

          <div>
            <div className={styles.avatarContainer}>
              <Avatar
                className={styles.avatar}
                src={imageUrl}
                initials={initials}
                ref={avatarRef}
              />
              {(imageUrl || file) && (
                <Button
                  className={styles.editButton}
                  onClick={handleEditProfileImage}
                  aria-label="Edit profile image"
                >
                  <Pencil className={styles.editIcon} />
                </Button>
              )}
            </div>

            <ErrorMsg error={errors.originalProfileImageFile} />

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
                onClick={handleDeleteProfileImage}
                variant="ghost"
                aria-label="Delete profile image"
              >
                <IconTrashXFilled />
              </Button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className={styles.submitButton}
          disabled={isBtnDisabled}
        >
          Save
        </Button>
      </form>
      <ImageCropperModal
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        imageCropInfo={isEditing ? getValues("profileImageCropInfo") : null}
        image={profileImageUrl}
      />
    </div>
  );
};

const ProfileFormWrapper = () => {
  const { isLoading } = useAuthContext();
  return (
    <div className={styles.container}>
      {isLoading ? <Loader2 className={styles.loader} /> : <ProfileView />}
    </div>
  );
};

export default ProfileFormWrapper;
