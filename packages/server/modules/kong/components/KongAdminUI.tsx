import React, {useMemo, useState} from 'react';
import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {HashRouter as Router, Link} from 'react-router-dom';
import {RouteFrameContent} from 'components/layout/RouteFrame/RouteFrameContent';
import {LayoutFrame} from 'components/layout/LayoutFrame/LayoutFrame';
import {RouteSpec} from 'components/layout/RouteFrame/types';
import {LayoutFrameContent} from 'components/layout/LayoutFrame/LayoutFrameContent';
import i18next from 'i18next'
import {isDev} from 'utils/utils';
import {
  ApiOutlined,
  AppstoreAddOutlined,
  ClusterOutlined,
  CopyOutlined,
  FullscreenOutlined,
  FundOutlined,
  LockOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  ShareAltOutlined,
  TeamOutlined,
  UnlockOutlined
} from '@ant-design/icons/lib';
import CaCertificateOutlined from 'components/icons/CaCertificateOutlined';
import {
  clearConfig,
  toggleShowSetup,
  toggleShowShare,
  useKongDispatch,
  useKongSelector
} from 'modules/kong/reducers/kong';
import {Button, Descriptions, Divider, Form, message, Modal, Switch} from 'antd';
import {omitBy} from 'lodash';
import {buildInitialValues, FormFieldProps, FormFieldsBuilder} from 'libs/antds/form/builder';
import {FormInstance} from 'antd/lib/form';
import {copy} from 'utils/clipboard';
import produce from 'immer';
import {Base64Url} from 'utils/base';
import {useAsyncEffect} from 'hooks/useAsyncEffect';
import {doSetupConfig} from 'modules/kong/reducers/actions';

i18next.init({
  lng: 'zh',
  debug: isDev(),
  resources: {
    en: {
      translation: {
        'key': 'hello world'
      }
    }
  }
}, (err, t) => {
  // initiali=?zed and ready to go!
  // document.getElementById('output').innerHTML = i18next.t('key');
});
const _ = i18next.t;

const menus: Array<MenuSpec & RouteSpec> = [
  {
    // title: _('基础信息'),
    title: '基础信息',
    path: '/',
    iconComponent: <FundOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongAdminSummary'))
  },
  {
    title: '服务',
    path: '/service',
    iconComponent: <ApiOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongServiceList').then(({KongServiceList}) => ({default: KongServiceList})))
  },
  {
    title: '路由',
    path: '/route',
    iconComponent: <FullscreenOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongRouteList').then(({KongRouteList}) => ({default: KongRouteList})))
  },
  {
    title: '消费者',
    path: '/consumer',
    iconComponent: <TeamOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongConsumerList').then(({KongConsumerList}) => ({default: KongConsumerList})))
  },
  {
    title: '插件',
    path: '/plugin',
    iconComponent: <AppstoreAddOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongPluginList').then(({KongPluginList}) => ({default: KongPluginList})))
  },
  {
    title: '上游',
    path: '/upstream',
    exact: true,
    iconComponent: <ClusterOutlined />,
    component: React.lazy(() => import('./pages/KongUpstreamList').then(({KongUpstreamList}) => ({default: KongUpstreamList})))
  },
  {
    title: '证书',
    path: '/certificate',
    iconComponent: <SafetyCertificateOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongCertificateList').then(({KongCertificateList}) => ({default: KongCertificateList})))
  },
  {
    title: 'CA证书',
    path: '/ca-certificate',
    iconComponent: <CaCertificateOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongCaCertificateList').then(({KongCaCertificateList}) => ({default: KongCaCertificateList})))
  },
  {
    title: 'SNIs',
    path: '/snis',
    iconComponent: <SecurityScanOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongSnisList').then(({KongSnisList}) => ({default: KongSnisList})))
  },
];

const ReactRouterLink: React.FC<{ href }> = ({href, ...props}) => <Link to={href} {...props} />;

const KongAdminHeader: React.FC = () => {
  const api = useKongSelector(v => v.config?.baseURL);
  const dispatch = useKongDispatch();
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>Kong Admin</h2>
      <div style={{display: 'grid', gridAutoFlow: 'column', columnGap: '12px', alignItems: 'center'}}>
        <Button type="link" icon={<SettingOutlined />} onClick={() => dispatch(toggleShowSetup())}>
          {api}
        </Button>
        <Button type="link" icon={<ShareAltOutlined />} onClick={() => dispatch(toggleShowShare())}>
          复制配置链接
        </Button>
        <small>v 1.0.0</small>
      </div>
    </div>
  )
};

