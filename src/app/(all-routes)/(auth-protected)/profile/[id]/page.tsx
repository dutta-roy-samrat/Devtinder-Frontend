import ProfileView from "@components/profile/view";

import axiosServerInstance from "@services/axios/server";

const ProfileViewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const response = await axiosServerInstance.get("/profile", {
    params: {
      id,
    },
  });
  return <ProfileView data={response?.data} />;
};

export default ProfileViewPage;
