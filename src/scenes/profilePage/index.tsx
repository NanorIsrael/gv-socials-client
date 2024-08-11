import {
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { iState } from "../../state";
import UserWidget from "../widgets/UserWidget";
import FriendsListWidget from "../widgets/FriendListWidget";
import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state: iState) => state.token);
  const [user, setUser] = useState<iState | null>(null);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const getUser = async () => {
    const response = await fetch(`${BASE_API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }
  return (
    <Box>
      <Box
        width={"100%"}
        padding={"2rem 6%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap={"0.5rem"}
        justifyContent={"center"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId as string} photo={user?.photo} isProfile />
          <Box m={"2rrem 0"} />
          <FriendsListWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={""} />
          <Box m={"2rrem 0"} />
          <PostsWidget userId={userId as string} isProfile />
        </Box>
      </Box>
    </Box>
  );
};
export default ProfilePage;
