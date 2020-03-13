import React, {CSSProperties} from 'react'
import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {Menu} from 'antd';
import {useLayoutDarkLightTheme, useLayoutFrameOptions} from 'components/layout/LayoutFrame/layout';

interface RenderOptions {
  link: React.FunctionComponent<{ href }> | React.ComponentClass<{ href }> | string
}

export const LayoutFrameMenu: React.FC<{ style?: CSSProperties }> = ({style}) => {
  const {menus, link = 'a'} = useLayoutFrameOptions();
  const theme = useLayoutDarkLightTheme();
  return (
    <Menu
      theme={theme}
      mode="inline"
      style={style}
      // style={{minHeight: '100%', paddingBottom: 48}}
      // openKeys={menuOpenKeys}
      // onOpenChange={v => dispatch(setMenuOpenKeys(v))}
      // selectedKeys={[selected]}
    >
      {renderMenus(menus, {link} as any)}
    </Menu>
  )
};

function renderMenus(menus: MenuSpec[], opts: RenderOptions) {
  return menus.map(v => renderMenu(v, opts))
}

function renderMenu(menu: MenuSpec, opts: RenderOptions) {
  const {path, title, iconComponent, children = []} = menu;
  if (path || children.length === 0) {
    return renderMenuItem(menu, opts)
  }

  return (
    <Menu.SubMenu
      key={path || title}
      title={(
        <div>
          {iconComponent}
          <span>{title}</span>
        </div>
      )}
    >
      {children.map(v => renderMenuItem(v, opts))}
    </Menu.SubMenu>
  )
}


function renderMenuItem(menu: MenuSpec, {link: Link}: RenderOptions) {
  const {path, title, iconComponent} = menu;
  return (
    <Menu.Item key={path || title}>
      <Link href={path}>
        <div>
          {iconComponent}
          <span style={{...(iconComponent ? {marginLeft: 10} : {})}}>{title}</span>
        </div>
      </Link>
    </Menu.Item>
  )
}
