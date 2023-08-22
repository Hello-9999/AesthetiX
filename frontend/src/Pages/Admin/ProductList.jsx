import React, { useEffect, useState } from "react";
import {
  AddAdminprod,
  Deladmindata,
  EditAdminprod,
  getAdmindata,
} from "../../services/axios.services";
import { Button, Card, Form } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import EditModal from "./Modal";
import shadows from "@mui/material/styles/shadows";

// Admin prod List

const ProductList = () => {
  const [productDetail, setproductDetail] = useState({});
  const [showModal, setshowModal] = useState(false);
  const [Editproduct, setEditproduct] = useState([]);
  const [prodId, setprodID] = useState({});

  console.log(prodId);

  const [product, setproduct] = useState([]);


  const [prodValue, setprodValue] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    description: "",
    productImage: "",
  });

  console.log(product.productImage);

  const [Edittext, setEdittext] = useState(false);

  const token = useSelector((state) => state.login);
  const jwt = token.JWT;

  // console.log(product)
  // console.log(jwt);
  const Editchange = async (e) => {
    console.log(jwt)
    delete product["_id"];

    e.preventDefault();
    // console.log(`product/${prodId}`, prodValue, jwt);

    const response = await EditAdminprod(`product/${prodId}`, product,jwt);
    console.log(response);

    return response;
  };

  const getProduct = async () => {
    const response = await getAdmindata("product");
    setproductDetail(response.data);
  };

  // const edithandler = (e)=>{
  //   onchange((e)=>setproduct({...product , [e.target.name]:e.target.value}))

  // }

  const Deleteprod = (e, id) => {
    e.preventDefault();

    // console.log(productDetail.results)
    Deladmindata(`product`, id, jwt);

    const deleteProduct = productDetail.results.filter((del) => {
      return del._id !== id;
    });

    console.log(productDetail);

    setproductDetail((prev) => {
      return { ...prev, count: deleteProduct.length, results: deleteProduct };
    });

    // console.log(deleteProduct);
  };

  const Addprod = (e) => {
    e.preventDefault();
    setshowModal(true);
    setEdittext(true);
  };

  const Editprod = (e, x) => {
    e.preventDefault();
    setshowModal(true);
    setprodValue(x);
    setprodID(x.id);
    setEdittext(false);
  };

  const HideModal = (e) => {
    e.preventDefault();
    setshowModal(false);
  };

  const AddChange = async (e) => {
    e.preventDefault();

    const adminProdData = new FormData();

    adminProdData.append("name", prodValue.name);
    adminProdData.append("brand", prodValue.brand);
    adminProdData.append("price", prodValue.price);
    adminProdData.append("category", prodValue.category);
    adminProdData.append("countInStock", prodValue.countInStock);
    adminProdData.append("description", prodValue.description);
    adminProdData.append("productImage", prodValue.productImage);

    console.log(adminProdData);

    const response = await AddAdminprod("product", jwt, adminProdData);
    // console.log(response)

    return response;
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {productDetail.status === "success" ? (
        <>
          <EditModal
            showModal={showModal}
            handleClose={HideModal}
            ProdDetail={Editproduct}
            product={product}
            setproduct={setproduct}
            Editchange={Editchange}
            Edittext={Edittext}
            AddChange={AddChange}
            // setname={setname}
            // setbrand={setbrand}
            // setprice={setprice}
            // setcategory={setcategory}
            // setcountInStock={setcountInStock}
            // setdescription={setdescription}
            // setproductImage={setproductImage}
            

            setprodValue={setprodValue}
            prodValue={prodValue}
          />

          <Button onClick={Addprod}>Add Product</Button>

          <div className="prod">
            {productDetail.results.map((x) => {
              // setprodValue(x)
              return (
                <>
                  <Card>
                    <Card.Header>{x.name}</Card.Header>
                    <Card.Body>
                      {x.description}
                      <br />
                      {x.price}
                    </Card.Body>

                    <Card.Footer>
                      <Button onClick={(e) => Deleteprod(e, x.id)}>
                        {" "}
                        Delete
                      </Button>
                      <Button onClick={(e) => Editprod(e, x)}> Edit</Button>
                    </Card.Footer>
                  </Card>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {" "}
          <CircularProgress />{" "}
        </>
      )}
    </>
  );
};

export default ProductList;
