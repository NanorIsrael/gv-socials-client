import { useSelector } from "react-redux";
import { iState } from "../../state";
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from "../widgets/MyPostWidget";
import UserWidget from "../widgets/UserWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendsListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const user = useSelector((state: iState) => state.user);

  if (!user) {
    return null;
  }
  return (
    <Box>
      <Box
        width={"100%"}
        padding={"2rem"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap={"0.5rem"}
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} photo={user.photo} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={""} />
          <PostsWidget loggedInUserId={user._id} isProfile={false} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis={"26%"}>
            <AdvertWidget />
            <Box m={"2rem 0"} />
            <FriendsListWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
