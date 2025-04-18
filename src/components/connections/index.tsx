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

const Connections = () => {
  const renderCard = () => (
    <Card className={styles.connectionCardContainer}>
      <CardHeader className={styles.connectionsHeader}>
        <CardTitle>Samrat</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <Avatar className={styles.connectionAvatar} />
        <div className={styles.connectionName}>Samrat</div>
      </CardContent>
      <CardFooter className={styles.connectionCardFooter}>
        <ViewProfileDialog />
        <Button className={styles.messageBtn}>Message</Button>
      </CardFooter>
    </Card>
  );
  return <div className={styles.connectionsContainer}>{renderCard()}</div>;
};

export default Connections;
