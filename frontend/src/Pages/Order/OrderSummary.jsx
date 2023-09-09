import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../Order/OrderSummary.css";
import { Link, useNavigate } from "react-router-dom";
import { OrderData } from "../../services/axios.services";
import { PlaceorderData } from "../../slice/Orderslice";
import SigninModal from "../Cart/Modal";
import WestIcon from "@mui/icons-material/West";
import { Triangle } from "react-loader-spinner";

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.login);
  const ShippingDetail = cart.ShippingAddress;
  const [Qty, setQty] = useState();
  const [status, setstatus] = useState("");
  const [id, setid] = useState("");
  const dispatch = useDispatch();
  const [placeOrder, setplaceOrder] = useState([]);
  const navigate = useNavigate();

  console.log(cart);
  const total = cart.CartItem.reduce((total, next) => {
    return total + next.price;
  }, 0);

  const qty = cart.CartItem.reduce((total, next) => {
    return total + next.qty;
  }, 0);
  console.log(qty, "qty");

  const Totalprice = cart.CartItem.reduce((total, next) => {
    return total + next.price;
  }, 0);

  const Proceed = async (e) => {
    e.preventDefault();

    const Orderdata = {
      orderItems: cart.CartItem,
      shipping: cart.ShippingAddress,
      payment: { paymentMethod: cart.PaymentMethod },
      itemsPrice: total,
      shippingPrice: 100,
      taxPrice: 20,
      totalPrice: total + qty + 100 + 20,
    };

    const JWt = profile.JWT;
    console.log(Orderdata, "data");

    console.log(profile.isLoggediin);
    if (profile.isLoggediin === true) {
      const response = await OrderData("order", Orderdata, JWt);

      dispatch(PlaceorderData(response.data));

      // setid(response.data.data._id);
      setstatus(response.data.status);
      navigate(`/order/${response.data.data._id}`)
    } else {
    }
  };

  return (
    <>
      {status === "success" ? (
        
        <>
          <div className="loader">
            <Triangle
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}} 
              wrapperClassName=""
              visible={true}
            />
          </div>

        </> 
         
      ) : (
        <>
          <div className="OrderSummary" style={{ color: "aliceblue" }}>
            <Container fluid>
              <h2 className="title">Order Confirmation</h2>
              <div className="link">
                <Link to={`/payment `}>
                  <span>
                    {" "}
                    <WestIcon />{" "}
                  </span>{" "}
                  Go Back
                </Link>
              </div>
              <Card>
                <Card.Body className="">
                  <Container fluid style={{ marginTop: "5%" }}>
                    <div
                      className="prodTotal"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                      }}
                    >
                      <div className="yourinfo col-5 ">
                        <h3 className="Infotitle">Your Information</h3>

                        <div className="info">
                          <h6>{profile.Name}</h6>
                          <p>{ShippingDetail.email}</p>
                        </div>
                      </div>
                      <div className="shipping col-5">
                        <h3 className="shippingtitle">Shipping Address</h3>

                        <div className="shipping">
                          <p>
                            <b>Country :</b> {ShippingDetail.country}
                          </p>
                          <p>
                            <b>City :</b> {ShippingDetail.city}
                          </p>

                          <p>
                            <b>Zip-code :</b> {ShippingDetail.postalCode}
                          </p>
                        </div>
                      </div>
                      <div className="payment col-5">
                        <h3 className="paymenttitle">Payment </h3>

                        <div className="payment">
                          {cart.PaymentMethod === "esewa" ? (
                            <>
                              {" "}
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Esewa_logo.webp/1200px-Esewa_logo.webp.png"
                                alt="E-Sewa"
                                style={{ width: "100px" }}
                              />{" "}
                            </>
                          ) : cart.PaymentMethod === "PayPal" ? (
                            <>
                              <img
                                src="https://iconlogovector.com/uploads/images/2023/05/lg-145106ed8f951d0c06e3734652878c9286.jpg"
                                alt="Pay-pal"
                                style={{ width: "100px" }}
                              />{" "}
                            </>
                          ) : (
                            <>
                              <img
                                src="https://icon-library.com/images/cash-on-delivery-icon/cash-on-delivery-icon-8.jpg"
                                alt="Pay-pal"
                                style={{
                                  width: "200px",
                                  backgroundColor: "aliceblue",
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <div className="Total col-5">
                        <h3 className="Totaltitle">Total Amount</h3>

                        <div className="Total">
                          <h6>Rs {Totalprice * qty}</h6>
                          <Button fullWidth onClick={Proceed}>
                            {" "}
                            Place Order
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <TableContainer striped bordered hover variant="dark">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead className="" style={{ padding: "10px" }}>
                            <TableRow style={{ color: "#cbd5e0" }}>
                              <TableCell>Item</TableCell>
                              <TableCell>Qty</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {cart.CartItem.map((getdata) => {
                              // console.log(getdata.qty)
                              return (
                                <>
                                  <TableRow>
                                    <TableCell
                                      className=" col-7 d-flex w-100 text-center"
                                      style={{
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <div className="prodImg">
                                        <img
                                          src={getdata.productImage}
                                          alt={getdata.productName}
                                          style={{
                                            width: "150px",
                                            height: "150px",
                                          }}
                                        />
                                      </div>

                                      <h6 className="mx-3">
                                        {getdata.productName}
                                      </h6>
                                    </TableCell>

                                    <TableCell className="col-2">
                                      <div
                                        className="qty"
                                        style={{ margin: "10% 10%" }}
                                      >
                                        <h6>{getdata.qty} </h6>
                                      </div>
                                    </TableCell>
                                    <TableCell className="col-2">
                                      <div className="prodprice">
                                        <p>
                                          <span className="rs"> RS : </span>{" "}
                                          <span>
                                            <b>{getdata.price}</b>
                                          </span>
                                        </p>
                                      </div>
                                    </TableCell>
                                  </TableRow>{" "}
                                </>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Container>
                </Card.Body>
              </Card>
            </Container>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default OrderSummary;
