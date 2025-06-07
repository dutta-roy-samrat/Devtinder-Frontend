import axiosInstance from "@services/axios/client";

import { CONNECTION_STATUS } from "@constants/app-defaults";

export type ConnectionStatusData = {
  receiverId: number;
  connectionStatus: keyof typeof CONNECTION_STATUS;
};

export type RequestStatusData = {
  requesteeId: number;
  connectionStatus: keyof typeof CONNECTION_STATUS;
};

export const updateConnectionStatus = async (data: ConnectionStatusData) => {
  const res = await axiosInstance.post(`/connections`, data);
  return res.data;
};

export const patchConnectionStatus = async (data: RequestStatusData) => {
  const res = await axiosInstance.patch(`/connections`, data);
  return res.data;
};

export const getConnections = async ({
  pageParam,
}: {
  pageParam: {
    connectionStatus: keyof typeof CONNECTION_STATUS;
    cursor: string | null;
  };
}) => {
  const res = await axiosInstance.get(`/connections`, {
    params: {
      connectionStatus: pageParam.connectionStatus,
      cursor: pageParam.cursor,
    },
  });
  return res.data;
};
