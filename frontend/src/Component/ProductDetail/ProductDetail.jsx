import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Getdata } from "../../services/axios.services";
import { useSelector } from "react-redux";
import Bar from "../Navbar/Navbar";
import { Col, Container, Form, Row } from "react-bootstrap";
import Rating from "../Rating/Rating";
import { Button, ButtonGroup, Select } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../ProductDetail/ProdDetail.css";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setproduct] = useState({});
  const [Qty, setQty] = useState();

  const Jwt = useSelector((state) => state.login.Jwt);
  console.log(Jwt);

  const getproduct = async () => {
    // const { data } = await Getdata(`product/${id}`, `${Jwt}`);
    // setproduct(data);

    const response = await Getdata(`product/${id}`, `${Jwt}`);
    setproduct(response.data.data);
    return response.data;
  };

  useEffect(() => {
    getproduct();
  }, []);

  return (
    <>
      {console.log(product)}
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

                {/* {console.log(product.countInStock)} */}

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
                    <Form.Select onChange={(e) => setQty(e.target.value)}>
                      <option>Select quantity</option>
                      {[...Array(product.countInStock).keys()].map((num) => {
                        //   console.log(num);
                        return (
                          <>
                            <option value={num + 1}>{num + 1}</option>
                          </>
                        );
                      })}
                    </Form.Select>
                  </div>
                  <div>
                    <Button
                      type="button"
                      style={{
                        border: "1px solid grey",
                        padding: "10px",
                        color: "aliceblue",
                        borderRadius: "10px",
                      }}
                    >
                      <FavoriteIcon />{" "}
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
                  {/* border: 1px solid slategrey; padding: 15px; color: aliceblue; */}
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
