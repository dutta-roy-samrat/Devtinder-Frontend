import AcceptedConnections from "@components/connections/accepted-connections";
import { CONNECTION_STATUS } from "@constants/app-defaults";
import { getAxiosServerInstance } from "@services/axios/server";

const ConnectionsPage = async () => {
  const axiosInstance = await getAxiosServerInstance();
  const { data: acceptedConnections } = await axiosInstance.get(
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
