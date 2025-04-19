"use client";

import LoggedInNav from "@components/navbar/web/logged-in";
import LoggedOutNav from "@components/nav-links/logged-out";

const WebNavBar = () => {
  const isLoggedIn = false; // Replace with actual authentication logic
  return isLoggedIn ? (
    <LoggedInNav />
  ) : (
    <div className="flex gap-2">
      <LoggedOutNav />
    </div>
  );
};

export default WebNavBar;
