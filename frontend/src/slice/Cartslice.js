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
    cart: (state, data) => {
      const item = data.payload;
      console.log(item);

      const existitem = state.CartItem.find((x) => {
        return x.productId === item.productId;
      });

      if (existitem) {
        state.CartItem = state.CartItem.map((x) => {
          return x.productId === item.productId ? item : x;
        });
      } else {
        state.CartItem = [...state.CartItem, item];
      }
    },
 
  },
});

export default CartSlice.reducer;
export const { cart, price } = CartSlice.actions;
