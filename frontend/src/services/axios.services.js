import axios from "axios";
import { errortoast, sucesstoast } from "./tostify.service";

const Server_url = import.meta.env.VITE_SERVER_URL;

export const Postdata = async (url, data, setloading) => {
  console.log(`${Server_url}${url}`);

  try {
    const response = await axios.post(`${Server_url}${url}`, data);
    sucesstoast("Bingo!!  Your entry is granted. Welcome back to EazyBazar  !");
    return response;
  } catch (error) {
    errortoast(error.response.data.error);
    setloading(false);
  }
};

export const Getdata = async (url, JWT, params) => {
  console.log(`${Server_url}${url}`);

  try {
    const response = await axios.get(`${Server_url}${url}`, params, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });

    return response;
  } catch (error) {
    errortoast(error.response.data.error);
  }
};

export const SigninPostData = async (url, data) => {
  try {
    console.log(`${Server_url}/${url}`);

    const response = await axios.post(`${Server_url}/${url}`, data);

    return response;
  } catch (error) {}
};

export const OrderData = async (url, data, JWT) => {
  try {
    const response = await axios.post(`${Server_url}${url}`, data, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });


    return response;
  } catch (error) {
    error(error.response.data.error);
  }
};

export const getAdmindata = async (url) => {
  try {
    const response = await axios.get(`${Server_url}${url}`);

    return response.data;
  } catch (error) {}
};

export const Deladmindata = async (url, id, jwt) => {
  try {
    const response = await axios.delete(`${Server_url}${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {}
};

export const EditAdminprod = async (url, data, token) => {
  try {
    const response = await axios.put(`${Server_url}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    sucesstoast("🚀 Ta-da !!  Product Boosted Updated successfully");

    return response;
  } catch (error) {
    errortoast(error.response.data.error);
  }
};

export const AddAdminprod = async (url, token, data) => {
  try {
    const response = await axios.post(`${Server_url}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    errortoast(error.response.data.error);
  }
};
