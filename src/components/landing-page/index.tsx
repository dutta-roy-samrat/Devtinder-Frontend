import Multimedia from "@components/ui/multimedia";

import StyledLink from "@components/ui/styled-link";
import PageTransition from "@components/page-transition";

import { LOGIN, REGISTER } from "@constants/routes";

import styles from "./main.module.css";

const LandingPage = () => (
  <PageTransition>
    <div className={styles.content}>
      <div className={styles.centered}>
        <h1 className={styles.heading}>Devtinder</h1>
        <h2 className={styles.subheading}>
          Connects with Developers Worldwide
        </h2>
        <p className={styles.paragraph}>
          Join our global community of developers. Share knowledge, collaborate
          on projects, and grow your network.
        </p>
        <StyledLink href={REGISTER.url} className={styles.ctaButton}>
          Create Account
        </StyledLink>
        <p className={styles.loginText}>
          Already have an account?{" "}
          <StyledLink href={LOGIN.url} className={styles.loginLink}>
            Login
          </StyledLink>
        </p>
      </div>
    </div>
  </PageTransition>
);

export default LandingPage;
