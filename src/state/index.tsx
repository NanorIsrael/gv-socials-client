import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

export interface UserI {
  _id: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  friends: Array<string>;
  occupation: string;
  lacation: string;
  photo: string;
}

export interface iState {
  mode: PaletteMode;
  user: null | UserI;
  token: null | string;
  posts: Array<{
    _id: string;
  }>;
}

const initialState: iState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      (state.user = action.payload.user), (state.token = action.payload.token);
    },
    setLogout: (state) => {
      (state.user = null), (state.token = null);
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setPost, setPosts, setFriends } =
  authSlice.actions;
export default authSlice.reducer;
