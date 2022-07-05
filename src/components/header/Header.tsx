import React from "react";
import {Layout, Typography, Input, Menu, Button, Dropdown} from 'antd'
import {GlobalOutlined} from '@ant-design/icons'
import styles from './Header.module.scss'
import logo from '../../assets/logo.svg';
import {useNavigate, Link} from 'react-router-dom'
import {navigationData} from './mockups'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['app-header']}>
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button
            style={{marginLeft: 15}}
            overlay={
              <Menu
                items={[{
                  key: 1,
                  label: `中文`
                }, {
                  key: 2,
                  label: `English`
                }]}
              />
            }
            icon={<GlobalOutlined/>}
          >
            语言
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => navigate('/register')}>注册</Button>
            <Button onClick={() => navigate('/login')}>登录</Button>
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
