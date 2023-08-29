import React, { useEffect, useState } from "react";
import {
  AddAdminprod,
  Deladmindata,
  EditAdminprod,
  getAdmindata,
} from "../../services/axios.services";
import { Card, Form } from "react-bootstrap";
import { CircularProgress, TableContainer } from "@mui/material";
import { useSelector } from "react-redux";
import EditModal from "./Modal";
import shadows from "@mui/material/styles/shadows";
import AdminNavBar from "../../Component/AdminNAvBar/Admin";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../Admin/Admin.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { errortoast, sucesstoast } from "../../services/tostify.service";
// Admin prod List

const ProductList = () => {
  const name = useSelector((state) => state.login);
  const UserName = name.Name;

  const [productDetail, setproductDetail] = useState({});
  const [showModal, setshowModal] = useState(false);
  const [Editproduct, setEditproduct] = useState([]);
  const [prodId, setprodID] = useState({});

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
  const imageurl = prodValue.productImage


  const [Edittext, setEdittext] = useState(false);

  const token = useSelector((state) => state.login);
  const jwt = token.JWT;

  const Editchange = async (e) => {
    e.preventDefault();
    console.log(jwt);
    delete product["_id"];

    const response = await EditAdminprod(`product/${prodId}`, prodValue, jwt);
    console.log(response);

    if (response.data.status === "success") {
      setshowModal(false);
      

      const UpdateData = productDetail.results.map((update) => {
        console.log(update);

        return update.id === prodId ? response.data.data : update;
      });

      setproductDetail((prev) => {
        return {
          ...prev,
          results: UpdateData,
        };
      });
    }

    return response;
  };

  const getProduct = async () => {
    const response = await getAdmindata("product");
    setproductDetail(response.data);
  };

  const Deleteprod = (e, id) => {
    e.preventDefault();

    // console.log(productDetail.results)
    errortoast('🗑️  Product has been deleted !!')

    Deladmindata(`product`, id, jwt);

    const deleteProduct = productDetail.results.filter((del) => {
      return del._id !== id;
    });

    console.log(productDetail);

    setproductDetail((prev) => {
      return { ...prev, count: deleteProduct.length, results: deleteProduct };
    });

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


    const response = await AddAdminprod("product", jwt, adminProdData);
    console.log(response.data)
    if (response.data.status === 'success') {

      setproductDetail((prev)=>{
   
        return{...prev, results:[response.data.data,...prev.results]}
      })
      sucesstoast('🛍️ Product has been successfully added to our collection !!')

      
      
    } else {
      
    }

    
    

    return response;

    

  };
   
  
  


  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {productDetail.status === "success" ? (
        <>
          <AdminNavBar  Addprod={Addprod}/>
          <EditModal
            showModal={showModal}
            handleClose={HideModal}
            Editchange={Editchange}
            Edittext={Edittext}
            AddChange={AddChange}
            setprodValue={setprodValue}
            prodValue={prodValue}
          />


          <div className="adminprodList" style={{ color: "aliceblue" }}>
            <div id="title">
              {" "}
              <h6>
                welcome back , <b> {`${UserName}`} </b>
              </h6>
            </div>

            <div className="list container">
              <div className="prod">
                <Paper sx={{ width: "100%", overflow: "hidden" }  }>
                  <Table
                    sx={{ minWidth: 650 }}
                    stickyHeader
                    aria-label="sticky table"
                    style={{backgroundColor:'#1a202c'}}
                  >
                    <TableHead style={{ fontWeight: "bold",backgroundColor:'#1a202c' }}>
                      <TableRow>
                        <TableCell>Product No</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Product Img</TableCell>
                        <TableCell align="right"> Product Name</TableCell>
                        <TableCell align="right">Product Category</TableCell>
                        <TableCell align="right">Product Brand</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productDetail.results.map((x) => {
                        return (
                          <>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                className="col-2"
                              >
                                {x.id}
                              </TableCell>
                              <TableCell align="right" className="col-2">
                                {x.countInStock >0 ? (
                                  <>
                                    {" "}
                                    <h6
                                      style={{
                                        color: "#2ebd2e",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      In stock
                                    </h6>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <h6
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Out Of stock
                                    </h6>
                                  </>
                                )}
                              </TableCell>
                              <TableCell align="right" className="col-2">
                                <img src={x.productImage} alt={x.name} />
                              </TableCell>
                              <TableCell align="right" className="col-2">
                                {x.name}
                              </TableCell>
                              <TableCell align="right" className="col-2">
                                {x.category}
                              </TableCell>
                              <TableCell align="right" className="col-2">
                                {x.brand}
                              </TableCell>

                              <TableCell>
                                <Button
                                  onClick={(e) => Deleteprod(e, x.id)}
                                  variant="contained"
                                  color="error"
                                >
                                  <DeleteIcon />
                                </Button>
                                <br />
                                <br />
                                <Button
                                  variant="contained"
                                  onClick={(e) => Editprod(e, x)}
                                >
                                  <EditIcon />
                                </Button>{" "}
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            </div>
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
