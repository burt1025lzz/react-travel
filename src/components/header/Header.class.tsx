import React from "react";
import {Layout, Typography, Input, Menu, Button, Dropdown} from 'antd'
import {GlobalOutlined} from '@ant-design/icons'
import styles from './Header.module.scss'
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom'
import {RootState} from "../../redux/store";
import {navigationData} from './mockups'
import {withTranslation, WithTranslation} from "react-i18next";
import {addLanguageActionCreator, changeLanguageActionCreator} from "../../redux/language/languageActions";
import {connect} from "react-redux";
import {Dispatch} from "redux";

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: string) => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action)
    }
  }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HeaderComponent extends React.Component<PropsType> {

  menuClickHandle = (e) => {
    if (e.key === 'new') {
      this.props.addLanguage('新语言', 'new_language')
    } else {
      this.props.changeLanguage(e.key)
    }
  }

  render() {
    const {t, language, languageList} = this.props
    const navigationList = navigationData.map(item => ({
      key: item.key,
      label: t(item.label)
    }))
    return (
      <div className={styles['app-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{marginLeft: 15}}
              overlay={
                <Menu onClick={this.menuClickHandle}>
                  {languageList.map(item => (
                    <Menu.Item key={item.code}>{item.name}</Menu.Item>
                  ))}
                  <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined/>}
            >
              {language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Link to={'register'}>
                <Button>{t('header.register')}</Button>
              </Link>
              <Link to={'login'}>
                <Button>{t('header.login')}</Button>
              </Link>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <Link to={'detail/123'}>
            <img src={logo} alt="logo" className={styles['App-logo']}/>
            <Typography.Title level={3} className={styles.title}>{t('header.title')}</Typography.Title>
          </Link>
          <Input.Search
            placeholder={t('header.placeholder')}
            className={styles['search-input']}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles['main-menu']} items={navigationList}/>
      </div>
    )
  }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HeaderComponent))
