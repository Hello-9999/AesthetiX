import axios from "axios";

const Server_url = import.meta.env.VITE_SERVER_URL;

export const Postdata = async (url, data) => {
  console.log(`${Server_url},${url}`);

  try {
    const response = await axios.post(`${Server_url}${url}`, data);
    return response;
  } catch (error) {
    console.log(error)
  }
};
