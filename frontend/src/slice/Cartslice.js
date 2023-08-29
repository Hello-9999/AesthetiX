import { createSlice } from "@reduxjs/toolkit";
import Cart from "../Pages/Cart/Cart";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    CartItem: [],
    ShippingAddress: {},
    PaymentMethod: {},
  },
  reducers: {
    Addtocart: (state, data) => {
      const item = data.payload;

      const duplicateData = state.CartItem.find((check) => {
        return check.productId === item.productId;
      });

      if (duplicateData) {
        state.CartItem = state.CartItem.map((check) => {
          return check.productId === item.productId ? item : check;
        });
      } else {
        state.CartItem = [...state.CartItem, item];
      }
    },
    RemovefromCart: (state, id) => {
      state.CartItem = state.CartItem.filter((check) => {
        return check.productId !== id.payload;
      });
    },
    ShippingDetail: (state, data) => {
      state.ShippingAddress = data.payload;
    },
    PaymentDetail: (state, data) => {
      state.PaymentMethod = data.payload;
    },
  },
});

export default CartSlice.reducer;
export const {
  Addtocart,
  price,
  ShippingDetail,
  RemovefromCart,
  CartQty,
  PaymentDetail,
} = CartSlice.actions;
