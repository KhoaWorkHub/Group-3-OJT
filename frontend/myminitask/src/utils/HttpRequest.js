import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})
export const get = async (url, options = {}) => {
    const res = await httpRequest.get(url,options);
    return res.data
}
export const post = async (url, data = {}, options = {}) => {
    const res = await httpRequest.post(url, data, options);
    return res.data;
}

export default httpRequest