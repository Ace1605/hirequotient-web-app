import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSaved: {
      reducer(state, action) {
        state.user = action.payload;
      },
      prepare(mid) {
        return {
          payload: {
            mid,
          },
        };
      },
    },
    userRemoved: (state, id) => {
      const list = [...state.user];
      console.log(list);
      list.splice(id, 1);
      state.user = list;
    },
    clearCurrentUsers: {
      reducer(state) {
        state.gallery = [];
      },
    },
  },
});

export const selectUser = (state) => state.user.user.mid;

export const { userSaved, userRemoved, clearCurrentUsers } = userSlice.actions;

export default userSlice.reducer;
