import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Cart/Cart.css";
import { RemovefromCart, price } from "../../slice/Cartslice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [price, setprice] = useState({});
  const [cartqty, setcartQty] = useState(0);
  const [tax, settax] = useState(50);

  const dispatch = useDispatch();

  console.log(productdata.CartItem);

  const totalprice = product.CartItem.reduce(
    (price, value) => price + value.productPrice,
    0
  );

  const totalQty = cartqty;

  const navigate = useNavigate();

  const checkout = (e) => {
    e.preventDefault();

    cartqty * totalprice === 0
      ? alert("Buy some Product")
      : navigate("/checkout");
  };

  return (
    <>
      <div className="cart" style={{ color: "aliceblue" }}>
        <Container className=" Cart-box ">
          <div className="row pt-5">
            <Col className=" " md={8}>
              <h1>{`Shopping Cart ( ${product.CartItem.length} item)`}</h1>

              <div className="cart-box ">
                {product.CartItem.map((cartI) => {
                  return (
                    <div
                      className="cart-item d-flex"
                      style={{
                        marginBottom: "5%",
                        alignItems: "center",
                        gap: "4%",
                        justifyContent: "space-between",
                      }}
                    >
                      <img src={cartI.ProductImg} alt="" />
                      <div className="name-brand" style={{}}>
                        <h1>{cartI.productName}</h1>
                        <p> {` Brand : ${cartI.productBrand}`}</p>
                      </div>

                      <select onChange={(e) => setcartQty(e.target.value)}>
                        {[...Array(cartI.productStock).keys()].map((qty) => {
                          return (
                            <>{<option value={qty + 1}>{qty + 1}</option>}</>
                          );
                        })}
                      </select>

                      <p className="price"> {`Rs: ${cartI.productPrice}`}</p>

                      <Button
                        className="btn"
                        style={{ color: "red" }}
                        onClick={(e) => Deletehandler(e, cartI.productId)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>

            <Col className=" Summary " md={4}>
              <Col className="summary_box">
                <h5>Order Summary</h5>

                <div
                  className="subtotal d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5>Subtotal </h5>

                  <p>{cartqty * totalprice}</p>
                </div>

                <div
                  className="tax d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5>Shipping + Tax </h5>

                  <p>{tax}</p>
                </div>

                <div
                  className="coupon d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5>Coupon code </h5>

                  <p>
                    <Link> Add coupon code </Link>
                  </p>
                </div>

                <div
                  className="total d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5>Total </h5>

                  <p> {cartqty * totalprice + tax}</p>
                </div>

                <Button fullWidth onClick={checkout}>
                  CheckOut
                </Button>
              </Col>

              <Col className="text-center mt-5">
                <h5>
                  or <Link to="/home"> Continue Shopping </Link>
                </h5>
              </Col>
            </Col>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Cart;
