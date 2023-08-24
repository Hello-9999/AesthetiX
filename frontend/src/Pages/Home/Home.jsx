import React, { useEffect, useState } from "react";
import NavBar from "../../Component/Navbar/Navbar";
import Bar from "../../Component/Navbar/Navbar";
import axios from "axios";
import { Getdata } from "../../services/axios.services";
import { useSelector } from "react-redux";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Rating from "../../Component/Rating/Rating";
import Filters from "../../Component/Filters/Filters";
import LinkBar from "../../Component/linkbar/linkbar";
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
// import {loader1} from '../../Component/loader/loader'
import loader1 from "../../Component/loader/loader";
import { InfinitySpin } from "react-loader-spinner";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

const Home = () => {
  const [sort, setsort] = useState([]);
  const [Product, setProduct] = useState([]);
  const [Originalproduxt, setOriginalproduct] = useState([]);
  const [loader, setloader] = useState(false);
  const [loaderData, setloaderdata] = useState([]);

  const [Filter, setfilter] = useState({});

  const [Searchvalue, setsearchvalue] = useState({});

  const Jwt = useSelector((state) => state.login.Jwt);

  const ProductData = async () => {
    const response = await Getdata(`product`, `${Jwt}`);
    setProduct(response.data.data.results);
    setOriginalproduct(response.data.data.results);
    setloaderdata(response.data);
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

  const fetchfilter = async () => {
    const response = await Getdata(`product`, `${Jwt}`, {
      params: {
        ...Filter,
      },
    });
    setProduct(response.data.data.results);
    setOriginalproduct(response.data.data.results);
    return response;
  };

  const productSearch = (value) => {
    const searchprod = value.toLowerCase();
    const actualprod = Originalproduxt.filter((searchName) => {
      return searchName.name.toLowerCase().includes(searchprod);
    });

    setProduct(actualprod);
    setsearchvalue(searchprod);
  };
  // console.log(sear)

  const navigate = useNavigate();

  const favourite = (e) => {
    e.preventDefault();
  };

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
      {loaderData.status === "success" ? (
        <>
          <div className="home">
            <Bar />

            <Filters
              value={Product}
              handlesort={handlesort}
              handlefilter={handlefilter}
              search={productSearch}
            />

            <Container fluid>
              <>
                {console.log(Product)}

                {Product.length === 0 ? (
                  <>
                    <div
                      className="datanotfound"
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png"
                        alt=""
                        style={{
                          marginTop: "5%",
                        }}
                      />

                      <h6
                        style={{
                          color: "aliceblue",
                          marginTop: "3%",
                          fontSize: "1.5rem",
                        }}
                      >
                        No Result for {Searchvalue} !!
                      </h6>

                      <p style={{ color: "bisque", fontSize: "1.2rem" }}>
                        Please check the spelling or try searching for something
                        else
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Container
                      fluid
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "2%",
                      }}
                    >
                      {Product.map((products) => {
                        return (
                          <>
                            <Card
                              onClick={(e) =>
                                navigate(`/product/${products.id}`)
                              }
                            >
                              <Card.Header
                                style={{ position: "relative", zIndex: "99" }}
                              >
                                <Card.Title>
                                  <Card.Img src={products.productImage} />
                                </Card.Title>
                              </Card.Header>
                              <Card.Body>
                                <Rating
                                  value={products.averageRating}
                                  text={
                                    products.Reviews
                                      ? products.Reviews.length
                                      : 0
                                  }
                                  key={products._id}
                                />
                                <Card.Title
                                  style={{
                                    // textAlign: "center",
                                    marginTop: "5px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <h6
                                    style={{
                                      fontSize: "1.5rem",
                                      color: "#a0a6a6",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {products.brand}
                                  </h6>
                                  {products.name}
                                </Card.Title>

                                <Card.Text
                                  style={{
                                    textAlign: "center",
                                    marginTop: "30px",
                                  }}
                                >
                                  <h3>RS : {products.price}</h3>{" "}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </>
                        );
                      })}
                    </Container>
                  </>
                )}
              </>
            </Container>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="loader">
            <InfinitySpin width="200" color="#d41313" />{" "}
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Home;
