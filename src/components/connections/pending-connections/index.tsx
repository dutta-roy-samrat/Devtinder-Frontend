"use client";

import ConnectionsCard from "@components/connections/card";
import styles from "./main.module.css";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import {
  getConnections,
  patchConnectionStatus,
  RequestStatusData,
} from "@apis/connection";
import { CONNECTION_STATUS } from "@constants/app-defaults";
import { User } from "types/user";
import { useEffect, useRef, useCallback } from "react";
import { queryClient } from "@services/tanstack/client";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Button } from "@components/ui/button";
import SpinnerLoader from "@components/ui/spinner-loader";

const defaultArr: any[] = [];

const DEFAULT_LIMIT = 10;

const PendingConnections = ({
  data: initialData,
  nextCursor: initialCursor,
}: {
  data: User[];
  nextCursor: string;
}) => {
  const observedRef = useRef<HTMLDivElement>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pendingConnections", CONNECTION_STATUS.PENDING],
      queryFn: ({ pageParam }) => {
        return getConnections({
          pageParam: {
            connectionStatus: CONNECTION_STATUS.PENDING,
            cursor: pageParam,
          },
        });
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
      initialData: () => ({
        pages: [{ data: initialData, nextCursor: initialCursor }],
        pageParams: [null],
      }),
    });

  const { mutate: changeConnectionStatus } = useMutation({
    mutationFn: (data: RequestStatusData) => patchConnectionStatus(data),
  });

  const isInView = () =>
    observedRef.current &&
    observedRef.current.getBoundingClientRect().top < window.innerHeight + 200;

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasNextPage) return;
    loadingRef.current = true;
    try {
      await fetchNextPage();
    } catch (error) {
      observerInstance.current?.disconnect();
    }
    const latestData = queryClient.getQueryData([
      "pendingConnections",
      CONNECTION_STATUS.PENDING,
    ]) as InfiniteData<{ data: User[]; nextCursor: string }>;

    if (
      latestData?.pages[latestData.pages.length - 1].data.length < DEFAULT_LIMIT
    ) {
      observerInstance.current?.disconnect();
    } else if (isInView()) {
      loadMore();
    }

    loadingRef.current = false;
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const currentRef = observedRef.current;

    observerInstance.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    if (currentRef) observerInstance.current?.observe(currentRef);

    return () => {
      if (currentRef) observerInstance.current?.disconnect();
    };
  }, [loadMore]);

  const pendingConnections =
    data?.pages.flatMap((page) => page.data || defaultArr) || defaultArr;

  const handleConnectionStatus = useCallback(
    ({ connectionId }: { connectionId: string }) => {
      queryClient.setQueryData(
        ["pendingConnections", CONNECTION_STATUS.PENDING],
        (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              data: page.data.filter(
                (connection: User) => connection.id !== connectionId,
              ),
            })),
          };
        },
      );
    },
    [],
  );

  const handleAcceptConnection = useCallback(
    ({ requesteeId }: { requesteeId: string }) => {
      changeConnectionStatus({
        requesteeId: Number(requesteeId),
        connectionStatus: CONNECTION_STATUS.ACCEPTED,
      });
      handleConnectionStatus({ connectionId: requesteeId });
    },
    [changeConnectionStatus, handleConnectionStatus],
  );

  const handleRejectConnection = useCallback(
    ({ requesteeId }: { requesteeId: string }) => {
      changeConnectionStatus({
        requesteeId: Number(requesteeId),
        connectionStatus: CONNECTION_STATUS.REJECTED,
      });
      handleConnectionStatus({ connectionId: requesteeId });
    },
    [changeConnectionStatus, handleConnectionStatus],
  );

  const renderButtonBasedOnStatus = useCallback(
    ({ requesteeId }: { requesteeId: string }) => (
      <>
        <Button
          className={styles.messageBtn}
          onClick={() => handleAcceptConnection({ requesteeId })}
        >
          &#10003;
        </Button>
        <Button
          className={styles.messageBtn}
          onClick={() => handleRejectConnection({ requesteeId })}
        >
          &#10005;
        </Button>
      </>
    ),
    [handleAcceptConnection, handleRejectConnection],
  );

  return (
    <div className={styles.connectionsContainer}>
      {pendingConnections?.length > 0 ? (
        pendingConnections.map((connection) => (
          <AnimatePresence mode="wait" key={connection.id}>
            <motion.div
              key={connection.id || "no-profile"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <ConnectionsCard
                data={connection}
                renderButtonBasedOnStatus={renderButtonBasedOnStatus}
              />
            </motion.div>
          </AnimatePresence>
        ))
      ) : (
        <div className={styles.noConnections}>No pending connections</div>
      )}

      {hasNextPage && <div ref={observedRef} className={styles.sentinelDiv} />}

      {isFetchingNextPage && <SpinnerLoader />}
    </div>
  );
};

export default PendingConnections;
