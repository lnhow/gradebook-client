import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  id: '',
  username: '',
  avatar: '',
}

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      const { id, username, avatar } = action.payload;
      if (id !== undefined) state.id = id;
      if (username !== undefined) state.username = username;
      if (avatar !== undefined) state.avatar = avatar;
      if (id !== undefined) state.isLogin = true;
    },
    signIn: (state, action) => {
      const { id, name, avatar } = action.payload;
      if (id !== undefined && name !== undefined && avatar !== undefined) {
        state.isLogin = true;
        state.id = id;
        state.username = name;
        state.avatar = avatar;
        // To help to persist logged in user
        localStorage.setItem('isSignedIn', true);
      }
    },
    signOut: (state) => {
      // To help to persist logged in user
      localStorage.setItem('isSignedIn', false);
      return initialState;
    }
  }
})

export const { updateUser, signIn, signOut } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
export const selectUser = (state) => state.user;
export default UserReducer;
