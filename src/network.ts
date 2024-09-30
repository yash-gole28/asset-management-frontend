import axios from "axios";
import toast from "react-hot-toast";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = ()=>{
  const token = localStorage.getItem('token')
  return token
}
const post = async (url: string, params?: {}, headers?:{}): Promise<any> => {
  // console.log("url" , url)
  // console.log(BASE_URL + url)
  try {
    const token = getToken()
    const _headers = {
      headers: { ...headers, Authorization: `${token}` }
    };
    const response = await axios.post(BASE_URL + url, params, _headers);
   
    toast.success(response.data.message)
    return response.data;
  } catch (error: any) {
    console.error('Post request failed:', error.response ? error.response.data : error.message);
  
    toast.error(error.response.data.message)
  }
};

const get = async (
  url: string,
  params?: {},
  headers?: {},
  
  cancelToken?: any
): Promise<any> => {
  // console.log(BASE_URL + url)
  try {
    const token = await getToken();

    const config: any = {
      params,
      headers: { ...headers, Authorization: token },
      cancelToken: cancelToken,
    };

    const response = await axios.get(BASE_URL + url, config);

    return response;
  } catch (error: any) {
    toast.error(error.response.data.message)
    // toast({ icon: "error", title: "Something went wrong" });
  }
};

const deleteApi = async (url: string, params: {}, headers?: {}) => {
  try {
    const token = await getToken();
 
    const response = await axios.delete(BASE_URL + url, {
      params,
      headers: { ...headers, Authorization: `${token}` },
    });
    return response;
  } catch (error: any) {
    // toast({ icon: "error", title: "Something went wrong" });
  }
};

const put = async (url: string, params?: {}, headers?: {}, query?: {}) => {
  try {
    const token = await getToken();
    const _headers = {
      headers: { ...headers, Authorization: `${token}` },
    };
    const response = await axios.put(BASE_URL + url, params, {
      ..._headers,
      params: query,
    });
    return response;
  } catch (error: any) {
    // toast({ icon: "error", title: "Something went wrong" });
  }
};

export const API = {
  post, 
  get,
  put,
  deleteApi,
};
