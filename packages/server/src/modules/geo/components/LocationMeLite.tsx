import React, { useRef, useState } from 'react';
import { useAsyncEffect } from '@wener/ui';
import { Alert, Descriptions } from 'antd';
import { useConstant } from '@wener/ui';
// import { Console as ConsoleFeed, Hook, Unhook } from 'console-feed';
// import type { HookedConsole } from 'console-feed/lib/definitions/Console';

function usePosition(options: { console?; onError?; onWarn?; onInfo?; onPosition?: (pos: Position) => void }) {
  const idRef = useRef<any>();
  useAsyncEffect(async () => {
    const {
      console = window.console,
      onPosition = () => null,
      onError = console.error,
      onInfo = console.info,
      onWarn = console.warn,
    } = options;

    if (!('geolocation' in navigator)) {
      onError('无 geolocation 支持');
      return;
    }

    await new Promise((resolve, reject) => {
      if ('permissions' in navigator) {
        onInfo('有 permissions 支持');

        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'granted') {
            onInfo('已授权');
            resolve(true);
          } else if (result.state === 'prompt') {
            onWarn('待请求授权');
            resolve(false);
          } else {
            onError('未授权 ' + JSON.stringify(result));
            resolve(false);
          }
        });
      } else {
        onError('无 permissions 支持');
        resolve(false);
      }
    });

    onInfo('开始获取定位... 超时=15秒');

    let watchId;
    try {
      idRef.current = watchId = navigator.geolocation.getCurrentPosition(
        (position) => {
          onInfo('获取定位成功', position);

          onPosition(position);

          onInfo('开始进行持续定位');
          navigator.geolocation.watchPosition(
            (position) => {
              onInfo('更新定位', position);
              onPosition(position);
            },
            (error) => {
              onWarn('持续定位失败 code:' + error.code + '  message:' + error.message, error);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 0,
            },
          );
        },
        (error) => {
          onError('获取失败 code:' + error.code + '  message:' + error.message, error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        },
      );
    } catch (e) {
      onError('操作失败', e);
    }
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  return () => {
    if (idRef.current) {
      navigator.geolocation.clearWatch(idRef.current);
      idRef.current = null;
    }
  };
}

function createFakeConsole({ onRecord }) {
  const levels = ['log', 'debug', 'info', 'warn', 'error', 'table', 'clear', 'time', 'timeEnd', 'count', 'assert'];
  const c = {};
  levels.forEach((v) => (c[v] = (...message) => onRecord({ level: v, message })));
  return c;
}

export const LocationMeLite: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [position, setPosition] = useState<any>(null);
  const con = useConstant(() =>
    createFakeConsole({
      onRecord: (r) => {
        console[r.level](...r.message);
        setLogs((v) => [...v, r]);
      },
    }),
  );
  usePosition({ onPosition: setPosition, console: con });

  return (
    <div>
      <h4>定位信息</h4>
      {position && <LocationDescription position={position} />}
      {!position && <div>获取中。。。</div>}

      <div>
        <h4>日志</h4>
        <div style={{ padding: 16 /*console-feed color backgroundColor: '#242424', */ }}>
          {logs.map((v, i) => (
            <Alert
              style={{ border: 'none' }}
              showIcon
              key={i}
              type={{ info: 'info', warn: 'warning', error: 'error' }[v.level] || 'info'}
              message={String(v.message)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LocationDescription: React.FC<{ position?: Position }> = ({ position }) => {
  if (!position) {
    return <div>获取中...</div>;
  }
  const { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed } = position.coords;
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="坐标 (lat,lon)">{`${latitude},${longitude}`}</Descriptions.Item>
        <Descriptions.Item label="坐标精度">{accuracy} 米</Descriptions.Item>
        <Descriptions.Item label="高度">{altitude}</Descriptions.Item>
        <Descriptions.Item label="高度精度">{altitudeAccuracy} 米</Descriptions.Item>
        <Descriptions.Item label="朝向">{heading}</Descriptions.Item>
        <Descriptions.Item label="速度">{speed}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
