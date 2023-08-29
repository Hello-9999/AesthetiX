import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Link,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
// import { Button } from '@material-ui';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import "../OrderDetail/OrderDetail.css";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import DescriptionIcon from "@mui/icons-material/Description";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import InfoIcon from "@mui/icons-material/Info";
import Bar from "../../Component/Navbar/Navbar";
import { sucesstoast,infotoast } from "../../services/tostify.service";

const OrderDetail = () => {
  const id = useParams();
  console.log(id);

  const OrderData = useSelector((state) => state.OrderDetail);
  console.log(OrderData);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const deliverydate = new Date();

  let deliveryday = deliverydate.getDate() + 5;
  let deliverymonth = deliverydate.getMonth() + 1;
  let deliveryyear = deliverydate.getFullYear();

  const currentDate = `${day}/${month}/${year}`;
  const Deliverydate = `${deliveryday}/${deliverymonth}/${deliveryyear}`;
  console.log(currentDate);
  const Totalprice = OrderData.Data.data.orderItems.reduce((total, next) => {
    return total + Number(next.price);
  }, 0);
  const Totalqty = OrderData.Data.data.orderItems.reduce((total, next) => {
    return total + Number(next.qty);
  }, 0);

  const tamt = Totalprice * Totalqty + 35 + 50;
  const amt = Totalprice * Totalqty;

  const [payloader, setpayloader] = useState(false);

  const paywithesewa = (e) => {
    e.preventDefault();
    setpayloader(true);

    let path = "https://uat.esewa.com.np/epay/main";
    let params = {
      amt: amt,
      psc: 0,
      pdc: 50,
      txAmt: 35,
      tAmt: tamt,
      pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
      scd: "EPAYTEST",
      su: "http://merchant.com.np/page/esewa_payment_success",
      fu: "http://merchant.com.np/page/esewa_payment_failed",
    };

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();

    console.log("esewa pay");
  };

  const paywithpaypal = (e) => {
    e.preventDefault();
    console.log("esewa paypal");
  };

  return (
    <>
      <div className="OrderDetail" style={{ color: "aliceblue" }}>
        <Bar />
        <Card>
          <div className="paybtn d-flex">

          <div className="logo mt-4 mx-2 ">
              <h6>
                {" "}
                <a href="" style={{ textDecoration: "none" }}>
                  {" "}
                  Eazy<span>Bazar. </span>{" "}
                </a>
              </h6>
            </div>

            <div className="d-flex mt-5 " style={{ alignItems: "baseline" }}>
              <h6>
                {" "}
                Total : <span> {Totalprice * Totalqty + 100 + 35} </span>
              </h6>
              <div className="pay">
                {" "}
                {OrderData.Data.data.payment.paymentMethod === "esewa" ? (
                  <>
                    <Button onClick={paywithesewa}>
                      {payloader === true ? (
                        <>
                          {" "}
                          <CircularProgress />{" "}
                        </>
                      ) : (
                        <>Pay With Esewa</>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    {" "}
                    {OrderData.Data.data.payment.paymentMethod === "PayPal" ? (
                      <>
                        {" "}
                        <Button onClick={paywithpaypal}>Pay with paypal</Button>
                      </>
                    ) : (
                      <> </>
                    )}{" "}
                  </>
                )}{" "}
              </div>
            </div>
          </div>
          <hr />
          <div
            className="orderHeader"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="OrderId " style={{}}>
              <h6>
                {`Order Id :`} <span>{id.orderId}</span>{" "}
              </h6>
            </div>

            <div
              className="Track_btn "
              style={{ display: "flex", gap: "10px" }}
            >
              <div className="invoice">
                <Button variant="contained" className="bg-secondary">
                  {" "}
                  <DescriptionIcon className="mx-2 " /> Invoice{" "}
                </Button>
              </div>
              <div className="track">
                <Button variant="contained">
                  {" "}
                  Track Order <LocationSearchingIcon className="mx-2" />
                </Button>
              </div>
            </div>
          </div>

          <div className="orderDate_Deli d-flex gap-4">
            <div className="orderDate">
              <p>
                Order Date : <span>{currentDate}</span>
              </p>
            </div>
            <div className="Delivery">
              <p className="d-flex" style={{ alignItems: "baseline" }}>
                {" "}
                <p>
                  {" "}
                  <DeliveryDiningIcon /> Estimated delivery :
                </p>{" "}
                <p className="mx-3">
                  {" "}
                  {OrderData.Data.data.payment.paymentMethod ===
                  "Cash on delivery" ? (
                    <>
                      <h6 className="deliverydate">{Deliverydate}</h6>{" "}
                      {sucesstoast("Get ready to enjoy your order. Our delivery team will collect the payment when they drop off your goodies.")}
                    </>
                  ) : (
                    <>
                      {(OrderData.Data.data.isPaid === false &&
                        OrderData.Data.data.payment.paymentMethod ===
                          "esewa") ||
                      "PayPal" ? (
                        <>
                          {infotoast('Secure Checkout Ahead! Your payment is in safe hands. we"re  ready to process your order.')}
                          <Alert severity="error"> Not Paid!!</Alert>{" "}
                        </>
                      ) : (
                        <> 20 / 08/ 2023</>
                      )}
                    </>
                  )}{" "}
                </p>{" "}
              </p>
            </div>
          </div>
          <hr />
          {/*  */}

          <div className="orderList">
            <TableContainer striped bordered hover letiant="dark">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="" style={{ padding: "10px" }}></TableHead>
                <TableBody>
                  {OrderData.Data.data.orderItems.map((cartItem) => {
                    console.log(cartItem);
                    return (
                      <>
                        <TableRow>
                          <TableCell
                            className="  d-flex w-100 text-center"
                            style={{
                              alignItems: "center",
                              flexWrap: "wrap",
                              justifyContent: "space-around",
                            }}
                          >
                            <div className="prodImg col-3">
                              <img
                                src={cartItem.productImage}
                                alt={cartItem.productName}
                                style={{
                                  height: "150px",
                                }}
                              />
                            </div>

                            <div className="prodname col-5">
                              <h6 className="mx-3">{cartItem.productName}</h6>
                            </div>

                            <div className="prodprice col-4">
                              <p>
                                RS :{" "}
                                <span>
                                  <b>{cartItem.price}</b>
                                </span>
                              </p>

                              <div className="qty">
                                <p>{`Qty : ${cartItem.qty} `}</p>
                              </div>
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

          <div
            className="payment_detail d-flex"
            style={{ justifyContent: "space-around", marginTop: "5%" }}
          >
            <div className="payment col-5">
              <h4>Payment</h4>
              <p style={{ textTransform: "capitalize", letterSpacing: "1px" }}>
                {" "}
                {OrderData.Data.data.payment.paymentMethod}
              </p>
            </div>

            <div className="delivery col-5">
              <h4>Delivery</h4>
              <div className="add_body">
                <p>Address</p>
                <div className="address">
                  <p>
                    <b>{OrderData.Data.data.shipping.address}</b>
                  </p>

                  <p>
                    <b>
                      {OrderData.Data.data.shipping.city} ,
                      {OrderData.Data.data.shipping.country}{" "}
                    </b>
                  </p>

                  <p>
                    <b>{OrderData.Data.data.shipping.postalCode}</b>
                  </p>
                </div>
                <div className="delivery-m">
                  <h4>Delivery Method</h4>

                  <p>
                    <b> Van </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex" style={{ justifyContent: "space-around" }}>
            <div className="need_help col-6" style={{ marginLeft: "10%" }}>
              <div className="issue">
                <p>
                  {" "}
                  <Link href="#">
                    {" "}
                    <HelpCenterIcon /> Order Issue <ArrowOutwardIcon />{" "}
                  </Link>{" "}
                </p>
              </div>
              <div className="deliInfo">
                <p>
                  {" "}
                  <Link href="#">
                    {" "}
                    <LocalShippingIcon /> Delivery Info <ArrowOutwardIcon />{" "}
                  </Link>{" "}
                </p>
              </div>
              <div className="return">
                <p>
                  {" "}
                  <Link href="#">
                    {" "}
                    <AssignmentReturnIcon /> Returns <ArrowOutwardIcon />{" "}
                  </Link>
                </p>
              </div>
            </div>

            <div className="Summary col-5">
              <div
                className="total d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <h6>Subtotal</h6>
                <p>{Totalprice * Totalqty}</p>
              </div>

              <div
                className="Discount d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <h6>Discount</h6>
                <p> 0</p>
              </div>

              <div
                className="delivery d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <h6>
                  Delivery <InfoIcon style={{ cursor: "pointer" }} />
                </h6>
                <p>RS 100</p>
              </div>

              <div
                className="tax d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <h6>
                  Tax <InfoIcon style={{ cursor: "pointer" }} />{" "}
                </h6>
                <p>RS 35</p>
              </div>
              <hr />

              <div
                className="total d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <p>Total</p>
                <h6>Rs {Totalprice * Totalqty + 100 + 35}</h6>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default OrderDetail;
