import React from 'react'
import styles from './MainLayout.module.scss'
import {Footer, Header} from "../../components";

export const MainLayout: React.FC<any> = ({children}) =>
  (
    <>
      <Header/>
      <div className={styles.page__content}>
        {children}
      </div>
      <Footer/>
    </>
  )
