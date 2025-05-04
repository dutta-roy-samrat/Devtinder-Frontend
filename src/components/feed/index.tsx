"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./main.module.css";

import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";

interface ProfileData {
  fullName: string;
  bio: string;
  age: number;
  profileImg: string;
  id: string;
}

interface FeedProps {
  data: ProfileData[];
}

const defaultObj = {};

const Feed = ({ data }: FeedProps) => {
  const [[currentProfileIndex, swipeDirection], setProfileState] = useState([
    0, 1,
  ]);
  const { fullName, bio, age, profileImg, id } =
    data[currentProfileIndex] || defaultObj;

  const variants = {
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 200 : -200,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleLike = () => {
    setProfileState([currentProfileIndex + 1, 1]);
  };
  const handlePass = () => {
    setProfileState([currentProfileIndex + 1, -1]);
  };

  const renderNoMoreProfiles = () => (
    <section className={styles.noMoreProfiles}>
      No more profiles to show
    </section>
  );

  const renderCard = () => {
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];
    return (
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <figure className={styles.avatarContainer}>
            <Avatar
              src={profileImg}
              initials={`${firstName[0]}${lastName[0]}`}
              className={styles.avatar}
            />
          </figure>
          <h2>{fullName}</h2>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div>Age: {age} years</div>
        </CardContent>
        <CardFooter className={styles.cardFooter}>
          <Button
            variant="outline"
            className={styles.likeButton}
            name="like"
            onClick={handleLike}
          >
            Like
          </Button>
          <Button className={styles.passButton} name="pass" onClick={handlePass}>
            Pass
          </Button>
        </CardFooter>
      </Card>
    );
  };
  return (
    <div className={styles.feedContainer}>
      <AnimatePresence mode="wait" custom={swipeDirection}>
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              return handleLike();
            }
            if (swipe > swipeConfidenceThreshold) {
              return handlePass();
            }
          }}
        >
          {currentProfileIndex === data.length
            ? renderNoMoreProfiles()
            : renderCard()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Feed;
