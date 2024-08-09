import { useSelector } from "react-redux";
import { iState } from "../../state";
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from "../widgets/MyPostWidget";
import UserWidget from "../widgets/UserWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendsListWidget from "../widgets/FriendListWidget";

const HomePage = ({ userId }: { userId: string }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, photo } = useSelector((state: iState) => state.user);

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
          <UserWidget userId={_id} photo={photo} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={""} />
		  <PostsWidget userId={userId} isProfile={false} />
        </Box>
        {isNonMobileScreens && <Box flexBasis={"26%"}>
			<AdvertWidget/>
			<Box m={"2rrem 0"} />
			<FriendsListWidget />
		</Box>}
      </Box>

    </Box>
  );
};

export default HomePage;
