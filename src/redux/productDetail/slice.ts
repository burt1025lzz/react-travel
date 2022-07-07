import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
  loading: boolean
  error: null | string
  data: any
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string | undefined, thunkAPI) => {
    const {data} = await axios(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
    return data
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    // fetchStart: (state) => {
    //   // return {...state, loading: true}
    //   // 引入 immer 插件后, 允许下面写法
    //   state.loading = true
    // },
    // fetchSuccess: (state, action) => {
    //   state.data = action.payload
    //   state.loading = false
    //   state.error = null
    // },
    // // action 的类型可写成如下代码
    // fetchFail: (state, action: PayloadAction<string | null>) => {
    //   state.loading = false
    //   state.error = action.payload
    // }
  },
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
