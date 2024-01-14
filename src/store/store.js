import {
    configureStore
} from "@reduxjs/toolkit";

import fetchDataReducer from "../slice/fetchSlice";

const store = configureStore({
    reducer: {
        getData: fetchDataReducer,
    },
});

export default store;