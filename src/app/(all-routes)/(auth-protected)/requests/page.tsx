import PendingConnections from "@components/connections/pending-connections";
import { CONNECTION_STATUS } from "@constants/app-defaults";
import { getAxiosServerInstance } from "@services/axios/server";

const RequestsPage = async () => {
  const axiosInstance = await getAxiosServerInstance();
  const { data: pendingConnections } = await axiosInstance.get(
    "/connections",
    {
      params: {
        connectionStatus: CONNECTION_STATUS.PENDING,
    }
  });
  return <PendingConnections data={pendingConnections.data} nextCursor={pendingConnections.nextCursor}/>;
};

export default RequestsPage;


