import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

export interface UserI {
  _id: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  friends: Array<{ [key: string]: string }>;
  occupation: string;
  location: string;
  photo: string;
  viewedProfileNumber: number
}

export interface Post {
  description: string;
  picturePath: string;
  likes: { [key: string]: boolean };
  comments: Array<string>;
  _id: string;
  firstName: string;
  lastName: string;
  location: string;
  userPhoto: string;
  userId: string;
}

export interface iState {
  mode: PaletteMode;
  user: null | UserI;
  token: null | string;
  posts: Array<Post>;
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
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }

        return post;
      });
    },
    setProfile: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setPost,
  setPosts,
  setFriends,
  setProfile,
} = authSlice.actions;
export default authSlice.reducer;
