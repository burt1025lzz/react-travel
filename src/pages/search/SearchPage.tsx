import React, {useEffect} from 'react'
import styles from './SearchPage.module.scss'
import {Header, Footer, ProductList} from "../../components";
import {useParams, useLocation} from "react-router-dom";
import {Spin} from "antd";
import {searchProduct} from "../../redux/productSearch/slice";
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";

export const SearchPage: React.FC = () => {
  const {keywords} = useParams()
  const loading = useSelector(state => state.productSearch.loading)
  const error = useSelector(state => state.productSearch.error)
  const productList = useSelector(state => state.productSearch.data)
  const pagination = useSelector(state => state.productSearch.pagination)
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch<any>(searchProduct({
      keywords,
      nextPage: 1,
      pageSize: 10
    }))
  }, [location])

  const onPageChange = (nextPage, pageSize) => {
    dispatch<any>(searchProduct({keywords, nextPage, pageSize}))
  }

  if (loading) {
    return (
      <Spin size="large" className={styles.page__spin}/>
    );
  }

  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <>
      <Header/>
      <div className={styles.page__content}>
        {/*产品列表*/}
        <div className={styles.product__list__container}>
          <ProductList data={productList} paging={pagination} onPageChange={onPageChange}/>
        </div>
      </div>
      <Footer/>
    </>
  )
}
