import Feed from "@components/feed";

import axiosServerInstance from "@services/axios/server";

const FeedPage = async () => {
  const res = await axiosServerInstance.get("/feed");
  const data = res.data;
  return <Feed {...data} />;
};

export default FeedPage;
