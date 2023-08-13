import React, { useEffect, useState } from "react";
import NavBar from "../../Component/Navbar/Navbar";
import Bar from "../../Component/Navbar/Navbar";
import axios from "axios";
import { Getdata } from "../../services/axios.services";
import { useSelector } from "react-redux";
import { Card, Col, Container, Row } from "react-bootstrap";
import Rating from "../../Component/Rating/Rating";
import Filters from "../../Component/Filters/Filters";
import LinkBar from "../../Component/linkbar/linkbar";
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [sort, setsort] = useState([]);
  const [Product, setProduct] = useState([]);
  const [Originalproduxt, setOriginalproduct] = useState([]);

  const [Filter, setfilter] = useState({});

  const [Searchvalue, setsearchvalue] = useState({});

  const Jwt = useSelector((state) => state.login.Jwt);

  const ProductData = async () => {
    const response = await Getdata(`product`, `${Jwt}`);
    setProduct(response.data.data.results);
    setOriginalproduct(response.data.data.results);
    console.log(response.data.data.results.brand);
    return response;
  };

  const handlesort = (value) => {
    sort.includes(value)
      ? setsort(sort.filter((Duplicatesort) => Duplicatesort !== value))
      : setsort((prevState) => {
          console.log([...prevState, value]);

          return [...prevState, value];
        });
  };
  const handlefilter = (key, value) => {
    setfilter({ ...Filter, [key]: value });
  };

  const searchprod = (value) => {
    const Servalue = value.toLowerCase();
    console.log(Product);

    const serachprod = Originalproduxt.filter((prod) => {
      // console.log(prod.name.toLowerCase());
      return prod.name.toLowerCase().includes(Servalue);
    });
    setProduct(serachprod);
  };

  const fetchfilter = async () => {
    const response = await Getdata(`product`, `${Jwt}`, {
      params: {
        ...Filter,
      },
    });
    setProduct(response.data.data.results);
    setOriginalproduct(response.data.data.results);
    // console.log(response.data.data.results.name);
    return response;
  };

  const navigate = useNavigate();

  useEffect(() => {
    ProductData();
  }, []);

  useEffect(() => {
    fetchfilter();
  }, [Filter]);

  useEffect(() => {
    handlefilter("sort", sort.join(","));
  }, [sort]);

  return (
    <>
      <div className="home">
        <Bar />

        <LinkBar />

        <div className="search">
          <input
            placeholder="search product"
            onChange={(e) => searchprod(e.target.value)}
          />
        </div>
        {/* <Filters
          value={Product}
          handlesort={handlesort}
          handlefilter={handlefilter}
        /> */}
        <Container fluid>
          <Row>
            <Col className="w-4" md={3} style={{ color: "aliceblue" }}>
              <Row
                className="row-categorires"
                style={{ position: "sticky", top: "0" }}
              >
                <Col>
                  <h6>Categories</h6>
                  <ul>
                    <li>Mens's Fashion</li>
                    <li>Clothing</li> <li>Watches</li>
                    <li>Backpacks</li> <li>New arrivals</li>
                    <li>Footwear</li> <li>Jewellry</li>
                    <li>Luggage</li>
                  </ul>
                </Col>

                <Col>
                  <h6>Top Brands</h6>
                  <ul>
                    <li>Nike</li>
                    <li>Skechers</li>
                    <li>Puma</li>
                    <li>Under Armour</li>
                    <li> Tommy Hilifiger</li>
                    <li> Converse</li>
                    <li> Adidas</li>
                  </ul>
                </Col>
              </Row>
            </Col>
            <Col style={{ display: "flex", flexWrap: "wrap", gap: "5%" }}>
              <Filters
                value={Product}
                handlesort={handlesort}
                handlefilter={handlefilter}
              />
              {Product.map((products) => {
                return (
                  <>
                    <Card onClick={(e) => navigate(`/product/${products.id}`)}>
                      <Card.Header>
                        <Card.Title>
                          <Card.Img src={products.productImage} />
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title
                          style={{
                            textAlign: "center",
                            marginTop: "5px",
                            marginBottom: "10px",
                          }}
                        >
                          {products.name}
                        </Card.Title>
                        <Rating
                          value={products.averageRating}
                          text={products.Reviews ? products.Reviews.length : 0}
                          key={products._id}
                        />
                        {/* <Card.Text style={{ display: "flex" }}>
                          <p>Category : </p> <h4> {products.category}</h4>{" "}
                        </Card.Text>
                        <Card.Body>{products.description}</Card.Body> */}

                        <Card.Text
                          style={{ textAlign: "center", marginTop: "30px" }}
                        >
                          <h3>RS : {products.price}</h3>{" "}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
