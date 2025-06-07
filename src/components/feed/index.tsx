"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./main.module.css";

import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchFeed } from "@apis/feed";
import { CONNECTION_STATUS } from "@constants/app-defaults";
import {
  updateConnectionStatus,
  type ConnectionStatusData,
} from "@apis/connection";
import { User } from "types/user";

type FeedProps = {
  data: User[];
  nextCursor: string;
};

const DEFAULT_FEED_LIMIT = 10;

const Feed = ({ data, nextCursor }: FeedProps) => {
  const [feedData, setFeedData] = useState(data);
  const [nextDataCursor, setNextDataCursor] = useState(nextCursor);
  const [[currentProfileIndex, swipeDirection], setProfileState] = useState([
    0, 1,
  ]);

  const eventSourceRef = useRef<EventSource | null>(null);

  const currentProfile = feedData[currentProfileIndex] || {};
  const { firstName, lastName, profile, id } = currentProfile;
  const { bio = "", croppedProfileImageUrl: profileImg = "" } = profile || {};

  const { data: newData, isLoading } = useQuery({
    queryKey: ["feed", nextDataCursor],
    queryFn: () => fetchFeed({ nextCursor: nextDataCursor }),
    enabled: feedData.length - currentProfileIndex < DEFAULT_FEED_LIMIT,
    refetchOnWindowFocus: false,
  });

  const { mutate: changeConnectionStatus } = useMutation({
    mutationFn: (data: ConnectionStatusData) => updateConnectionStatus(data),
  });

  useEffect(() => {
    if (newData) {
      setFeedData((prev) => [...prev, ...newData.data]);
      setNextDataCursor(newData.nextCursor);
    }

    const remainingProfiles = feedData.length - currentProfileIndex;

    if (remainingProfiles < DEFAULT_FEED_LIMIT && !eventSourceRef.current) {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/feed/stream?cursor=${nextDataCursor}`,
        {
          withCredentials: true,
        },
      );

      eventSource.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          if (newData.data.length > 0) {
            setFeedData((prev) => {
              const newRemaining =
                prev.length - currentProfileIndex + newData.data.length;
              if (newRemaining >= DEFAULT_FEED_LIMIT) {
                eventSource.close();
                eventSourceRef.current = null;
              }
              return [...prev, ...newData.data];
            });
            setNextDataCursor(newData.nextCursor);
          }
        } catch {
          console.log(event.data);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        eventSourceRef.current = null;
      };

      eventSourceRef.current = eventSource;
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [currentProfileIndex, feedData.length, nextDataCursor, newData]);

  const variants = {
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleLike = () => {
    changeConnectionStatus({
      receiverId: Number(id),
      connectionStatus: CONNECTION_STATUS.PENDING,
    });
    setProfileState([currentProfileIndex + 1, 1]);
  };

  const handlePass = () => {
    changeConnectionStatus({
      receiverId: Number(id),
      connectionStatus: CONNECTION_STATUS.REJECTED,
    });
    setProfileState([currentProfileIndex + 1, -1]);
  };

  const renderNoMoreProfiles = () => (
    <section className={styles.noMoreProfiles}>
      {isLoading ? "Loading more profiles..." : "No more profiles to show"}
    </section>
  );

  const renderCard = () => (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <figure className={styles.avatarContainer}>
          <Avatar
            src={profileImg}
            initials={`${firstName?.[0]}${lastName?.[0]}`}
            className={styles.avatar}
          />
        </figure>
        <h2>
          {firstName} {lastName}
        </h2>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.bio}>{bio}</div>
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

  return (
    <div className={styles.feedContainer}>
      <AnimatePresence mode="wait" custom={swipeDirection}>
        <motion.div
          key={id || "no-profile"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit="exit"
          custom={swipeDirection}
          variants={variants}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) handleLike();
            if (swipe > swipeConfidenceThreshold) handlePass();
          }}
        >
          {currentProfileIndex >= feedData.length
            ? renderNoMoreProfiles()
            : renderCard()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Feed;
