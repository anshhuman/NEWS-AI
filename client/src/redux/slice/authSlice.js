import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { setCookie , getCookie , delCookie} from '../../utils/utils.js';

const initialState = {
    loading : false , 
    name : null,
    authenticated : getCookie('authenticated') || false , 
    id : null,
    token : null,
    preferences : []
}

// Create slice for user registration

export const SignUp = createAsyncThunk('/Register' , async (data , {rejectWithValue})=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Create slice for user login

export const SignIn = createAsyncThunk('/Login' , async(data , {rejectWithValue}) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
          data,
          {withCredentials : true} 
        );
        const verifyres = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`,
          {withCredentials : true}
        );
        return {...res.data , ...verifyres.data};
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Create an API for token verification


const authSlice = createSlice({

    name : 'User-Authentication',
    initialState,

    reducers : {
      signOut : function (state) {
        state.authenticated = false;
        state.id = null;
        state.name = null;
        state.token = null;
        delCookie('authenticated');
        delCookie('name');
        delCookie('id');
        delCookie('token');
      }
    },

    extraReducers : (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.message);
        toast.success(action.payload.message);
      })
      .addCase(SignUp.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        toast.error(action.payload.response.data.message);
      })
      .addCase(SignIn.pending , (state)=> {
        state.loading = true;
      })
      .addCase(SignIn.fulfilled , (state , action) => {
        state.loading = false;
        console.log(action.payload);
        state.name = action.payload.name;
        state.authenticated = action.payload.authenticated;
        state.id = action.payload.id;
        state.preferences = action.payload.preferences;
        toast.success(action.payload.message);
        setCookie('name' , action.payload.name);
        setCookie('authenticated' , action.payload.authenticated);
        setCookie('id' , action.payload.id);
        setCookie('token' , action.payload.token);
      });
  },
});

export default authSlice.reducer;
export const {signOut} = authSlice.actions

// 1.) const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,data,{withCredentials : true});

// Agar aap ek login system bana rahe ho jisme token verification ki zrurat h , toh apko ek alag se
// thunk create krna pdega jo token ko verify kar sake. 

// Agar apko ek aisa login system banana hai toh isme generally kuch steps hote hai : 

// Step-1 => User apna email or password deta hai login krne ke liye , agar uske credentials correct 
//           hai toh server ek token generate kar deta hai.
// Step-2 => Agar apan " {withCredentials : true} " nhi lgayenge toh token browser/cookie 
//           me store hi nhi hogi ,browser cookie receive hi nhi krege.  Isiliye apan axios.get me " {withCredentials : true} " krna 
//           pdta hai taki cookie me stored token server ko bheja ja ske.

// Example : Aapki frontend API: http://localhost:5173

// Apki Backend API: http://localhost:5000

// Dono alag origin hain, toh normally cookies send nahi hongi.
// Agar server login ke baad cookie set karega (JWT), toh browser tabhi us cookie ko store karega jab withCredentials: true use hoga.


// 2.) const verifyres = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`,{withCredentials : true});
//     {withCredentials : true} => JWT jo ki cookie me saved hai , ye usko request ke saath server tk lekke jata hai.
//     Fir server me defined middleware us token ko verify kar ke response bhejta hai and then so on. 

// In short : Backend ne frontend pe cookie bheji , fir "withCredentials: true" ke through frontend
//  ne wo cookie wapis backend pe bheji taki backend us token ko verify kar ske.
//  Check mtlb => Backend asks , kya ye wahi token hai , jo mene bheja tha ? Agr ha toh 
//                user authenticated hai. 

// Note : Agar ap "withCredentials: true" nhi lgayenge toh cookie browser me store hi nhi hogi
