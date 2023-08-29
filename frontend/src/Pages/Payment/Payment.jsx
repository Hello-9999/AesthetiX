import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { Container, Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "../Payment/Payment.css";
import { useDispatch } from "react-redux";
import { PaymentDetail } from "../../slice/Cartslice";
import { useState } from "react";
import { warningtoast } from "../../services/tostify.service";

const Payment = () => {
  const [PaymentData, setPaymentData] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const back = (e) => {
    e.preventDefault();
    navigate("/shipping");
  };
  const Go = (e) => {
    e.preventDefault();
    dispatch(PaymentDetail(PaymentData));

    if (PaymentData === "") {
      warningtoast("select Payment Method");
    } else {
      navigate("/ordersummary");
    }

    console.log(PaymentData);
    console.log(`${PaymentData}`)

    
  };

  return (
    <>
      <div className="paymentMethod">
        <Container>
          <Card>
            <Card.Title>Payment Method </Card.Title>

            <Card.Body>
              <FormControl>
                <RadioGroup
                  defaultValue="female"
                  name="controlled-radio-buttons-group"
                    
            
                  onChange={(e) => setPaymentData(e.target.value)}
                  sx={{ my: 1 }}
                >
                            
                  <div>
                    <Radio value="esewa" label="E-Sewa" />
                  </div>

                  <div>
                    <Radio value="PayPal" label="PayPal" />
                  </div>
                  <div>
                    <Radio value="Cash on delivery" label="Cash on delivery" />
                  </div>
                </RadioGroup>

                <Button
                  onClick={Go}
                  variant="contained"
                  className="bg-primary "
                  style={{ color: "aliceblue" }}
                  fullWidth
                >
                  Continue
                </Button>
                <Button onClick={back} variant="contained" fullWidth>
                  Go BAck
                </Button>
              </FormControl>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Payment;
