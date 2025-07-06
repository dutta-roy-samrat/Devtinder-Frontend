import AcceptedConnections from "@components/connections/accepted-connections";

import axiosServerInstance from "@services/axios/server";

import { CONNECTION_STATUS } from "@constants/app-defaults";

const ConnectionsPage = async () => {
  const { data: acceptedConnections } = await axiosServerInstance.get(
    "/connections",
    {
      params: {
        connectionStatus: CONNECTION_STATUS.ACCEPTED,
      },
    },
  );
  return (
    <AcceptedConnections
      data={acceptedConnections.data}
      nextCursor={acceptedConnections.nextCursor}
    />
  );
};

export default ConnectionsPage;
