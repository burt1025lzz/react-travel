import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean
  token: string | null
}

const initialState: UserState = {
  loading: false,
  token: null
}

export const login = createAsyncThunk(
  "user/login",
  async (params: {
    email: string,
    password: string
  }, thunkAPI) => {
    const {data} = await axios.post('http://123.56.149.216:8080/auth/login', {
      email: params.email,
      password: params.password
    })
    return data.token
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      state.loading = true
    },
    [login.fulfilled.type]: (state, action) => {
      state.token = action.payload
      state.loading = false
    }
  }
})
