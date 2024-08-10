import {
  DeleteOutlined,
  EditOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
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

import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { iState, setFriends, setPosts } from "../../state";
import Friends from "../../components/Friends";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const FriendsListWidget = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: iState) => state.token);
  const user = useSelector((state: iState) => state.user);
  const friends = useSelector((state: iState) => state.user?.friends);

  const { palette } = useTheme();

  const getFriends = async () => {
    const response = await fetch(`${BASE_API_URL}/users/${user?._id}/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const friends = await response.json();
    dispatch(setFriends({ friends }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight={"500"}
        sx={{ mb: "1.5rem" }}
      >
        Friends
      </Typography>
      <Box display={"flex"} flexDirection={"column"} gap={"1.5rem"}>
        {friends &&
          friends.map((friend) => (
            <Friends
              key={friend?._id}
              friendId={friend._id}
              name={`${friend?.firstName} ${friend.lastName}`}
              subtile={`${friend.occupation}`}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};
// userPicturePath={friend.picturePath}

export default FriendsListWidget;
