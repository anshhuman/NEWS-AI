import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'sonner';
import { getCookie } from "../../utils/utils.js";

const initialState = {
    loading : false , 
    name : null,
    authenticated : getCookie('authenticated') || false , 
    id : null,
    token : null,
    preferences :  JSON.parse(localStorage.getItem('preferences')) || []
}

const id = getCookie('id');

export const userPreferences = createAsyncThunk('/preferences' , async (data , {rejectWithValue})=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/pref/preferences/${id}`,data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const preferencesSlice = createSlice({
    initialState,
    reducers :  {},
    name : "User-Preferences",
    extraReducers : (builder) => {
        builder.
        addCase(userPreferences.pending , (state) => {
            state.loading = true;
        }).
        addCase(userPreferences.fulfilled , (state,action) => {
            state.loading = false;
            toast.success("Preferences saved successfully");
            localStorage.setItem('preferences' , JSON.stringify(action.payload.preferences))
        })
    },
});

export default preferencesSlice.reducer;