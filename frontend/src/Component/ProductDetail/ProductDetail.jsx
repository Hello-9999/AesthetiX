import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Getdata } from "../../services/axios.services";
import { useDispatch, useSelector } from "react-redux";
import Bar from "../Navbar/Navbar";
import { Col, Container, Form, Row } from "react-bootstrap";
import Rating from "../Rating/Rating";
import { Button, ButtonGroup, Select } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../ProductDetail/ProdDetail.css";
// import { Addtocart } from "../../slice/Cartslice";
import { Addtocart } from "../../slice/Cartslice";
import { favouritelist } from "../../slice/Favourite";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setproduct] = useState({});
  const [Favourite, setFavourite] = useState([]);
  const [Qty, setQty] = useState(1);


  const Jwt = useSelector((state) => state.login.Jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getproduct = async () => {
    const response = await Getdata(`product/${id}`, `${Jwt}`);
    setproduct(response.data.data);
    setFavourite(response.data);
    return response.data;
  };

  const handleaddcart = (product, Qty) => {
    const data = {
      productName: product.name,
      productImage: product.productImage,
      price: product.price,
      productId: product.id,
      productStock: product.countInStock,
      qty: Number(Qty),

      productBrand: product.brand,
    };

    dispatch(Addtocart(data));
    

    navigate("/cart");
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
      <div className="productDetail" style={{ color: "aliceblue" }}>
        <Bar />

        <Container>
          <Row style={{ marginTop: "5%" }}>
            <Col md={4}>
              <div className="product">
                <h4 className="prodname mb-4">{product.name}</h4>
                <h5 className="prodprice mb-4">
                  <span> RS {product.price}</span>
                </h5>

                <p className="prodrate mb-4">
                  {<Rating value={product.averageRating} text={"2"} />}
                </p>

                <p className="proddesc mb-4">{product.description}</p>
                <Row className="prodstatus mb-4">
                  <Col>Status :</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <h6 className="text-success">In Stock</h6>
                    ) : (
                      <h6 className="text-danger">Out of stock</h6>
                    )}
                  </Col>
                </Row>
                <div
                  style={{
                    marginTop: "5%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "25%",
                  }}
                  className="prodquantity mb-4"
                >
                  <div>
                    <Form.Select
                      onChange={(e) => setQty(Number(e.target.value))}
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
                  <div>
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
                        }}
                      >
                        Favourite
                      </span>
                    </Button>
                  </div>
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

            <Col md={8}>
              <img
                src={product.productImage}
                style={{ width: "100%", height: "80vh", borderRadius: "20px" }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductDetail;
