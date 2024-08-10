import {
  DeleteOutlined,
  EditOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  ShareOutlined,
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
import { useState } from "react";

import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { iState, setPost } from "../../state";
import Friends from "../../components/Friends";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPhoto,
  likes,
  comments,
}: {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath: string;
  userPhoto: string;
  likes: { [key: string]: boolean };
  comments: Array<string>;
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: iState) => state.user);
  const token = useSelector((state: iState) => state.token);

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const [isComments, setIsComments] = useState(false);
  const isLikes = Boolean(user && likes[user?._id]);
  const likesCount = Object.keys(likes).length;

  if (!user) {
    return null;
  }

  const patchLikes = async () => {
    const response = await fetch(`${BASE_API_URL}/posts/${postId}/like`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m={"2rem 0"}>
      <Friends friendId={postUserId} name={name} subtile={location} />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          src={`${BASE_API_URL}/assets/${picturePath}}`}
          alt="post"
          width={"100%"}
          height={"auto"}
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
          }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={patchLikes}>
              {isLikes ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>

          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={patchLikes}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
