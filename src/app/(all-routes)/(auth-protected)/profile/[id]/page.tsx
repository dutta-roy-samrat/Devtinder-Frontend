import ProfileView from "@components/profile/view";
import { getAxiosServerInstance } from "@services/axios/server";

const ProfileViewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const axiosInstance = await getAxiosServerInstance();
  const { id } = await params;
  const response = await axiosInstance.get("/profile", {
    params: {
      id,
    },
  });
  return <ProfileView data={response?.data} />;
};

export default ProfileViewPage;
