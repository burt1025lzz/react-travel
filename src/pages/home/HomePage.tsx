import React from "react";
import {Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners} from '../../components'
import {Row, Col, Typography, Spin} from 'antd'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from "./HomePage.module.scss";
import {withTranslation, WithTranslation} from "react-i18next";
import axios from "axios";

interface State {
  productList: any[],
  error: null | string
  loading: boolean
}

class HomePageComponent extends React.Component<WithTranslation, State> {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      error: null,
      loading: true
    }
  }

  async componentDidMount() {
    try {
      const {data} = await axios.get('http://123.56.149.216:8080/api/productCollections')
      this.setState({
        productList: data,
        error: null,
        loading: false
      })
    } catch (error: any) {
      this.setState({
        error: error.message,
        loading: false
      })
    }
  }

  render() {
    const {t} = this.props
    const {productList, loading, error} = this.state

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
          <Row style={{marginTop: 20}}>
            <Col span={6}>
              <SideMenu/>
            </Col>
            <Col span={18}>
              <Carousel/>
            </Col>
          </Row>
          <ProductCollection
            title={<Typography.Title level={3} type={"warning"}>{t('home_page.hot_recommended')}</Typography.Title>}
            sideImage={sideImage}
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={<Typography.Title level={3} type={"danger"}>{t('home_page.new_arrival')}</Typography.Title>}
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={<Typography.Title level={3} type={"success"}>{t('home_page.domestic_travel')}</Typography.Title>}
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />
          <BusinessPartners/>
        </div>
        <Footer/>
      </>
    );
  }
}

export const HomePage = withTranslation()(HomePageComponent)
