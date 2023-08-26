import React, { useState } from "react";
import { Card, Form, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, TextField } from "@material-ui/core";

import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import Cartslice, { Addtocart, ShippingDetail } from "../../slice/Cartslice";
import WestIcon from "@mui/icons-material/West";

const ShippingInfo = () => {
  const { ShippingAddress } = useSelector((state) => state.cart);

  const [email, setemail] = useState(ShippingAddress.email);
  const [postalCode, setpostalcode] = useState(ShippingAddress.postalCode);
  const [city, setcity] = useState(ShippingAddress.city);
  const [country, setcountry] = useState(ShippingAddress.country);
  const [address, setAddress] = useState(ShippingAddress.address);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const shippingData = {
      email,
      postalCode,
      city,
      country,
      address,
    };
    dispatch(ShippingDetail(shippingData));

    console.log(shippingData);

    navigate("/payment");
  };

  return (
    <>
      <div style={{ color: "aliceblue" }} className="Shipping">
        <Container>
          <div className="link">
            <Link to={`/cart `}>
              <span>
                {" "}
                <WestIcon />{" "}
              </span>{" "}
              Go Back
            </Link>
          </div>
          <h1>Shipping Information</h1>
          <Form className="mt-5" onSubmit={submit}>
            <div className="d-flex gap-5 mt-4 m-auto">
              <div className="Country col-5">
                <Form.Text className="mb-2">
                  <h6 className="mb-3">Country</h6>
                </Form.Text>
                <TextField
                  variant="filled"
                  placeholder="Country"
                  required
                  label="Country"
                  onChange={(e) => setcountry(e.target.value)}
                  value={country}
                  fullWidth
                />
              </div>

              <div className="Address col-5">
                <Form.Text className="mb-2">
                  <h6 className="mb-3">Address</h6>
                </Form.Text>
                <TextField
                  variant="filled"
                  placeholder="Address"
                  required
                  label="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  fullWidth
                />
              </div>
            </div>

            <div className="d-flex gap-5 mt-4 m-auto">
              <div className="zip col-5">
                <Form.Text className="mb-2">
                  <h6 className="mb-3">Zip-Code</h6>
                </Form.Text>
                <TextField
                  variant="filled"
                  label="Zip-code"
                  placeholder="Zip-code"
                  onChange={(e) => setpostalcode(e.target.value)}
                  required
                  fullWidth
                  value={postalCode}
                />
              </div>

              <div className="City col-5">
                <Form.Text className="mb-2">
                  <h6 className="mb-3">City</h6>
                </Form.Text>
                <TextField
                  variant="filled"
                  placeholder="
                City"
                  required
                  label="City"
                  onChange={(e) => setcity(e.target.value)}
                  fullWidth
                  value={city}
                />
              </div>
            </div>

            <div className="email mt-4 ">
              <Form.Text className="mb-2">
                <h6 className="mb-3">Email</h6>
              </Form.Text>
              <TextField
                variant="filled"
                type="email"
                placeholder="you@example.com"
                required
                label="Email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                fullWidth
              />
            </div>

            <Button fullWidth className="mt-4" type="submit">
              Continue
            </Button>
            <h4 className="text-center mt-4">OR</h4>

            <div className="footer">
              <Link to={"/home"} style={{ textDecoration: "none" }}>
                Continue Shoping
              </Link>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default ShippingInfo;
