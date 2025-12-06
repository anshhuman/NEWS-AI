import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from './slice/authSlice';

const store = configureStore({
    reducer : {
        authentication : authenticationReducer
    }
});

export default store;