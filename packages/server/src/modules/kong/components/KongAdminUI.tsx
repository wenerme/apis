import React, { useMemo, useState } from 'react';
import { MenuSpec } from '../../../components/layout/LayoutFrame/types';
import { HashRouter as Router, Link } from 'react-router-dom';
import { RouteFrameContent } from '../../../components/layout/RouteFrame/RouteFrameContent';
import { LayoutFrame } from '../../../components/layout/LayoutFrame/LayoutFrame';
import { RouteSpec } from '../../../components/layout/RouteFrame/types';
import { LayoutFrameContent } from '../../../components/layout/LayoutFrame/LayoutFrameContent';
import i18next from 'i18next';
import {
  ApiOutlined,
  AppstoreAddOutlined,
  ClusterOutlined,
  FullscreenOutlined,
  FundOutlined,
  SafetyCertificateOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  ShareAltOutlined,
  TagsOutlined,
  TeamOutlined,
  UnlockOutlined
} from '@ant-design/icons/lib';
import CaCertificateOutlined from '../../../components/icons/CaCertificateOutlined';
import { clearConfig, toggleShowSetup, toggleShowShare, useKongDispatch, useKongSelector } from '../reducers/kong';
import { Button, Divider, Form, message, Modal } from 'antd';
import { omitBy } from 'lodash';
import { buildInitialValues, FormFieldProps, FormFieldsBuilder } from '../../../libs/antds/form/builder';
import { FormInstance } from 'antd/lib/form';
import { doSetupConfig } from '../reducers/actions';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, Trans, useTranslation } from 'react-i18next';
import { KongAdminConfigShareModal } from './KongAdminConfigShareModal';
import { decrypt } from '../libs/encryption';
import { I18nLanguageSelector } from './I18nLanguageSelector';
import { HeaderInput } from './HeaderInput';
import { FormListField } from './FormListField';
import { headersFromArray } from '../libs/headers';
import { i18nextInflection } from '../../../libs/i18nexts/plugins/inflection-postprocessor';
import { isDev } from '@wener/utils/src/envs/isDev';

i18next
  .use(i18nextInflection)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      lng: 'en',
      ns: ['common', 'kong'],
      defaultNS: 'kong',
      debug: isDev(),
      // resources: {
      //   en: {
      //     translation: {
      //       'key': 'hello world'
      //     }
      //   }
      // }
      fallbackLng: {
        // 'zh-Hant': ['zh-Hans', 'en'],
        // 'default': ['en']
      },
      fallbackNS: ['common'],
      interpolation: {
        escapeValue: false // not needed for react as it escapes by default
      },
      backend: {
        // for all available options read the backend's repository readme file
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }
    },
    (err, t) => {
      // initiali=?zed and ready to go!
      // document.getElementById('output').innerHTML = i18next.t('key');
    }
  );

const ReactRouterLink: React.FC<{ href }> = ({ href, ...props }) => <Link to={href} {...props} />;

const KongAdminHeader: React.FC = () => {
  const { t } = useTranslation();
  const api = useKongSelector((v) => v.config?.baseURL);
  const dispatch = useKongDispatch();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <h2>Kong Admin</h2>
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          columnGap: '12px',
          alignItems: 'center'
        }}
      >
        <Button type="link" icon={<SettingOutlined />} onClick={() => dispatch(toggleShowSetup())}>
          {api}
        </Button>
        <Button type="link" icon={<ShareAltOutlined />} onClick={() => dispatch(toggleShowShare())}>
          {t('复制配置链接')}
        </Button>
        <I18nLanguageSelector />
        <small>v 1.0.0</small>
      </div>
    </div>
  );
};

