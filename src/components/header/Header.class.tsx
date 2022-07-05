import React from "react";
import {Layout, Typography, Input, Menu, Button, Dropdown} from 'antd'
import {GlobalOutlined} from '@ant-design/icons'
import styles from './Header.module.scss'
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom'
import store from "../../redux/store";
import {LanguageState} from '../../redux/languageReducer'
import {navigationData} from './mockups'
import {withTranslation, WithTranslation} from "react-i18next";


interface State extends LanguageState {
}

class HeaderComponent extends React.Component<WithTranslation, State> {

  constructor(props) {
    super(props);
    const storeState = store.getState()
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const storeState = store.getState()
      this.setState({
        language: storeState.language,
        languageList: storeState.languageList
      })
    })
  }

  menuClickHandle = (e) => {
    let action
    if (e.key === 'new') {
      // 新语言添加
      action = {
        type: 'add_language',
        payload: {code: 'new_language', name: '新语言'}
      }
    } else {
      action = {
        type: 'change_language',
        payload: e.key
      }
    }
    store.dispatch(action)
  }

  render() {
    const {t} = this.props
    return (
      <div className={styles['app-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{marginLeft: 15}}
              overlay={
                <Menu onClick={this.menuClickHandle}>
                  {this.state.languageList.map(item => (
                    <Menu.Item key={item.code}>{item.name}</Menu.Item>
                  ))}
                  <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined/>}
            >
              {this.state.language === 'zh' ? '中文' : 'English'}
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
        <Menu mode={"horizontal"} className={styles['main-menu']} items={navigationData}/>
      </div>
    )
  }
}

export const Header = withTranslation()(HeaderComponent)
