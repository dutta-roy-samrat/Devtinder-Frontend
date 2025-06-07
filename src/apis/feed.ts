import axiosInstance from "@services/axios/client";

export const fetchFeed = async ({ nextCursor }: { nextCursor: string }) => {
  const res = await axiosInstance.get("/feed", {
    params: {
      cursor: nextCursor,
      limit: 5,
    },
  });
  return res.data;
};
