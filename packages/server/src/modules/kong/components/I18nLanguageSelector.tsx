import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForceRender } from '@wener/ui';
import { Dropdown, Menu } from 'antd';
import { DownOutlined, TranslationOutlined } from '@ant-design/icons/lib';

export const I18nLanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const forceUpdate = useForceRender();
  const lang = i18n.language;
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item disabled={lang.startsWith('zh')} onClick={() => i18n.changeLanguage('zh').then(forceUpdate)}>
            中文
          </Menu.Item>
          <Menu.Item disabled={lang.startsWith('en')} onClick={() => i18n.changeLanguage('en').then(forceUpdate)}>
            English
          </Menu.Item>
        </Menu>
      }
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <TranslationOutlined />
        <span style={{ margin: '0 6px' }}>{lang === 'en' ? '中文' : 'English'}</span>
        <DownOutlined />
      </a>
    </Dropdown>
  );
};
