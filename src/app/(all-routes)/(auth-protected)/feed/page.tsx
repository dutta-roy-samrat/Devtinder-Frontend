import Feed from "@components/feed";
import { getAxiosServerInstance } from "@services/axios/server";

const FeedPage = async () => {
  const axiosInstance = await getAxiosServerInstance();
  const res = await axiosInstance.get("/feed");
  const data = res.data;
  return <Feed {...data} />;
};

export default FeedPage;
