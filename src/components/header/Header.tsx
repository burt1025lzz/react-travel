import React, {useState, useEffect} from "react";
import {Layout, Typography, Input, Menu, Button, Dropdown} from 'antd'
import {GlobalOutlined} from '@ant-design/icons'
import styles from './Header.module.scss'
import logo from '../../assets/logo.svg';
import {useNavigate, Link} from 'react-router-dom'
import {navigationData} from './mockups'
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {useTranslation} from 'react-i18next';
import {changeLanguageActionCreator, addLanguageActionCreator} from "../../redux/language/languageActions";
import jwtDecode, {JwtPayload as DefaultJwtPayload} from "jwt-decode";
import {userSlice} from "../../redux/user/slice";
// import {Dispatch} from "redux";
// import {LanguageActionTypes} from "../../redux/language/languageActions";

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()
  const navigationList = navigationData.map(item => ({
    key: item.key,
    label: t(item.label)
  }))
  const language = useSelector(state => state.language.language)
  const languageList = useSelector(state => state.language.languageList)
  const jwt = useSelector(state => state.user.token)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (jwt) {
      const token = jwtDecode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  }, [jwt])

  const onLogout = () => {
    dispatch(userSlice.actions.logOut())
    navigate('/')
  }

  const dispatch = useDispatch()
  const menuClickHandle = (e) => {
    if (e.key === 'new') {
      dispatch(addLanguageActionCreator('新语言', 'new_language'))
    } else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>()
  return (
    <div className={styles['app-header']}>
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{marginLeft: 15}}
            overlay={
              <Menu onClick={menuClickHandle}>
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
          {
            jwt ?
              <Button.Group className={styles['button-group']}>
                <span>
                  {t('header.welcome')}
                  <Typography.Text strong>
                    {username}
                  </Typography.Text>
                </span>
                <Button onClick={() => navigate('/shop')}>{t('header.shoppingCart')}</Button>
                <Button onClick={onLogout}>{t('header.signOut')}</Button>
              </Button.Group>
              :
              <Button.Group className={styles['button-group']}>
                <Button onClick={() => navigate('/register')}>{t('header.register')}</Button>
                <Button onClick={() => navigate('/login')}>{t('header.login')}</Button>
              </Button.Group>
          }
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <Link to={'/'}>
          <img src={logo} alt="logo" className={styles['App-logo']}/>
          <Typography.Title level={3} className={styles.title}>{t('header.title')}</Typography.Title>
        </Link>
        <Input.Search
          placeholder={t('header.placeholder')}
          className={styles['search-input']}
          onSearch={(keywords) => {
            navigate(`/search/${keywords}`)
          }}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles['main-menu']} items={navigationList}/>
    </div>
  )
}
