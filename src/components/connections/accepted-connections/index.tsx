"use client";

import ConnectionsCard from "@components/connections/card";
import styles from "./main.module.css";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getConnections } from "@apis/connection";
import { CONNECTION_STATUS } from "@constants/app-defaults";
import { User } from "types/user";
import { useEffect, useRef, useCallback } from "react";
import { queryClient } from "@services/tanstack/client";
import SpinnerLoader from "@components/ui/spinner-loader";

const defaultArr: any[] = [];

const DEFAULT_LIMIT = 10;

const AcceptedConnections = ({
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
      queryKey: ["acceptedConnections", CONNECTION_STATUS.ACCEPTED],
      queryFn: ({ pageParam }) => {
        return getConnections({
          pageParam: {
            connectionStatus: CONNECTION_STATUS.ACCEPTED,
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
      "acceptedConnections",
      CONNECTION_STATUS.ACCEPTED,
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

  const acceptedConnections =
    data?.pages.flatMap((page) => page.data || defaultArr) || defaultArr;

  // const renderButtonBasedOnStatus = useCallback(
  //   ({ requesteeId }: { requesteeId: string }) => (
  //     <Button className={styles.messageBtn}>Message</Button>
  //   ),
  //   [],
  // );

  return (
    <div className={styles.connectionsContainer}>
      {acceptedConnections?.length > 0 ? (
        acceptedConnections.map((connection) => (
          <ConnectionsCard
            key={connection.id}
            data={connection}
            // renderButtonBasedOnStatus={renderButtonBasedOnStatus}
          />
        ))
      ) : (
        <div className={styles.noConnections}>
          You don&apos;t have any connections yet
        </div>
      )}

      {hasNextPage && <div ref={observedRef} className={styles.sentinelDiv} />}

      {isFetchingNextPage && <SpinnerLoader />}
    </div>
  );
};

export default AcceptedConnections;
