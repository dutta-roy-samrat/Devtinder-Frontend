import ViewProfileDialog from "@components/shared/view-profile-dialog";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

import styles from "./main.module.css";

const ConnectionsCard = ({ status }: { status: "accepted" | "pending" }) => {
  const renderButtonBasedOnStatus = () => {
    if (status === "accepted") {
      return <Button className={styles.messageBtn}>Message</Button>;
    }
    return (
      <>
        <Button className={styles.messageBtn}>&#10003;</Button>
        <Button className={styles.messageBtn}>&#10005;</Button>
      </>
    );
  };
  return (
    <Card className={styles.connectionCardContainer}>
      <CardHeader className={styles.connectionsHeader}>
        <CardTitle>Samrat</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <Avatar className={styles.connectionAvatar} src="" initials="SD" />
        <div className={styles.connectionName}>Samrat</div>
      </CardContent>
      <CardFooter className={styles.connectionCardFooter}>
        <ViewProfileDialog />
        {renderButtonBasedOnStatus()}
      </CardFooter>
    </Card>
  );
};

export default ConnectionsCard;
