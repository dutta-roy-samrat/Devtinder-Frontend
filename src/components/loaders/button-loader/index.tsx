import { cn } from "@lib/utils";

import styles from "./main.module.css";

const ButtonLoader = ({ className = "", numOfLoaders = 3 }) => (
  <div className={styles.loaderContainer}>
    {Array.from({ length: numOfLoaders }).map((_, index) => (
      <div
        key={index}
        className={cn(styles.buttonLoaderDefault, className)}
      ></div>
    ))}
  </div>
);

export default ButtonLoader;
