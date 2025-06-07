"use client";
import capitalize from "lodash/capitalize";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import styles from "./main.module.css";
import { User } from "types/user";

const ProfileView = ({ data }: { data: User }) => {
  const router = useRouter();
  const onBack = useCallback(() => {
    router.back();
  }, [router]);

  const {
    id = "",
    age = 0,
    gender = "",
    firstName = "",
    lastName = "",
    profile,
    skills = [],
  } = data || {};

  const { croppedProfileImageUrl = "", bio = "" } = profile || {};

  const initials = useMemo(() => {
    const firstInitial = firstName?.trim()?.[0]?.toUpperCase() || "";
    const lastInitial = lastName?.trim()?.[0]?.toUpperCase() || "";
    return firstInitial + lastInitial;
  }, [firstName, lastName]);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Profile</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className={styles.leftContent}>
            <div className={styles.fieldContainer}>
              <div className={styles.title}>First Name</div>
              <div className={styles.value}>{firstName}</div>
            </div>

            <div className={styles.fieldContainer}>
              <div className={styles.title}>Last Name</div>
              <div className={styles.value}>{lastName}</div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldContainer}>
                <div className={styles.title}>Gender</div>
                <div className={styles.value}>{capitalize(gender)}</div>
              </div>

              <div className={styles.fieldContainer}>
                <div className={styles.title}>Age</div>
                <div className={styles.value}>{age} years</div>
              </div>
            </div>
            <div className={styles.fieldContainer}>
              <div className={styles.title}>Bio</div>
              <p className={bio ? styles.bio : styles.bioPlaceholder}>
                {bio || "Not added yet"}
              </p>
            </div>
            <div className={styles.fieldContainer}>
              <div className={styles.title}>Skills</div>
              <p
                className={
                  skills.length ? styles.skills : styles.skillsPlaceholder
                }
              >
                {skills.length
                  ? skills.map((skill) => skill.name).join(", ")
                  : "Not added yet"}
              </p>
            </div>
          </div>
          <div className={styles.rightContent}>
            <Avatar
              className={styles.avatar}
              src={croppedProfileImageUrl}
              initials={initials}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onBack}>Back</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileView;
