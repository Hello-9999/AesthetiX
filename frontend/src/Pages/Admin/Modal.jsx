import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Prev } from "react-bootstrap/esm/PageItem";
import "../Admin/Admin.css";

// Modal

const EditModal = ({
  showModal,
  handleClose,
  Editchange,
  AddChange,
  setprodValue,
  prodValue,
  Edittext,
  

}) => {

  // console.log(AddChange)
  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>
            {Edittext ? "Add Product" : "Update Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Container>
              <div className="modalimg">
                <img
                  src={prodValue.productImage}
                  alt=""
                  style={{ width: "100px" }}
                />
              </div>
            </Container>

            <div>
              <Form.Control
                className="mb-4"
                placeholder="Product Name"
                type="text"
                value={prodValue.name}
                onChange={(e) =>
                  setprodValue({
                    ...prodValue,
                    [e.target.name]: e.target.value,
                  })
                }
                name="name"
                autoFocus
              />
            </div>

            <div>
              <Form.Control
                className="mb-4"
                placeholder="Product Brand"
                value={prodValue.brand}
                onChange={(e) =>
                  setprodValue({
                    ...prodValue,
                    [e.target.name]: e.target.value,
                  })
                }
                name="brand"
              />
            </div>

            <div>
              <Form.Control
                className="mb-4"
                placeholder="Product Category"
                value={prodValue.category}
                onChange={(e) =>
                  setprodValue({
                    ...prodValue,
                    [e.target.name]: e.target.value,
                  })
                }
                name="category"
              />
            </div>

            <div>
              <Form.Control
                className="mb-4"
                placeholder="Product countInStock"
                type="Number"
                value={prodValue.countInStock}
                onChange={(e) =>
                  setprodValue({
                    ...prodValue,
                    [e.target.name]: e.target.value,
                  })
                }
                name="countInStock"
              />
            </div>

            <div>
              <Form.Control
                className="mb-4"
                placeholder="Product Description"
                value={prodValue.description}
                onChange={(e) =>
                  setprodValue({
                    ...prodValue,
                    [e.target.name]: e.target.value,
                  })
                }
                name="description"
              />
            </div>

            <div>
              <Form.Control
                className="mb-4"
                placeholder="Product Price"
                type="number"
                value={prodValue.price}
                onChange={(e) =>
                  setprodValue({
                    ...prodValue,
                    [e.target.name]: e.target.value,
                  })
                }
                name="price"
              />
            </div>

            <div>
              <Form.Control
                placeholder="Product Image"
                type="file"
                name="productImage"
                onChange={(e) =>
                  setprodValue({
                    ...prodValue,
                    [e.target.name]: e.target.files[0],
                  })
                }
                disabled={Edittext === false}
              />
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Edittext ? AddChange : Editchange}>
            {Edittext ? "Add Product" : "Update Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
