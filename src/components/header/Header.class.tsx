import React from "react";
import {Layout, Typography, Input, Menu, Button, Dropdown} from 'antd'
import {GlobalOutlined} from '@ant-design/icons'
import styles from './Header.module.scss'
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom'
import store from "../../redux/store";

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

  render() {
    return (
      <div className={styles['app-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>让旅游更幸福</Typography.Text>
            <Dropdown.Button
              style={{marginLeft: 15}}
              overlay={<Menu items={this.state.languageList}/>}
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
        <Menu mode={"horizontal"} className={styles['main-menu']}
              items={[{
                key: 1,
                label: `旅游首页`
              }, {
                key: 2,
                label: `周末游`
              }, {
                key: 3,
                label: `跟团游`
              }, {
                key: 4,
                label: ` 自由行 `
              }, {
                key: 5,
                label: ` 私家团 `
              }, {
                key: 6,
                label: ` 邮轮 `
              }, {
                key: 7,
                label: ` 酒店+景点 `
              }, {
                key: 8,
                label: ` 当地玩乐 `
              }, {
                key: 9,
                label: ` 主题游 `
              }, {
                key: 10,
                label: ` 定制游 `
              }, {
                key: 11,
                label: ` 游学 `
              }, {
                key: 12,
                label: ` 签证 `
              }, {
                key: 13,
                label: ` 企业游 `
              }, {
                key: 14,
                label: ` 高端游 `
              }, {
                key: 15,
                label: ` 爱玩户外 `
              }, {
                key: 16,
                label: ` 保险 `
              }]}
        />
      </div>
    )
  }
}
