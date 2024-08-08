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
import { useNavigate } from "react-router-dom";

import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { iState, setPosts } from "../../state";
import Dropzone from "react-dropzone";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const MyPostWidget = ({ picturePath }: { picturePath: string }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState<string>("");
  const { palette } = useTheme();
  const user = useSelector((state: iState) => state.user);
  const token = useSelector((state: iState) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  if (!user) {
    return null;
  }
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", post);

    if (image) {
      formData.append("photo", image);
      formData.append("picturePath", image.name);
    }
    const response = await fetch(`${BASE_API_URL}/posts}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const posts: Post[] = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap={"1.5rem"} pb={"1.1rem"}>
        <FlexBetween gap={"1rem"} width={"100%"}>
          <UserImage image={picturePath} size="60px" />
          <InputBase
            placeholder="What is on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
      </FlexBetween>
      {isImage && (
        <Box
          mt={"1rem"}
          p={"1rem"}
          borderRadius={"5px"}
          border={`1px solid ${medium}`}
        >
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width={"100%"}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.2rem 0" }} />
      {/* SECOND ROW */}
      <FlexBetween>
        <FlexBetween gap={"0.25rem"} onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: { mediumMain } }} />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": {
                color: { medium },
                cursor: "pointer",
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap={"0.25rem"}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap={"0.25rem"}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap={"0.25rem"}>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap={"0.25rem"}>
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        {/* Boolean(post.length < 1).toString()} */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.default,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};
export interface Post {
  description: String;
  picturePath: String;
  likes: Map<String, String>;
  comments: Array<String>;
}

export default MyPostWidget;
