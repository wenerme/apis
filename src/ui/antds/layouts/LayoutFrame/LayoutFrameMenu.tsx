import React from 'react';
import { MenuSpec } from './types';
import { Menu } from 'antd';
import { useLayoutFrameOptions } from './layout';
import { useNamedTheme } from '../../../hooks/useNamedTheme';
import type { MenuProps } from 'antd/lib/menu';

interface RenderOptions {
  link: React.FunctionComponent<{ href }> | React.ComponentClass<{ href }> | string;
}

export const LayoutFrameMenu: React.FC<Partial<MenuProps>> = ({ children, ...props }) => {
  const { menus, link = 'a', menuProps = {} } = useLayoutFrameOptions();
  const [theme] = useNamedTheme();
  return (
    <Menu theme={theme === 'dark' ? 'dark' : 'light'} mode="inline" {...menuProps} {...props}>
      {renderMenus(menus, { link } as any)}
    </Menu>
  );
};

function renderMenus(menus: MenuSpec[], opts: RenderOptions) {
  return menus.map((v) => renderMenu(v, opts));
}

function renderMenu(menu: MenuSpec, opts: RenderOptions) {
  const { path, title, iconComponent, children = [] } = menu;
  if (path || children.length === 0) {
    return renderMenuItem(menu, opts);
  }

  return (
    <Menu.SubMenu
      key={path || title}
      title={
        <div>
          {iconComponent}
          <span>{title}</span>
        </div>
      }
    >
      {children.map((v) => renderMenuItem(v, opts))}
    </Menu.SubMenu>
  );
}

function renderMenuItem(menu: MenuSpec, { link: Link }: RenderOptions) {
  const { path, title, iconComponent } = menu;
  return (
    <Menu.Item key={path || title}>
      <Link href={path}>
        <div>
          {iconComponent}
          <span style={{ ...(iconComponent ? { marginLeft: 10 } : {}) }}>{title}</span>
        </div>
      </Link>
    </Menu.Item>
  );
}
