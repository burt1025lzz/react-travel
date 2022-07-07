import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart: (state) => {
      // return {...state, loading: true}
      // 引入 immer 插件后, 允许下面写法
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    // action 的类型可写成如下代码
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
