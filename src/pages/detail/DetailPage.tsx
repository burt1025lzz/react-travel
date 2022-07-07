import React, {useEffect} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";
import {Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu} from "antd";
import styles from "./Detail.module.scss";
import {Header, Footer, ProductIntro, ProductComments} from "../../components";
import {commentMockData} from "./mockups";
import {productDetailSlice} from "../../redux/productDetail/slice";
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";

const {RangePicker} = DatePicker;

export const DetailPage: React.FC = () => {
  const {touristRouteId} = useParams()
  const product = useSelector(state => state.productDetail.data)
  const loading = useSelector(state => state.productDetail.loading)
  const error = useSelector(state => state.productDetail.error)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(productDetailSlice.actions.fetchStart())
      try {
        const {data} = await axios(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
        dispatch(productDetailSlice.actions.fetchSuccess(data))
      } catch (error: any) {
        dispatch(productDetailSlice.actions.fetchFail(error.message))
      }
    }
    fetchData().then(() => null)
  }, [])

  const menuData = [{
    key: 1,
    label: <Anchor.Link href="#feature" title="产品特色"/>
  }, {
    key: 2,
    label: <Anchor.Link href="#fees" title="费用"/>
  }, {
    key: 3,
    label: <Anchor.Link href="#notes" title="预订须知"/>
  }, {
    key: 4,
    label: <Anchor.Link href="#comments" title="用户评价"/>
  }]

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
        <Anchor className={styles.product__detail__anchor}>
          <Menu mode="horizontal" items={menuData}/>
        </Anchor>
        {/*产品特色*/}
        <div id={'feature'} className={styles.product__detail__container}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html: product.features}} style={{margin: 50}}/>
        </div>
        {/*产品费用*/}
        <div id={'fees'} className={styles.product__detail__container}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>产品费用</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html: product.fees}} style={{margin: 50}}/>
        </div>
        {/*预订须知*/}
        <div id={'notes'} className={styles.product__detail__container}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>预订须知</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html: product.notes}} style={{margin: 50}}/>
        </div>
        {/*产品评价*/}
        <div id={'comments'} className={styles.product__detail__container}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>预订须知</Typography.Title>
          </Divider>
          <div style={{margin: 40}}>
            <ProductComments data={commentMockData}/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
