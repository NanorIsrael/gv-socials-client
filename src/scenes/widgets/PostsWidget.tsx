import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Post, iState, setPosts } from "../../state";
import PostWidget from "./PostWidget";
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const PostsWidget = ({
  loggedInUserId,
  isProfile,
}: {
  loggedInUserId: string;
  isProfile: boolean;
}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: iState) => state.posts);
  const token = useSelector((state: iState) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${BASE_API_URL}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts: Post[] = await response.json();
	if (posts) {
		console.log(posts)
		dispatch(setPosts({ posts }));
	}
  };

  const getUserPosts = async () => {
    const response = await fetch(`${BASE_API_URL}/posts/${loggedInUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts: Post[] = await response.json();
    if (posts) {
		dispatch(setPosts({ posts }));
	}
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
      {
	  posts.length > 0 &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            postPhoto,
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
              postPhoto={postPhoto}
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
