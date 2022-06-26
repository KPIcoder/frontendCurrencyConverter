import {axiosService} from "./axiosService";
import {urls} from "../constants";

const currencyService = {
    getAll: () => axiosService.get(urls.currencies),
    getTimeseries: (timeseriesData) => axiosService.post(urls.timeseries, timeseriesData)
}

export{currencyService}
