import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Cart/Cart.css";
import { CartQty, RemovefromCart, price } from "../../slice/Cartslice";
import { Link, useNavigate } from "react-router-dom";
import Signin from "../Signin/Signin";
import SigninModal from "./Modal";
import Bar from "../../Component/Navbar/Navbar";

const Cart = () => {
  const product = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.login);
  const [Display, setDisplay] = useState(false);
  const [Hide, setHide] = useState(false);

  const [tax, settax] = useState(50);
  const dispatch = useDispatch();
  const [cartQty, setcartQty] = useState(0);
  const [productQty, setproductQty] = useState({});
  const [productPrice, setproductprice] = useState("");
  const navigate = useNavigate();

  // console.log(product)

  if (product.CartItem.length === 0) {
  } else {
    // const Totalqty = product.CartItem.reduce((total, next) => {
    //   console.log(total.qty)
    //   // return total.qty + next.qty;
    // });
    // console.log(Totalqty)
    // const Totalprice = product.CartItem.reduce((total, next) => {
    //   return total.price + next.price;
    // });
    // console.log(Totalqty)
    // console.log(Totalprice)
  }

  // setproductQty(Totalqty)

  // console.log(Totalqty)

  const Totalqty = product.CartItem.reduce((total, next) => {
    // console.log(next)

    return total + next.qty;
  }, 0);
  console.log(Totalqty);

  const Totalprice = product.CartItem.reduce((total, next) => {
    return total + next.price;
  }, 0);

  console.log(Totalprice, "price");

  const Deletehandler = (e, id) => {
    e.preventDefault();
    dispatch(RemovefromCart(id));
  };

  const checkout = (e) => {
    e.preventDefault();
    console.log(profile.isLoggediin);
    if (profile.isLoggediin === true) {
      // navigate("/shipping");
    } else {
      // alert('you must Sigin')
      setDisplay(true);
      setHide(false);
    }
  };
  const Shopnow =(e)=>{
    e.preventDefault()
    navigate('/shop')
  }
  return (
    <>
      <SigninModal Display={Display} Hide={Hide} setDisplay={setDisplay} />
      <Bar/>

      {product.CartItem.length === 0 ? (
        <>
          {/* {navigate("/shop")} {alert(" You must have product in cart !! ")} */}

          <div className="notfound" style={{color:'aliceblue', backgroundColor:'#cacaca', height:'100vh'}}>
             <img src="https://o.remove.bg/downloads/2bbd3642-f63c-4f9f-b2a9-9d78f7581fc3/image-removebg-preview.png" alt="" />

             <h6> Your  Cart is empty !!</h6>

             <Button variant="contained"  onClick={Shopnow}>Shop Now </Button>
             
             </div>

        </>
      ) : (
        <>
          {" "}
          <div className="cart" style={{ color: "aliceblue" }}>
            <Container className=" Cart-box ">
              <div
                className="d-flex pt-5 w-90"
                style={{ flexWrap: "wrap", justifyContent: "space-between" }}
              >
                <Col className="col-6 " md={8} style={{ width: "50%" }}>
                  <h1>{`Shopping Cart ( ${product.CartItem.length} item)`}</h1>

                  <div className="cart-box ">
                    {product.CartItem.map((cartI) => {
                      return (
                        <div
                          className="cart-item d-flex"
                          style={{
                            marginBottom: "5%",
                            alignItems: "center",
                            gap: "10%",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="col-4">
                            <img
                              src={cartI.productImage}
                              alt={cartI.productName}
                            />
                          </div>

                          <div className="name-brand col-4" style={{}}>
                            <h1>{cartI.productName}</h1>
                            <p> {` Brand : ${cartI.productBrand}`}</p>
                          </div>
                          <div className="col-1">
                            <select
                              onChange={(e) =>
                                setcartQty(Number(e.target.value))
                              }
                            >
                              {[...Array(cartI.productStock).keys()].map(
                                (Qty) => {
                                  return (
                                    <>
                                      {
                                        <option value={Qty + 1}>
                                          {Qty + 1}
                                        </option>
                                      }
                                    </>
                                  );
                                }
                              )}

                              <option value={cartI.qty} selected disabled>
                                {cartI.qty}
                              </option>
                            </select>
                          </div>

                          <div className="col-2">
                            <p className="price"> {`Rs: ${cartI.price}`}</p>
                          </div>
                          <div className="col-1">
                            <Button
                              className="btn"
                              style={{ color: "red" }}
                              onClick={(e) => Deletehandler(e, cartI.productId)}
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Col>

                <>
                  <Col
                    className=" Summary col-6"
                    md={4}
                    style={{ width: "30%" }}
                  >
                    <Col className="summary_box">
                      <h5>Order Summary</h5>

                      <Col
                        className="subtotal d-flex mt-5"
                        style={{ justifyContent: "space-between" }}
                      >
                        <h5>Subtotal </h5>

                        <p>{Totalprice * Totalqty}</p>
                      </Col>

                      <Col
                        className="tax d-flex"
                        style={{ justifyContent: "space-between" }}
                      >
                        <h5>Shipping + Tax </h5>

                        <p>{tax}</p>
                      </Col>

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
                        <p>{Totalprice * Totalqty + tax}</p>
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
                </>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
