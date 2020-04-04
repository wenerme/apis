import React, { useState } from 'react';
import { toggleShowShare, useKongDispatch, useKongSelector } from '../reducers/kong';
import { useTranslation } from 'react-i18next';
import { Button, Descriptions, message, Modal, Switch } from 'antd';
import { useAsyncEffect } from '@wener/ui';
import produce from 'immer';
import { copy } from '@wener/utils/src/browsers/clipboard';
import { CopyOutlined, LockOutlined, ReloadOutlined, UnlockOutlined } from '@ant-design/icons/lib';
import { encrypt } from '../libs/encryption';

const KongAdminConfigShare: React.FC = () => {
  const { t } = useTranslation();
  const config = useKongSelector((v) => v.config);

  const [state, setState] = useState({
    url: `${window.location.origin}/kong/admin`,
    encryption: true,
    secret: '',
    count: 0,
  });
  const { url, encryption, secret, count } = state;
  useAsyncEffect(async () => {
    const conf = JSON.stringify(config);
    if (!encryption) {
      setState(
        produce((s) => {
          s.url = `${window.location.origin}/kong/admin#/?config=${btoa(conf).replace(/=*$/, '')}`;
          s.secret = '';
        }),
      );
      return;
    }
    const { encrypted, secret } = await encrypt(conf);

    // decrypt(encrypted, secret).then(v => console.log('DEC', v));

    setState(
      produce((s) => {
        s.url = `${window.location.origin}/kong/admin#/?config=${encrypted}`;
        s.secret = secret;
      }),
    );
  }, [encryption, count]);
  const doCopy = (v) => {
    copy(v);
    message.success(t('已复制'));
  };

  return (
    <div>
      <Descriptions layout="vertical">
        <Descriptions.Item label={t('地址')} span={3}>
          <div style={{ wordBreak: 'break-all' }}>{url}</div>
          <div>
            <Button type="link" onClick={() => doCopy(url)} icon={<CopyOutlined />}>
              {t('复制')}
            </Button>

            <Switch
              checkedChildren={<LockOutlined />}
              unCheckedChildren={<UnlockOutlined />}
              checked={encryption}
              onChange={(v) =>
                setState(
                  produce((s) => {
                    s.encryption = v;
                  }),
                )
              }
            />
          </div>
        </Descriptions.Item>
        {secret && (
          <Descriptions.Item label={t('密钥')} span={3}>
            {secret}
            <Button type="link" onClick={() => doCopy(secret)} icon={<CopyOutlined />} />
            <Button
              type="link"
              onClick={() =>
                setState(
                  produce((s) => {
                    s.count++;
                  }),
                )
              }
              icon={<ReloadOutlined />}
            />
          </Descriptions.Item>
        )}
        <Descriptions.Item label={t('配置')} span={3}>
          <div>{JSON.stringify(config)}</div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export const KongAdminConfigShareModal: React.FC = () => {
  const showShare = useKongSelector((v) => v.showShare);
  const dispatch = useKongDispatch();
  const { t } = useTranslation();
  return (
    <Modal
      title={t('分享配置')}
      visible={showShare}
      onCancel={() => dispatch(toggleShowShare())}
      destroyOnClose={true}
      footer={
        <Button type="primary" onClick={() => dispatch(toggleShowShare())}>
          {t('关闭')}
        </Button>
      }
    >
      <KongAdminConfigShare />
    </Modal>
  );
};
