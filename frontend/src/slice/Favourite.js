import { createSlice } from "@reduxjs/toolkit";

const favourite = createSlice({
  name: "Wishlist",

  initialState: {
    WishlistData: [],
    
  },
  reducers: {
    favouritelist: (state, data) => {
      const listdata = data.payload;
      const Duplicatedata = state.WishlistData.find((x) => {
        return x.id === listdata.id;
      });
      if (Duplicatedata) {
        state.WishlistData = state.WishlistData.map((check) => {
          return check.id === listdata.id ? listdata : check;
        });
      } else {
        state.WishlistData = [...state.WishlistData, listdata];
      }


      
    },
  },
});

export default favourite.reducer;
export const { favouritelist } = favourite.actions;
