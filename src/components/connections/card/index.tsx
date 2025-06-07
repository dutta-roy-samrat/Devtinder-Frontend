"use client";

import ViewProfileDialog from "@components/shared/view-profile-dialog";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter } from "@components/ui/card";

import styles from "./main.module.css";
import { User } from "types/user";
import { patchConnectionStatus, RequestStatusData } from "@apis/connection";
import { useMutation } from "@tanstack/react-query";
import { CONNECTION_STATUS } from "@constants/app-defaults";
import StyledLink from "@components/ui/styled-link";
const ConnectionsCard = ({
  data,
  renderButtonBasedOnStatus,
}: {
  data: User;
  renderButtonBasedOnStatus?: ({
    requesteeId,
  }: {
    requesteeId: string;
  }) => React.ReactNode;
}) => {
  const { id: requesteeId, firstName, lastName, profile } = data;
  const { croppedProfileImageUrl } = profile || {};
  const initials = firstName[0] + lastName[0];

  return (
    <Card className={styles.connectionCardContainer}>
      <CardContent className={styles.cardContent}>
        <Avatar
          className={styles.connectionAvatar}
          src={croppedProfileImageUrl}
          initials={initials}
        />
        <div className={styles.connectionName}>
          {firstName} {lastName}
        </div>
      </CardContent>
      <CardFooter className={styles.connectionCardFooter}>
        <StyledLink href={`/profile/${requesteeId}`}>View Profile</StyledLink>
        {renderButtonBasedOnStatus?.({ requesteeId })}
      </CardFooter>
    </Card>
  );
};

export default ConnectionsCard;
