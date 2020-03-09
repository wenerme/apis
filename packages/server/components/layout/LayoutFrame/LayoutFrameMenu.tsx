import React from 'react'
import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {Menu} from 'antd';
import Link from 'next/link';
import {useLayoutFrame} from 'components/layout/LayoutFrame/hooks';

interface RenderOptions {
  Link: React.FunctionComponent<{ href }> | React.ComponentClass<{ href }> | string
}

export const LayoutFrameMenu: React.FC = () => {
  const {menus, Link = 'a'} = useLayoutFrame();
  return (
    <Menu
      theme="light"
      mode="inline"
      // openKeys={menuOpenKeys}
      // onOpenChange={v => dispatch(setMenuOpenKeys(v))}
      // selectedKeys={[selected]}
    >
      {renderMenus(menus, {Link} as any)}
    </Menu>
  )
};

function renderMenus(menus: MenuSpec[], opts: RenderOptions) {
  return menus.map(v => renderMenu(v, opts))
}

function renderMenu(menu: MenuSpec, opts: RenderOptions) {
  const {path, title, iconComponent, children = []} = menu;
  if (path || (children?.length === 0 ?? true)) {
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


function renderMenuItem(menu: MenuSpec, {Link}: RenderOptions) {
  const {path, title, iconType, iconComponent, children} = menu;
  return (
    <Menu.Item key={path || title}>
      <Link href={path}>
        <div>
          {iconComponent}
          <span>{title}</span>
        </div>
      </Link>
    </Menu.Item>
  )
}
