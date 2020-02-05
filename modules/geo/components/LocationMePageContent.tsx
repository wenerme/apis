import React, {useRef, useState} from 'react';
import {Console as ConsoleFeed, Hook, Unhook} from 'console-feed'
import {useAsyncEffect} from 'hooks/useAsyncEffect';
import {Descriptions} from 'antd';

export const LocationMePageContent: React.FC = () => {
  const [logs, setLogs] = useState([]);
  const [position, setPosition] = useState(null);
  const [init, setInit] = useState(false);
  const consoleRef = useRef<any>();
  useAsyncEffect(async () => {
    const console: Console = consoleRef.current = {} as any;
    [
      'log',
      'debug',
      'info',
      'warn',
      'error',
      'table',
      'clear',
      'time',
      'timeEnd',
      'count',
      'assert'
    ].map(v => console[v] = window.console[v]);
    Hook(console,
      log => {
        setLogs(v => [...v, log])
      },
      false
    );

    console.log('Init console');
    setInit(true);

    const cleaner = await watchPosition({console, onPositionChange: setPosition});

    return () => {
      cleaner();
      Unhook(console);
    };
  }, []);

  return (
    <div>
      <h4>定位信息</h4>
      {init && <LocationDescription position={position} />}

      <div>
        <h4>日志</h4>
        <div style={{backgroundColor: '#242424'}}>
          <ConsoleFeed
            logs={logs}
            variant="dark"
          />
        </div>

      </div>
    </div>
  )
};

async function watchPosition(options: { console?: Console, onPositionChange?: (pos: Position) => void }): Promise<() => void | undefined> {
  const {console = window.console, onPositionChange = () => null} = options;

  if (!('geolocation' in navigator)) {
    console.error('无 geolocation 支持');
    return
  }

  await new Promise(((resolve, reject) => {
    if ('permissions' in navigator) {
      console.info('有 permissions 支持');

      navigator.permissions.query({name: 'geolocation'}).then((result) => {
        if (result.state === 'granted') {
          console.log('已授权');
          resolve(true);
        } else if (result.state === 'prompt') {
          console.warn('待请求授权');
          resolve(false);
        } else {
          console.error('未授权 ' + JSON.stringify(result));
          resolve(false);
        }
      })
    } else {
      console.error('无 permissions 支持');
      resolve(false);
    }
  }));

  console.log('开始获取定位... 超时=15秒');

  let watchId;
  try {
    watchId = navigator.geolocation.getCurrentPosition((position) => {
      console.log('获取定位成功', position);

      onPositionChange(position);

      console.log('开始进行持续定位');
      navigator.geolocation.watchPosition((position) => {
        console.log('更新定位', position);
        onPositionChange(position);
      }, (error) => {
        console.warn('持续定位失败 code:' + error.code + '  message:' + error.message, error)
      }, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      });

    }, (error) => {
      console.error('获取失败 code:' + error.code + '  message:' + error.message, error)
    }, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    });
  } catch (e) {
    console.error('操作失败', e);
  }
  return () => navigator.geolocation.clearWatch(watchId);
}

export const LocationDescription: React.FC<{ position?: Position }> = ({position}) => {
  if (!position) {
    return <div>获取中...</div>
  }
  const {latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed} = position.coords;
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="坐标 (lat,lon)">
          {`${latitude},${longitude}`}
        </Descriptions.Item>
        <Descriptions.Item label="坐标精度">
          {accuracy} 米
        </Descriptions.Item>
        <Descriptions.Item label="高度">
          {altitude}
        </Descriptions.Item>
        <Descriptions.Item label="高度精度">
          {altitudeAccuracy} 米
        </Descriptions.Item>
        <Descriptions.Item label="朝向">
          {heading}
        </Descriptions.Item>
        <Descriptions.Item label="速度">
          {speed}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
};