const KongAdminSetupForm: React.FC<{
  initialValues?;
  onSubmit?;
  form?: FormInstance;
  showActions?: boolean;
}> = ({ initialValues, onSubmit, form: initialForm, showActions }) => {
  const [form] = Form.useForm(initialForm);
  const { t, i18n } = useTranslation();
  window['i18next'] = i18next;
  const fields: FormFieldProps[] = [
    {
      key: 'baseURL',
      label: t('接口地址'),
      placeholder: 'http://127.0.0.1:8001',
      defaultValue: 'http://127.0.0.1:8001'
    },
    {
      key: 'headers',
      label: t('请求头'),
      widget: HeaderInput,
      render: FormListField
    }
  ];

  const encryptFields: FormFieldProps[] = [
    { key: 'encrypted', label: t('加密配置') },
    {
      key: 'secret',
      label: t('密钥'),
      widget: 'password',
      widgetProps: {
        addonAfter: (
          <Button
            icon={<UnlockOutlined />}
            type="link"
            size="small"
            onClick={async () => {
              const encrypted = form.getFieldValue('encrypted');
              const secret = form.getFieldValue('secret');
              if (!secret) {
                message.error(`请输入密钥`);
                return;
              }
              try {
                const conf = await decrypt(encrypted, secret);
                form.setFieldsValue(JSON.parse(conf));
                message.success(`已应用配置`);
              } catch (e) {
                message.error(`解密失败: ${e.toString()}`);
              }
            }}
          />
        )
      }
    }
  ];

  const initial = useMemo(() => {
    let o = initialValues ? omitBy(initialValues, (v) => v === null) : buildInitialValues([...fields]);
    if (o['headers']) {
      if (!Array.isArray(o['headers'])) {
        o = { ...o, headers: Object.entries(o['headers']) };
      }
    }
    return o;
  }, [initialValues]);
  if (typeof showActions !== 'boolean') {
    showActions = !initialForm;
  }
  const dispatch = useKongDispatch();
  const [loading, setLoading] = useState(false);
  onSubmit =
    onSubmit ??
    (async (values) => {
      setLoading(true);
      try {
        await dispatch(doSetupConfig(values));
      } catch (e) {
        console.error(`Setup failed`, values, e);
        message.error(`配置失败: ${e.message ?? e.toString()}`);
      } finally {
        setLoading(false);
      }
    });
  return (
    <Form
      form={form}
      initialValues={initial}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={(values) => {
        values['headers'] = headersFromArray(values['headers']);
        onSubmit(values);
      }}
    >
      <FormFieldsBuilder fields={fields} />

      {initial?.encrypted && (
        <div>
          <Divider>{t('加密配置')}</Divider>
          <FormFieldsBuilder pure fields={encryptFields} />
        </div>
      )}

      {showActions && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button htmlType="submit" type="primary">
            <Trans>提交</Trans>
          </Button>
          <Button htmlType="reset" onClick={() => form.resetFields()}>
            <Trans>重置</Trans>
          </Button>
        </div>
      )}
    </Form>
  );
};

const KongAdminSetupModal: React.FC = () => {
  const showSetup = useKongSelector((v) => v.showSetup);
  const dispatch = useKongDispatch();
  const config = useKongSelector((v) => v.config);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      title="Kong Admin Setup"
      visible={showSetup}
      onCancel={() => dispatch(toggleShowSetup())}
      footer={
        <div>
          <Button onClick={() => dispatch(toggleShowSetup())}>{t('取消')}</Button>
          <Button onClick={() => form.submit()} loading={loading} type="primary">
            {t('更新')}
          </Button>
          <Button
            onClick={() => {
              dispatch(clearConfig());
              dispatch(toggleShowSetup());
            }}
          >
            {t('清除')}
          </Button>
        </div>
      }
    >
      <KongAdminSetupForm
        form={form}
        initialValues={config}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await dispatch(doSetupConfig(values));
            dispatch(toggleShowSetup());
          } catch (e) {
            message.error(`配置错误: ${e.message || e.toString()}`);
          } finally {
            setLoading(false);
          }
        }}
      />
    </Modal>
  );
};

export const KongAdminUI: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Initialing KongAdmin</div>}>
      <KongAdmin />
    </React.Suspense>
  );
};