const KongAdminSetupForm: React.FC<{ initialValues?, onSubmit?, form?: FormInstance, showActions?: boolean }> = ({initialValues, onSubmit, form: initialForm, showActions}) => {
  const [form] = Form.useForm(initialForm);

  const fields: FormFieldProps[] = [
    {key: 'baseURL', label: '接口地址', placeholder: 'http://127.0.0.1:8001', defaultValue: 'http://127.0.0.1:8001'},
  ];

  const encryptFields: FormFieldProps[] = [
    {key: 'encrypted', label: '加密配置'},
    {
      key: 'secret', label: '密钥', widget: 'password',
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
                return
              }
              try {
                const conf = await decrypt(encrypted, secret);
                form.setFieldsValue(JSON.parse(conf));
                message.success(`已应用配置`)
              } catch (e) {
                message.error(`解密失败: ${e.toString()}`)
              }
            }} />
        )
      }
    },
  ];

  const initial = useMemo(() => {
    const o = initialValues ? omitBy(initialValues, v => v === null) : buildInitialValues([...fields]);
    console.log('initialValues', initialValues);
    return o
  }, [initialValues]);
  if (typeof showActions !== 'boolean') {
    showActions = !Boolean(initialForm)
  }
  const dispatch = useKongDispatch();
  const [loading, setLoading] = useState(false);
  onSubmit = onSubmit ?? (async values => {
    setLoading(true);
    try {
      await dispatch(doSetupConfig(values))
    } catch (e) {
      console.error(`Setup failed`, values, e);
      message.error(`配置失败: ${e.message ?? e.toString()}`)
    } finally {
      setLoading(false)
    }
  });
  return (
    <Form
      form={form}
      initialValues={initial}
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
      onFinish={onSubmit}
    >
      <FormFieldsBuilder pure fields={fields} />

      {initial?.encrypted && (
        <div>
          <Divider>加密配置</Divider>
          <FormFieldsBuilder pure fields={encryptFields} />
        </div>
      )}

      {showActions && (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Button htmlType="submit" loading={loading} type="primary">提交</Button>
          <Button htmlType="reset" onClick={() => form.resetFields()}>重置</Button>
        </div>
      )}
    </Form>
  )
};

async function encrypt(v): Promise<{ encrypted, secret }> {
  const encoder = new TextEncoder();
  const counter = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.generateKey({name: 'AES-CTR', length: 128}, true, ['encrypt', 'decrypt']);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      counter,
      length: 64,
    },
    key,
    encoder.encode(v)
  );
  const keyRaw = await crypto.subtle.exportKey('raw', key);
  // console.log(await crypto.subtle.exportKey('jwk', key))
  // console.log(btoa(JSON.stringify(await crypto.subtle.exportKey('jwk', key))))
  return {
    encrypted: Base64Url.stringify(counter, {pad: false}) + '.' + Base64Url.stringify(new Uint8Array(encrypted), {pad: false}),
    // secret: base64url.stringify('AES-CTR', {pad: false}) + '.' + base64url.stringify(new Uint8Array(keyRaw), {pad: false}),
    secret: Base64Url.stringify(new Uint8Array(keyRaw), {pad: false}),
  }
}

async function decrypt(encrypted: string, secret: string): Promise<string> {
  const [initialStr, encStr] = encrypted.split('.');
  const initial = Base64Url.parse(initialStr, {loose: true});
  const enc = Base64Url.parse(encStr, {loose: true});

  const decoder = new TextDecoder();

  const sec = Base64Url.parse(secret, {loose: true});
  const key = await crypto.subtle.importKey('raw', sec, 'AES-CTR', false, ['encrypt', 'decrypt']);
  const dec = await crypto.subtle.decrypt({name: 'AES-CTR', counter: initial, length: 64,}, key, enc);
  return decoder.decode(dec)
}

