import { createSlice } from "@reduxjs/toolkit";
import { TOKEN } from "../../helpers/constants";

const initialState = {
  isLogin: false,
  id: '',
  username: '',
  full_name: '',
  avatar: '',
}

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      const { id, username, full_name, avatar } = action.payload;
      if (id !== undefined) state.id = id;
      if (username !== undefined) state.username = username;
      if (full_name !== undefined) state.full_name = full_name;
      if (avatar !== undefined) state.avatar = avatar;
      if (id !== undefined) state.isLogin = true;
    },
    signIn: (state, action) => {
      const { 
        id, username, full_name, avatar, token 
      } = action.payload;
      if (
        id !== undefined 
        && username !== undefined 
        && full_name !== undefined 
        && avatar !== undefined
      ) {
        state.isLogin = true;
        state.id = id;
        state.username = username;
        state.full_name = full_name;
        state.avatar = avatar;
        // To help to persist logged in user
        localStorage.setItem(TOKEN, token);
      }
    },
    signOut: (state) => {
      // To help to persist logged in user
      localStorage.removeItem(TOKEN);
      return initialState;
    }
  }
})

export const { updateUser, signIn, signOut } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
export const selectUser = (state) => state.user;
export default UserReducer;
