import PendingConnections from "@components/connections/pending-connections";
import { CONNECTION_STATUS } from "@constants/app-defaults";
import axiosServerInstance from "@services/axios/server";

const RequestsPage = async () => {
  const { data: pendingConnections } = await axiosServerInstance.get(
    "/connections",
    {
      params: {
        connectionStatus: CONNECTION_STATUS.PENDING,
      },
    },
  );
  return (
    <PendingConnections
      data={pendingConnections.data}
      nextCursor={pendingConnections.nextCursor}
    />
  );
};

export default RequestsPage;
