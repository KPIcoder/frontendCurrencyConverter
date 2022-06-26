import {axiosService} from "./axiosService";
import {urls} from "../constants";

const adminService = {
    login: (password) => axiosService.post(urls.login, password),

    create: (currency) => axiosService.post(urls.createCurrency, currency, {
        headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }),
    delete: (id) => axiosService.delete(`${urls.deleteCurrency}/${id}`,  {
        headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }),
    update: (id, currency) => axiosService.put(`${urls.updateCurrency}/${id}`, currency, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export {adminService}
