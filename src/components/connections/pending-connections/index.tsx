import ConnectionsCard from "@components/connections/card";
import styles from "./main.module.css";

const PendingConnections = () => {
  return (
    <div className={styles.connectionsContainer}>
      <ConnectionsCard status="pending" />
    </div>
  );
};

export default PendingConnections;
