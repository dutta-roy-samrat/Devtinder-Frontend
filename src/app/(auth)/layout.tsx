import styles from "./main.module.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.formContainer}>
      {children}
    </div>
  );
};

export default AuthLayout;
