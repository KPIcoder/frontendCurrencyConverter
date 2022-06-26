import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {adminService, currencyService} from "../../services";

const initialState = {
    currencies: [],
    currency1: null,
    currency2: null,
    exchangeRate: null,
    amountFromCurrency1: true,
    currency1Amount: null,
    currency2Amount: null,
    status: null,
    formErrors: {},
    currencyForUpdate: null

};

const getAll = createAsyncThunk(
    'currencySlice/getAll',
    async () => {
        const {data} = await currencyService.getAll()
        return data;
    }
);

const create = createAsyncThunk(
    'currencySlice/create',
    async ({currency}, {dispatch, rejectedWithValue}) => {
        try {
            const response = await adminService.create(currency);
            if (response)
                dispatch(createCurrency({currency}));
        } catch (e) {
            return rejectedWithValue({status: e.message, formErrors: e.response.data})
        }
    }
)

const deleteById = createAsyncThunk(
    'currencySlice/deleteById',
    async ({id}, {dispatch, rejectedWithValue}) => {
        try {
            await adminService.delete(id)
            dispatch(deleteCurrency({id}))
        } catch (e) {
            return rejectedWithValue({status: e.message});
        }

    }
)

const updateById = createAsyncThunk(
    'currencySlice/updateById',
    async ({id, currency}, {dispatch, rejectedWithValue}) => {
        try {
            await adminService.update(id, currency)
            dispatch(updateCurrency({id}))
        } catch (e) {
            return rejectedWithValue({status: e.message})
        }
    }
)

const currencySlice = createSlice({
    name: 'currencySlice',
    initialState,
    reducers: {
        convert: (state) => {
            if (state.amountFromCurrency1) {
                state.currency2Amount = (state.currency1Amount * state.exchangeRate).toFixed(4);
            } else {
                state.currency1Amount = (state.currency2Amount / state.exchangeRate).toFixed(4);
            }
        },
        handleCurrency1Amount: (state, action) => {
            state.currency1Amount = action.payload;
            state.amountFromCurrency1 = true;
        },
        handleCurrency2Amount: (state, action) => {
            state.currency2Amount = action.payload;
            state.amountFromCurrency1 = false;
        },
        handleCurrency1: (state, action) => {
            state.currency1 = state.currencies.find((currency) => currency.shortname === action.payload)
        },
        handleCurrency2: (state, action) => {
            state.currency2 = state.currencies.find((currency) => currency.shortname === action.payload)
        },
        setAmountFromCurrency1: (state, action) => {
            state.amountFromCurrency1 = action.payload;
        },
        setExchangeRate: (state, action) => {
            state.exchangeRate = action.payload
        },
        setCurrency1: (state, action) => {
            state.currency1 = action.payload;
        },
        setCurrency2: (state, action) => {
            state.currency2 = action.payload;
        },
        createCurrency: (state, action) => {
            state.currencies.push(action.payload.currency);
        },
        deleteCurrency: (state, action) => {
            const index = state.currencies.findIndex((currency) => currency._id === action.payload.id);
            state.currencies.splice(index, 1);
        },
        updateCurrency: (state, action) => {
            console.log(action.payload);
            const index = state.currencies.findIndex((currency) => currency._id === action.payload.id);
            state.currencies[index] = {...state.currencies[index], ...action.payload.currency}
            state.currencyForUpdate = false;
        },
        setCurrencyForUpdate: (state, action) => {
            state.currencyForUpdate = action.payload.currency;
        }

    },
    extraReducers: (builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.currencies = action.payload;
                state.currency1 = state.currencies[0];
                state.currency2 = state.currencies[144];
                state.exchangeRate = state.currencies[144].rateByUSD;
                state.currency1Amount = 1;
                state.currency2Amount = (state.currency1Amount * state.exchangeRate).toFixed(4)
            })
            .addCase(create.rejected, (state, action) => {
                const {status, formErrors} = action.payload;
                state.status = status;
                state.formErrors = formErrors;
                console.log(action.type);
            })
    })
});

const {
    reducer: currencyReducer, actions: {
        convert, handleCurrency1Amount, handleCurrency2Amount, handleCurrency1, handleCurrency2, setCurrency1,
        setCurrency2, setAmountFromCurrency1, setExchangeRate, createCurrency, deleteCurrency, updateCurrency, setCurrencyForUpdate
    }
} = currencySlice;
const currencyActions = {
    getAll,
    create,
    deleteById,
    updateById,
    convert,
    handleCurrency1Amount,
    handleCurrency2Amount,
    setCurrency1,
    setCurrency2,
    setAmountFromCurrency1,
    setExchangeRate,
    handleCurrency1,
    handleCurrency2,
    createCurrency,
    deleteCurrency,
    updateCurrency,
    setCurrencyForUpdate
}

export {currencyReducer, currencyActions}
