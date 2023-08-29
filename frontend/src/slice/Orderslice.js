import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "OrderDetail",
  initialState: {
    Data: [],
  },
  reducers: {
    PlaceorderData: (state, data) => {
      const Detail = data.payload;

      state.Data = Detail;
    },
  },
});
export default OrderSlice.reducer;
export const { PlaceorderData } = OrderSlice.actions;
