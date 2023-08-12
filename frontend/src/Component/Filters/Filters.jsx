import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Form, FormCheck } from "react-bootstrap";

const Filters = ({ value, handlesort, handlefilter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div
        className="latest-product-bar container-fluid"
        style={{
          backgroundColor: "aliceblue",
          height: "8vh",
          marginBottom: "20px",
        }}
      >
        <div className="container " style={{ padding: "15px 0px" }}>
          <h5 className="float-start ">Latest Product ( {value.length} )</h5>

          <div className="filter  float-end">
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              Filter
            </Button>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <h5>Sort By </h5>
                <Form.Group>
                  <Form.Check
                    value="name"
                    label="Name "
                    onChange={(e) => handlesort(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    value="price"
                    label="price"
                    onChange={(e) => handlesort(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    value="rating"
                    label="Rating"
                    onChange={(e) => handlesort(e.target.value)}
                  />
                </Form.Group>

                <select
                  class="form-select"
                  onChange={(e) => handlefilter("category", e.target.value)}
                >
                  <option selected disabled>
                    Categories
                  </option>
                  <option> None </option>

                  <option> Shirts </option>
                  <option> Pants </option>
                  <option> Vest </option>
                </select>
              </Typography>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
