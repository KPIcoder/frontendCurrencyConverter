const baseURL = process.env.REACT_APP_DOMAIN;

const urls = {
    currencies: '/currencies',
    timeseries: '/currencies/timeseries',
    login: '/auth/login',
    deleteCurrency: '/auth/delete',
    createCurrency: '/auth/create',
    updateCurrency: '/auth'
}

export {baseURL, urls}
