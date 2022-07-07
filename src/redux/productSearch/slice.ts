import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
  loading: boolean
  error: null | string
  data: any
  pagination: any
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null
}

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  async (params: {
    keywords: string | undefined,
    nextPage: number | string,
    pageSize: number | string
  }, thunkAPI) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${params.nextPage}&pageSize=${params.pageSize}`
    if (params.keywords) url += `&keyword=${params.keywords}`
    const response = await axios(url)
    return {
      data: response.data,
      pagination: JSON.parse(response.headers['x-pagination'])
    }
  }
)

export const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      state.loading = true
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
      state.error = null
    },
    [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