const KongAdminConfigShare: React.FC = () => {
  const config = useKongSelector(v => v.config);

  const [state, setState] = useState({
    url: `${window.location.origin}/kong/admin`,
    encryption: true,
    secret: '',
    count: 0,
  });
  const {url, encryption, secret, count} = state;
  useAsyncEffect(async () => {
    const conf = JSON.stringify(config);
    if (!encryption) {
      setState(produce(s => {
        s.url = `${window.location.origin}/kong/admin?config=${btoa(conf).replace(/=*$/, '')}`;
        s.secret = ''
      }));
      return
    }
    const {encrypted, secret} = await encrypt(conf);

    // decrypt(encrypted, secret).then(v => console.log('DEC', v));

    setState(produce(s => {
      s.url = `${window.location.origin}/kong/admin?config=${encrypted}`;
      s.secret = secret
    }));
  }, [encryption, count]);
  const doCopy = (v) => {
    copy(v);
    message.success('已复制')
  };

  return (
    <div>

      <Descriptions layout="vertical">
        <Descriptions.Item label="地址" span={3}>
          <div style={{wordBreak: 'break-all'}}>
            {url}
          </div>
          <div>
            <Button type="link" onClick={() => doCopy(url)} icon={<CopyOutlined />} children="复制" />

            <Switch
              checkedChildren={<LockOutlined />}
              unCheckedChildren={<UnlockOutlined />}
              checked={encryption}
              onChange={v => setState(produce(s => {
                s.encryption = v
              }))} />

          </div>
        </Descriptions.Item>
        {secret && (
          <Descriptions.Item label="密钥" span={3}>
            {secret}
            <Button type="link" onClick={() => doCopy(secret)} icon={<CopyOutlined />} />
            <Button type="link" onClick={() => setState(produce(s => {
              s.count++
            }))} icon={<ReloadOutlined />} />
          </Descriptions.Item>
        )}
        <Descriptions.Item label="配置" span={3}>
          <div>
            {JSON.stringify(config)}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
};
const KongAdminConfigShareModal: React.FC = () => {
  const showShare = useKongSelector(v => v.showShare);
  const dispatch = useKongDispatch();

  return (
    <Modal
      title="分享配置"
      visible={showShare}
      onCancel={() => dispatch(toggleShowShare())}
      destroyOnClose={true}
      footer={
        <Button type="primary" onClick={() => dispatch(toggleShowShare())}>
          关闭
        </Button>
      }
    >
      <KongAdminConfigShare />
    </Modal>
  )
};
const KongAdminSetupModal: React.FC = () => {
  const showSetup = useKongSelector(v => v.showSetup);
  const dispatch = useKongDispatch();
  const config = useKongSelector(v => v.config);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      title="Kong Admin Setup"
      visible={showSetup}
      onCancel={() => dispatch(toggleShowSetup())}
      footer={(
        <div>
          <Button onClick={() => dispatch(toggleShowSetup())} children="取消" />
          <Button onClick={() => form.submit()} loading={loading} type="primary" children="更新" />
          <Button onClick={() => {
            dispatch(clearConfig());
            dispatch(toggleShowSetup())
          }} children="清除" />
        </div>
      )}
    >
      <KongAdminSetupForm
        form={form}
        initialValues={config}
        onSubmit={async values => {
          setLoading(true);
          try {
            await dispatch(doSetupConfig(values));
            dispatch(toggleShowSetup())
          } catch (e) {
            message.error(`配置错误: ${e.message || e.toString()}`)
          } finally {
            setLoading(false)
          }
        }}
      />
    </Modal>
  )
};

export const KongAdminUI: React.FC = () => {
  const init = useKongSelector(v => Boolean(v.config));

  let initial = null;
  const conf = new URL(location.href).searchParams.get('config') || '';
  if (conf.includes('.')) {
    // encrypted
    initial = {encrypted: conf}
  } else {
    try {
      initial = JSON.parse(atob(conf));
    } catch (e) {
      message.error(`错误的初始配置`)
    }
  }

  return (
    <Router>
      {!init && (
        <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            width: '60vw',
            backgroundColor: '#fff',
            padding: 24
          }}>
            <h2>Kong 服务配置</h2>
            <KongAdminSetupForm initialValues={initial} />
          </div>
        </div>
      )}
      {init && (
        <LayoutFrame
          header={<KongAdminHeader />}
          menus={menus}
          link={ReactRouterLink}
        >
          <LayoutFrameContent>
            <KongAdminSetupModal />
            <KongAdminConfigShareModal />
            <RouteFrameContent routes={menus as any} />
          </LayoutFrameContent>
        </LayoutFrame>
      )}
    </Router>
  )
};