const KongConfigPanel: React.FC = () => {
  const { t } = useTranslation();

  let initial = null;
  const params = new URL(location.href.replace('#', '')).searchParams;
  const conf = params.get('config') ?? '';
  if (conf.includes('.')) {
    // encrypted
    initial = { encrypted: conf };
  } else if (conf) {
    try {
      initial = JSON.parse(atob(conf));
    } catch (e) {
      message.error(t(`错误的初始配置`));
    }
  }
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '60vw',
          padding: 24,
          // 等于背景白色 - 但能配合 theme
          backdropFilter: 'brightness(200%)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Kong {t('配置')}</h2>
          <div>
            <I18nLanguageSelector />
          </div>
        </div>
        <KongAdminSetupForm initialValues={initial} />
      </div>
    </div>
  );
};
export const KongAdmin: React.FC = () => {
  const init = useKongSelector((v) => Boolean(v.config));

  const { t, i18n } = useTranslation();

  console.log(`KongAdmin Render`, i18n.language, t('基础'));

  const menus: Array<MenuSpec & RouteSpec> = [
    {
      title: t('信息'),
      path: '/',
      iconComponent: <FundOutlined />,
      exact: true,
      component: React.lazy(() => import('./pages/dashboard/KongAdminSummary'))
    },
    {
      title: t('标签', { count: 0, postProcess: 'inflection' }),
      path: '/tags',
      iconComponent: <TagsOutlined />,
      exact: true,
      component: React.lazy(() =>
        import('./pages/tag/KongTagList').then(({ KongTagList }) => ({
          default: KongTagList
        }))
      )
    },
    {
      title: t('服务', { count: 0, postProcess: 'inflection' }),
      path: '/services',
      iconComponent: <ApiOutlined />,
      exact: true,
      component: React.lazy(() =>
        import('./pages/service/KongServiceList').then(({ KongServiceList }) => ({ default: KongServiceList }))
      )
    },
    {
      title: t('路由', { count: 0, postProcess: 'inflection' }),
      path: '/routes',
      iconComponent: <FullscreenOutlined />,
      exact: true,
      component: React.lazy(() =>
        import('./pages/route/KongRouteList').then(({ KongRouteList }) => ({
          default: KongRouteList
        }))
      )
    },
    {
      title: t('消费者', { count: 0, postProcess: 'inflection' }),
      path: '/consumers',
      iconComponent: <TeamOutlined />,
      exact: true,
      component: React.lazy(() =>
        import('./pages/consumer/KongConsumerList').then(({ KongConsumerList }) => ({ default: KongConsumerList }))
      )
    },
    {
      title: t('插件', { count: 0, postProcess: 'inflection' }),
      path: '/plugins',
      iconComponent: <AppstoreAddOutlined />,
      exact: true,
      component: React.lazy(() =>
        import('./pages/plugin/KongPluginList').then(({ KongPluginList }) => ({
          default: KongPluginList
        }))
      )
    },
    {
      title: t('上游', { count: 0, postProcess: 'inflection' }),
      path: '/upstreams',
      exact: true,
      iconComponent: <ClusterOutlined />,
      component: React.lazy(() =>
        import('./pages/upstream/KongUpstreamList').then(({ KongUpstreamList }) => ({ default: KongUpstreamList }))
      )
    },
    {
      title: t('证书', { count: 0, postProcess: 'inflection' }),
      path: '/certificates',
      iconComponent: <SafetyCertificateOutlined />,
      exact: true,
      component: React.lazy(() =>
        import('./pages/certificate/KongCertificateList').then(({ KongCertificateList }) => ({
          default: KongCertificateList
        }))
      )
    },
    {
      title: t('CA证书', { count: 0, postProcess: 'inflection' }),
      path: '/ca-certificates',
      iconComponent: <CaCertificateOutlined />,
      exact: true,
      component: React.lazy(() =>
        import('./pages/KongCaCertificateList').then(({ KongCaCertificateList }) => ({
          default: KongCaCertificateList
        }))
      )
    },
    {
      title: t('SNIs'),
      path: '/snis',
      iconComponent: <SecurityScanOutlined />,
      exact: true,
      component: React.lazy(() =>
        import('./pages/sni/KongSnisList').then(({ KongSnisList }) => ({
          default: KongSnisList
        }))
      )
    }
  ];

  return (
    <Router>
      {!init && <KongConfigPanel />}
      {init && (
        <LayoutFrame name="kong" header={<KongAdminHeader />} menus={menus} link={ReactRouterLink}>
          <LayoutFrameContent>
            <KongAdminSetupModal />
            <KongAdminConfigShareModal />
            <RouteFrameContent routes={menus as any} />
          </LayoutFrameContent>
        </LayoutFrame>
      )}
    </Router>
  );
};
