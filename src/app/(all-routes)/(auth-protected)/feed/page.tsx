import Feed from "@components/feed";

const FeedPage = () => {
  return (
      <Feed
        data={[
          {
            id: "1" ,
            fullName: "John Doe",
            bio: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaFull Stack Developer | React & Node.js enthusiast",
            age: 28,
            profileImg: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: "2",
            fullName: "Jane Smith",
            bio: "Frontend Developer | UI/UX Specialist",
            age: 25,
            profileImg: "https://i.pravatar.cc/150?img=2",
          },
          {
            id: "3",
            fullName: "Mike Johnson",
            bio: "Backend Developer | Python & Django",
            age: 30,
            profileImg: "https://i.pravatar.cc/150?img=3",
          },
        ]}
      />
  );
};

export default FeedPage;
