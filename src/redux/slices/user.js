import { createSlice } from "@reduxjs/toolkit";
import { TOKEN, USER_INFO } from "../../helpers/constants";

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
        localStorage.setItem(USER_INFO, JSON.stringify(action.payload));
      }
    },
    signOut: (state) => {
      // To help to persist logged in user
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER_INFO);
      return initialState;
    }
  }
})

export const { updateUser, signIn, signOut } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
export const selectUser = (state) => state.user;
export default UserReducer;
