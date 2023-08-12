import React, { useEffect, useState } from "react";
import NavBar from "../../Component/Navbar/Navbar";
import Bar from "../../Component/Navbar/Navbar";
import axios from "axios";
import { Getdata } from "../../services/axios.services";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import Rating from "../../Component/Rating/Rating";
import Filters from "../../Component/Filters/Filters";

const Home = () => {
  const [Product, setProduct] = useState([]);
  const [sort, setsort] = useState([]);

  const [Filter, setfilter] = useState({});

  const [Searchvalue, setsearchvalue] = useState({});

  const Jwt = useSelector((state) => state.login.Jwt);

  const ProductData = async () => {
    const response = await Getdata(`product`, `${Jwt}`);
    setProduct(response.data.data.results);
    console.log(response.data.data);
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

    const serachprod = Product.filter((prod) => {
      console.log(prod.name.toLowerCase());
      return prod.name.toLowerCase().includes(Servalue);
    });
    setsearchvalue(serachprod);

    console.log(Searchvalue);
  };

  const fetchfilter = async () => {
    const response = await Getdata(`product`, `${Jwt}`, {
      params: {
        ...Filter,
      },
    });
    setProduct(response.data.data.results);
    console.log(response.data.data);
    return response;
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
      <div>
        <Bar />

        <Filters
          value={Product}
          handlesort={handlesort}
          handlefilter={handlefilter}
        />

        <div className="search">
          <input
            placeholder="search product"
            onChange={(e) => searchprod(e.target.value)}
          />
        </div>

        {Product.map((products) => {
          return (
            <>
              <div className="container">
                <Card style={{ width: "45%" }}>
                  <Card.Header>
                    <Card.Title>
                      <Card.Img src={products.productImage} />
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Rating
                      value={products.averageRating}
                      text={products.Reviews ? products.Reviews.length : 0}
                      key={products._id}
                    />

                    <Card.Title style={{ textAlign: "center" }}>
                      {products.name}
                    </Card.Title>
                    <Card.Text style={{ display: "flex" }}>
                      <p>Category : </p> <h4> {products.category}</h4>{" "}
                    </Card.Text>
                    <Card.Body>{products.description}</Card.Body>

                    <Card.Text style={{ textAlign: "center" }}>
                      <h3>RS : {products.price}</h3>{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
