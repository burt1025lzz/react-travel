import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";
import {Spin, Row, Col, DatePicker} from "antd";
import styles from "./Detail.module.scss";
import {Header, Footer, ProductIntro} from "../../components";

const {RangePicker} = DatePicker;

export const DetailPage: React.FC = () => {
  const {touristRouteId} = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const {data} = await axios(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
        setProduct(data)
      } catch (error: any) {
        setError(error.message)
      }
      setLoading(false)
    }
    fetchData().then(() => null)
  }, [])

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
        {/*产品简介 与 日期选择*/}
        <div className={styles.product__intro__container}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <RangePicker open style={{marginTop: 20}}/>
            </Col>
          </Row>
        </div>
        {/*锚点菜单*/}
        <div className={styles.product__detail__anchor}></div>
        {/*产品特色*/}
        <div id={'feature'} className={styles.product__detail__container}></div>
        {/*产品费用*/}
        <div id={'fees'} className={styles.product__detail__container}></div>
        {/*预订须知*/}
        <div id={'notes'} className={styles.product__detail__container}></div>
        {/*产品评价*/}
        <div id={'comments'} className={styles.product__detail__container}></div>
      </div>
      <Footer/>
    </>
  )
}
