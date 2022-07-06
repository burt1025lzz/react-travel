import React from "react";
import {SideMenu, Carousel, ProductCollection, BusinessPartners} from '../../components'
import {Row, Col, Typography, Spin} from 'antd'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from "./HomePage.module.scss";
import {withTranslation, WithTranslation} from "react-i18next";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {giveMeDataActionCreator} from "../../redux/recommendProduct/recommendProductActions";
import {MainLayout} from "../../layout";

const mapStateToProps = (state: RootState) => {
  return {
    productList: state.recommendProduct.productList,
    error: state.recommendProduct.error,
    loading: state.recommendProduct.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator())
    }
  }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {

  componentDidMount() {
    this.props.giveMeData()
  }

  render() {
    const {t, loading, error, productList} = this.props
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
        <MainLayout>
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
        </MainLayout>
      </>
    );
  }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent))
