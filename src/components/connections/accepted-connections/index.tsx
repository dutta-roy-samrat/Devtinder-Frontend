import ConnectionsCard from "@components/connections/card";
import styles from "./main.module.css";

const AcceptedConnections = () => {
  return (
    <div className={styles.connectionsContainer}>
      <ConnectionsCard status="accepted" />
    </div>
  );
};

export default AcceptedConnections;
