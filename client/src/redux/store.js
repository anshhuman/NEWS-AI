import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from './slice/authSlice';
import preferencesReducer from './slice/prefrencesSlice';

const store = configureStore({
    reducer : {
        authentication : authenticationReducer,
        preferences : preferencesReducer
    }
});

export default store;

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authenticationReducer from "./slice/authSlice";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // localStorage

// // 🔹 Persist config
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["authentication"], // 👈 sirf auth slice persist hoga
// };

// // 🔹 Root reducer
// const rootReducer = combineReducers({
//   authentication: authenticationReducer,
// });

// // 🔹 Persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // 🔹 Store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // redux-persist warning avoid
//     }),
// });

// // 🔹 Persistor
// export const persistor = persistStore(store);

// Redux state refresh pe reset ho rahi thi, isliye auth UI break ho raha tha. redux-persist
// use karke maine auth slice ko localStorage me persist kiya, aur PersistGate se rehydration 
// ensure ki, jisse refresh ke baad bhi UI consistent rahe.

// export { store };


// Logout ke time persist clear karo:
// import { persistor } from "../store";

// const logout = async () => {
//   await persistor.purge(); // 🔥 localStorage clear
//   dispatch(logoutAction());
// };


// Isse:

// Old user ka data next login me nahi aayega

// Clean auth flow milega