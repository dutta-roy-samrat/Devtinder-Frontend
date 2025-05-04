import { Loader2 } from "lucide-react";

import styles from "./main.module.css";

const PageLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Loader2 className={styles.loader} />
    </div>
  );
};

export default PageLoader;
