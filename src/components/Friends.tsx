import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

import { Box, Typography, useTheme, IconButton } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { iState, setFriends } from "../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const Friends = ({
  friendId,
  name,
  subtile,
}: {
  friendId: string;
  name: string;
  subtile: string;
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: iState) => state.user);
  const navigate = useNavigate();
  const token = useSelector((state: iState) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = user?.friends?.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `${BASE_API_URL}/users/${user?._id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap={"1rem"}>
        <UserImage image={user?.photo as string} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight={500}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize={"0.75rem"}>
            {subtile}
          </Typography>
        </Box>
      </FlexBetween>
      {user?._id !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};
export default Friends;
