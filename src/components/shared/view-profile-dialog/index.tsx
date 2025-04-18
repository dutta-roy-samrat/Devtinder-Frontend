import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";

import styles from "./main.module.css";

const ViewProfileDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className={styles.profileViewTrigger}>View Profile</Button>
    </DialogTrigger>
    <DialogContent className={styles.profileViewModalContentContainer}>
      <DialogHeader className={styles.profileViewDialogHeader}>
        <Avatar className={styles.profileAvatar} />
        <DialogTitle>Samrat</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className={styles.profileViewDialogFooter}>
        <DialogClose className={styles.profileDialogCloseBtn}>
          Close
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ViewProfileDialog;
