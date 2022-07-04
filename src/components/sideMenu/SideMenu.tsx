import React from "react";
import styles from "./SideMenu.module.scss";
import {sideMenuList} from "./mockup";
import {Menu} from 'antd'
import {GifOutlined} from '@ant-design/icons'

export const SideMenu: React.FC = () => {
  return (
    <Menu mode={'vertical'} className={styles.side__menu}>
      {sideMenuList.map((item, index) => (
        // 应使用 Antd 4.20.0 升级用法, 此处仅做演示
        <Menu.SubMenu
          key={`side-menu-${index}`}
          title={<span><GifOutlined style={{marginRight: 5}}/>{item.title}</span>}
        >
          {item.subMenu.map((value, index1) => (
            <Menu.SubMenu
              key={`side-menu-${index}-sub-menu-${index1}`}
              title={<span><GifOutlined style={{marginRight: 5}}/>{value.title}</span>}
            >
              {value.subMenu.map((val, index2) => (
                <Menu.Item key={`side-menu-${index}-sub-menu-${index1}-sub-sub-menu-${index2}`}>
                  <span><GifOutlined style={{marginRight: 5}}/>{val}</span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}
