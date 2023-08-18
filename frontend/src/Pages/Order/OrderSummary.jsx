import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../Order/OrderSummary.css";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  const ShippingDetail = cart.ShippingAddress;
  const [Qty, setQty] = useState();
  console.log(cart.PaymentMethod);

  const navigate = useNavigate()

  const back = (e)=>{
    e.preventDefault();
    navigate('/payment')


  }

  return (
    <>
      <div className="OrderSummary" style={{ color: "aliceblue" }}>
        <Container fluid>
          <h2 className="title">Order Confirmation</h2>
          <Button style={{marginLeft:'10%'}} className="back" onClick={back}>Go Back</Button> 
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
                      <h6>
                        <b>Check</b>
                      </h6>
                      <p>{ShippingDetail.email}</p>
                    </div>
                  </div>
                  <div className="shipping col-5">
                    <h3 className="shippingtitle">Shipping Address</h3>

                    <div className="shipping">
                      <h6>
                        <b>Check</b>
                      </h6>
                      <p>{ShippingDetail.email}</p>
                      <p>
                        <b>Country :</b> {ShippingDetail.country}
                      </p>
                      <p>
                        <b>City :</b> {ShippingDetail.city}
                      </p>

                      <p>
                        <b>Zip-code :</b> {ShippingDetail.zip}
                      </p>
                    </div>
                  </div>
                  <div className="payment col-5">
                    <h3 className="paymenttitle">Payment </h3>

                    <div className="payment">

                        {
                         cart.PaymentMethod === "esewa" ?<> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Esewa_logo.webp/1200px-Esewa_logo.webp.png" alt="E-Sewa" style={{width:'100px'}}/> </>:cart.PaymentMethod === "PayPal"? <><img src="https://iconlogovector.com/uploads/images/2023/05/lg-145106ed8f951d0c06e3734652878c9286.jpg" alt="Pay-pal" style={{width:'100px'}}/> </>:<><img src="https://icon-library.com/images/cash-on-delivery-icon/cash-on-delivery-icon-8.jpg" alt="Pay-pal" style={{width:'200px' , backgroundColor:'aliceblue' }}/></>

                        }
                     


                      
                    </div>
                  </div>
                  <div className="Total col-5">
                    <h3 className="Totaltitle">Your Information</h3>

                    <div className="Total">
                      <h6>
                        <small>
                          <b>Total : </b>
                        </small>
                        Rs {}
                      </h6>
                      <Button fullWidth> Place Order</Button>
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
                                      src={getdata.ProductImg}
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
                                    <select>
                                      <h6>Qty :</h6>
                                      {[...Array(getdata.Qty).keys()].map(
                                        (value) => {
                                          //   console.log(value);
                                          return (
                                            <>
                                              <option value={value + 1}>
                                                {" "}
                                                {value + 1}
                                              </option>
                                            </>
                                          );
                                        }
                                      )}
                                      <option
                                        value={getdata.Qty}
                                        selected
                                        disabled
                                      >
                                        {getdata.Qty}
                                      </option>
                                    </select>
                                  </div>
                                </TableCell>
                                <TableCell className="col-2">
                                  <div className="prodprice">
                                    <p>
                                      RS :{" "}
                                      <span>
                                        <b>{getdata.productPrice}</b>
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
      </div>
    </>
  );
};

export default OrderSummary;
