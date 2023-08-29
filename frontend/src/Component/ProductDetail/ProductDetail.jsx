import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Getdata } from "../../services/axios.services";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, Row } from "react-bootstrap";
import Rating from "../Rating/Rating";
import { Button, ButtonGroup, CircularProgress, Select } from "@mui/material";
import "../ProductDetail/ProdDetail.css";
import { Addtocart } from "../../slice/Cartslice";
import { favouritelist } from "../../slice/Favourite";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import WestIcon from "@mui/icons-material/West";
import Cart from "../../Pages/Cart/Cart";
import { Triangle } from "react-loader-spinner";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setproduct] = useState({});
  const [Favourite, setFavourite] = useState([]);
  const [Qty, setQty] = useState(1);
  const [Id, setId] = useState("");
  const [status, setstatus] = useState("");

  const Jwt = useSelector((state) => state.login.Jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getproduct = async () => {
    const response = await Getdata(`product/${id}`, `${Jwt}`);
    setproduct(response.data.data);
    setstatus(response.data.status);
    setFavourite(response.data);
    return response.data;
  };

  const handleaddcart = (product, Qty) => {
    const data = {
      productName: product.name,
      productImage: product.productImage,
      price: Number(product.price),
      productId: product.id,
      productStock: product.countInStock,
      qty: Number(Qty),

      productBrand: product.brand,
    };

    dispatch(Addtocart(data));

    navigate("/cart");
    localStorage.setItem("id", id);
  };

  const Favorite = (e) => {
    e.preventDefault();

    dispatch(favouritelist(Favourite.data));

    alert("product has been added in your favourate");
  };

  useEffect(() => {
    getproduct();
  }, []);

  return (
    <>
      {status === "success" ? (
        <>
          {" "}
          <div className="productDetail" style={{ color: "aliceblue" }}>
            <Container>
              <Row style={{ marginTop: "5%", alignItems: "center" }}>
                <Col md={5}>
                  <div className="link">
                    <Link to={"/shop"}>
                      <span>
                        {" "}
                        <WestIcon />{" "}
                      </span>{" "}
                      Back to Store
                    </Link>
                  </div>
                  <div className="product">
                    <h6
                      className="category mb-3"
                      style={{ textTransform: "capitalize" }}
                    >
                      {" "}
                      {product.category}
                    </h6>
                    <h4
                      className="prodname mb-4"
                      style={{ textTransform: "capitalize" }}
                    >
                      {product.name}
                    </h4>
                    <div className="rateprice d-flex ">
                      <h5 className="prodprice mb-4">
                        <span> RS {product.price}</span>
                      </h5>

                      <p className="prodrate mb-4">
                        {<Rating value={product.averageRating} text={"2"} />}
                      </p>
                    </div>

                    <p className="proddesc mb-4">{product.description}</p>
                    <div className="prodstatus mb-4">
                      <h6>Status </h6>
                      <p>
                        {product.countInStock > 0 ? (
                          <h6 className="text-success">In Stock</h6>
                        ) : (
                          <h6 className="text-danger">Out of stock</h6>
                        )}
                      </p>
                    </div>
                    <div
                      style={{
                        marginTop: "5%",
                        display: "flex",
                      }}
                      className="prodquantity mb-4"
                    >
                      <Button
                        onClick={Favorite}
                        style={{
                          border: "1px solid grey",
                          padding: "10px",
                          color: "aliceblue",
                          borderRadius: "10px",
                        }}
                      >
                        <FavoriteBorderRounded />

                        <span
                          style={{
                            marginLeft: "10px",
                            textTransform: "capitalize",
                            letterSpacing: "1.5px",
                            fontSize: "1.3rem",
                          }}
                        >
                          Favourite
                        </span>
                      </Button>

                      <Form.Select
                        onChange={(e) => setQty(Number(e.target.value))}
                        style={{ width: "20%" }}
                      >
                        <option value="" disabled>
                          Select quantity
                        </option>
                        {[...Array(product.countInStock).keys()].map((num) => {
                          return (
                            <>
                              <option value={Number(num + 1)}>{num + 1}</option>
                            </>
                          );
                        })}
                      </Form.Select>
                    </div>

                    <Button
                      className="addcart"
                      fullWidth
                      style={{
                        marginTop: "10%",
                        backgroundColor: "#3a98d5",
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "700",
                        padding: "10px",
                      }}
                      onClick={(e) => handleaddcart(product, Qty)}
                      disabled={product.countInStock === 0}
                    >
                      {" "}
                      Add To cart
                    </Button>
                  </div>
                </Col>

                <Col md={7} className="prodimg">
                  <img src={product.productImage} />
                </Col>
              </Row>
            </Container>
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
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
          </div>{" "}
        </>
      )}
    </>
  );
};

export default ProductDetail;
