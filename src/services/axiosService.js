import {baseURL} from "../constants";
import axios from "axios";

const axiosService = axios.create({
    baseURL,
    headers: {
        "Content-type": "Application/json"
    }
});

export {axiosService};
