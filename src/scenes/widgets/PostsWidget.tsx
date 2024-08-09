import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
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
import { useEffect } from "react";

import { Post, iState, setPosts } from "../../state";
import PostWidget from "./PostWidget";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const PostsWidget = ({
  userId,
  isProfile,
}: {
  userId: string;
  isProfile: boolean;
}) => {
  const dispatch = useDispatch();
  const Posts = useSelector((state: iState) => state.posts);
  const { palette } = useTheme();
  const token = useSelector((state: iState) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const getPosts = async () => {
    const response = await fetch(`${BASE_API_URL}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts: Post[] = await response.json();
    dispatch(setPosts({ posts }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`${BASE_API_URL}/${userId}/posts/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts: Post[] = await response.json();
	console.log(posts)
    dispatch(setPosts({ posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {Posts.length > 0 && Posts.map(
        ({
          _id,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPhoto,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPhoto={userPhoto}
            likes={likes}
            comments={comments}
          />
        ),
      )}
    </>
  );
};

export default PostsWidget;
