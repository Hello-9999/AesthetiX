import React from "react";
import Homenav from "./Homenav";
import { Card } from "react-bootstrap";
// import { Link } from 'react-router-dom'
import "../1page/1page.css";
import Homecarousel from "./Homecarousel";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../Admin/ProductList";
import Bar from "../../Component/Navbar/Navbar";


const Pages = () => {
  const logindata = useSelector((state)=>state.login)
  console.log(logindata.Role)

  const navigate=useNavigate()

    
  return (
    <>
   <div className="Home">
        <Bar/>

        <div className="offer">
          <p>
            Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer{" "}
            <Link to={'/shop'}> Shop Now</Link>{" "}
          </p>
        </div>

        <Homecarousel />

        <Container
          className="card-detail d-flex"
          style={{ gap: "2%", marginTop: "5%", flexWrap: "nowrap" }}
        >
          <Card
            style={{
              width: "50%",
              height: "60vh",
              position: "relative",
              textAlign: "center",
              overflow: "hidden",
              border: "none",
            }}
          >
            <img
              src="https://freerangestock.com/sample/131988/dark-view-of-male-fashion-model-in-sunglasses-.jpg"
              alt=""
              //   style={{ width: "100%", height: "80vh" }}
            />
            <div className="card-text">
              <h6>Men's Fashion</h6>
              <Link to={'/shop'}> Shop Now</Link>
            </div>
          </Card>
          <Card
            style={{
              width: "50%",
              height: "60vh",
              position: "relative",
              textAlign: "center",
              overflow: "hidden",
              border: "none",
            }}
          >
            <img
              src="https://e0.pxfuel.com/wallpapers/335/946/desktop-wallpaper-camila-cabello-new-2020-celebrities-background-and.jpg"
              alt=""
              //   style={{ width: "100%", height: "80vh" }}
              //   style={{width:"50%",height:'50%'}}
            />

            <div className="card-text">
              <h6>Women's Fashion</h6>
              <Link to={'/shop'}> Shop Now</Link>
            </div>
          </Card>
          <Card
            style={{
              width: "50%",
              height: "60vh",
              position: "relative",
              textAlign: "center",
              overflow: "hidden",
              border: "none",
            }}
          >
            <img
              src="https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
            <div className="card-text">
              <h6>Kid's Fashion</h6>
              <Link to={'/shop'}> Shop Now</Link>
            </div>
          </Card>
        </Container>

        <hr />

        <footer style={{marginTop:'5%' , backgroundColor:'aliceblue' , color:'black',padding:'5px'}}>
          <Container
            className="about d-flex  gap-3"
            style={{ marginTop:'3%',textAlign:'center' }}
          >
            <div className="free col-3" >
              <div className="icon" style={{ color: "aliceblue" }}>
                {/* <LocalShippingOutlinedIcon /> */}
                <img
                  src="https://preview.colorlib.com/theme/capitalshop/assets/img/icon/services1.svg"
                  alt=""
                />
              </div>
              <h6 style={{marginTop:'5%'}}>Fast & Free Delivery</h6>

              <p>Free delivery on all orders</p>
            </div>

            <div
              className="moneyback col-3"
            >
              <div className="icon" style={{ color: "aliceblue" }}>

                <img
                  src="https://preview.colorlib.com/theme/capitalshop/assets/img/icon/services3.svg"
                  alt=""
                />
              </div>
              <h6 style={{marginTop:'5%'}}>Money Back Guarantee</h6>

              <p>Free delivery on all orders</p>
            </div>

            <div className="secure col-3" >
            <div className="icon" style={{ color: "aliceblue" }}>
                <img
                  src="https://preview.colorlib.com/theme/capitalshop/assets/img/icon/services2.svg"
                  alt=""
                />
              </div>
              <h6 style={{marginTop:'5%'}}>Secure Payment</h6>

              <p>Free delivery on all orders</p>
            </div>

            <div
              className="support col-3"
              
            >
              <div className="icon" style={{ color: "aliceblue" }}>
                <img
                  src="https://preview.colorlib.com/theme/capitalshop/assets/img/icon/services4.svg"
                  alt=""
                />{" "}
              </div>
              <h6 style={{marginTop:'5%'}}>Online Support</h6>

              <p>Free delivery on all orders</p>
            </div>
          </Container>
        </footer>
      </div>
     
    </>
  );
};

export default Pages;
