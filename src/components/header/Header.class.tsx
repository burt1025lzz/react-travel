import React from "react";
import {Layout, Typography, Input, Menu, Button, Dropdown} from 'antd'
import {GlobalOutlined} from '@ant-design/icons'
import styles from './Header.module.scss'
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom'
import store from "../../redux/store";
import {navigationData} from './mockups'

interface State {
  language: string
  languageList: { label: string, key: string }[]
}

export class Header extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    const storeState = store.getState()
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList.map(item => ({
        label: item.name,
        key: item.code
      }))
    }
  }

  menuClickHandle = (e) => {
    const action = {
      type: 'change_language',
      payload: e.key
    }
    store.dispatch(action)
  }

  render() {
    return (
      <div className={styles['app-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>让旅游更幸福</Typography.Text>
            <Dropdown.Button
              style={{marginLeft: 15}}
              overlay={<Menu items={this.state.languageList} onClick={this.menuClickHandle}/>}
              icon={<GlobalOutlined/>}
            >
              {this.state.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Link to={'register'}>
                <Button>注册</Button>
              </Link>
              <Link to={'login'}>
                <Button>登录</Button>
              </Link>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <Link to={'detail/123'}>
            <img src={logo} alt="logo" className={styles['App-logo']}/>
            <Typography.Title level={3} className={styles.title}>React 旅游网</Typography.Title>
          </Link>
          <Input.Search
            placeholder={'请输入旅游目的地、主题、或关键字'}
            className={styles['search-input']}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles['main-menu']} items={navigationData}/>
      </div>
    )
  }
}
