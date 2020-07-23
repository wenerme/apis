import React, { useEffect, useRef, useState } from 'react';
import { Descriptions } from 'antd';
import { addPeerConnectionStateListener, getCandidates } from 'src/libs/webrtc/rtcs';
import { PeerConnectionState } from 'src/libs/webrtc/types';
import { useAsyncEffect } from '@wener/ui';
import produce from 'immer';
import { LoadingOutlined } from '@ant-design/icons';
import { createLazyPromise, getGlobalThis } from '@wener/utils';

const CandidateErrorLine: React.FC<{ candidate }> = ({ candidate }) => {
  const { url, errorCode, errorText, hostCandidate } = candidate;
  if (errorCode) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>❌</span>
        <span>
          {url} - 错误码 {errorCode} - {errorText} - {hostCandidate}
        </span>
      </div>
    );
  }
  return null;
};

export const WebRTCChecker: React.FC = () => {
  const [phase, setPhase] = useState('N/A');

  const [connState, setConnState] = useState<PeerConnectionState>({} as any);
  const [candidates, setCandidates] = useState<any[]>([]);
  // https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
  const [iceServers, setIceServers] = useState<RTCIceServer[]>([
    { urls: ['stun:stun.wener.me'] },
    { urls: ['stun:stun2.wener.me'] },
  ]);

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const connRef = useRef<RTCPeerConnection>();
  const remoteRef = useRef<RTCPeerConnection>();
  const metaRef = useRef<RTCDataChannel>();

  const globalThis = getGlobalThis();

  useAsyncEffect(async () => {
    if (navigator.mediaDevices?.enumerateDevices) {
      setDevices(await navigator.mediaDevices.enumerateDevices());
    }
  }, []);

  useAsyncEffect(async ({ setCloser }) => {
    if (!globalThis.RTCPeerConnection) {
      return;
    }
    const closer = [];
    setCloser(() => closer.forEach((v) => v()));

    setPhase('初始化');
    const configuration = {
      iceServers,
    };
    const conn = (connRef.current = new RTCPeerConnection(configuration));
    closer.push(addPeerConnectionStateListener(conn, setConnState));
    closer.push(conn.close.bind(conn));

    window['WebRTCCheckerTest'] = { conn };

    const candidates = [];
    const gatherReady = createLazyPromise();
    const connectionReady = createLazyPromise();
    conn.addEventListener('icegatheringstatechange', (e) => {
      if (conn.iceGatheringState === 'complete') {
        gatherReady.resolve('');
      }
    });
    conn.addEventListener('connectionstatechange', (e) => {
      if (['failed', 'connected'].includes(conn.connectionState)) {
        connectionReady.resolve(conn.connectionState);
      }
    });

    conn.addEventListener('icecandidate', (e) => {
      console.log('WebRTC Checker local candidate', e.candidate);

      if (e.candidate) {
        candidates.push(e.candidate);

        const {
          foundation,
          candidate,
          address,
          component,
          ip,
          port,
          priority,
          protocol,
          relatedAddress,
          relatedPort,
          sdpMLineIndex,
          sdpMid,
          tcpType,
          type,
          usernameFragment,
        } = e.candidate as any;

        setCandidates(
          produce((s) => {
            s.push({
              url: e.url,
              candidate,
              address,
              component,
              foundation,
              ip,
              port,
              priority,
              protocol,
              relatedAddress,
              relatedPort,
              sdpMLineIndex,
              sdpMid,
              tcpType,
              type,
              usernameFragment,
            });
          }),
        );
      }
    });
    conn.addEventListener('icecandidateerror', (e) => {
      const { url, errorCode, errorText, hostCandidate } = e;

      setCandidates(
        produce((s) => {
          s.push({ url, errorCode, errorText, hostCandidate });
        }),
      );
    });

    const meta = (metaRef.current = conn.createDataChannel('meta', {
      ordered: true,
    }));
    closer.push(meta.close.bind(meta));

    const offer = await conn.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await conn.setLocalDescription(offer);

    //
    setPhase('等待待选信息');
    await gatherReady;

    //
    setPhase('应答');
    const remote = (remoteRef.current = new RTCPeerConnection(configuration));
    const remoteCandidates = getCandidates(remote);
    closer.push(remote.close.bind(remote));

    await remote.setRemoteDescription(offer);

    const answer = await remote.createAnswer();
    await remote.setLocalDescription(answer);

    setPhase('添加待选信息');
    for (const candidate of candidates) {
      await remote.addIceCandidate(candidate);
    }

    setPhase('等待应答待选信息');
    await remoteCandidates;

    setPhase('接受应答');
    await conn.setRemoteDescription(answer);

    setPhase('添加应答待选信息');
    for (const candidate of await remoteCandidates) {
      await conn.addIceCandidate(candidate);
    }

    //
    setPhase('等待链接');
    await connectionReady;

    setPhase((await connectionReady) === 'connected' ? '已链接' : '链接失败');
  }, []);

  const ConnectionStates = [
    { label: '链接状态', name: 'connectionState' },
    { label: 'ICE 链接状态', name: 'iceConnectionState' },
    { label: 'ICE 收集状态', name: 'iceGatheringState' },
    { label: '信令状态', name: 'signalingState' },
    { label: 'SCTP 状态', name: 'sctpState' },
    { label: 'SCTP 传输状态', name: 'sctpTransportState' },
  ];

  const columns = useBreakpoints({ values: [1, 2, 3] });
  const supportColumns = useBreakpoints({ values: [2, 2, 4, 4] });

  return (
    <div>
      <h3>WebRTC 支持</h3>
      <Descriptions column={supportColumns} layout="vertical" bordered>
        <Descriptions.Item label="RTCPeerConnection">{emojiOfBoolean(globalThis.RTCPeerConnection)}</Descriptions.Item>
        <Descriptions.Item label="RTCDataChannel">{emojiOfBoolean(globalThis.RTCDataChannel)}</Descriptions.Item>
        <Descriptions.Item label="getUserMedia">
          {emojiOfBoolean(globalThis.navigator?.mediaDevices?.getUserMedia)}
        </Descriptions.Item>
        <Descriptions.Item label="getDisplayMedia">
          {emojiOfBoolean(globalThis.navigator?.mediaDevices?.['getDisplayMedia'])}
        </Descriptions.Item>
      </Descriptions>

      <h3>WebRTC 链接 - {phase}</h3>

      <Descriptions className="descriptions-table-fixed" column={columns} layout="vertical" bordered>
        {ConnectionStates.map(({ name, label }) => (
          <Descriptions.Item label={label} key={name}>
            {connState[name] ?? 'N/A'}
          </Descriptions.Item>
        ))}

        <Descriptions.Item span={columns} label="媒体信息">
          <div>
            <table className="media">
              <thead>
                <tr>
                  <th>索引</th>
                  <th>媒体</th>
                  <th>端口</th>
                  <th className="protocol">协议</th>
                  <th className="format">格式</th>
                </tr>
              </thead>
              <tbody>
                {parseMediaDescription(connRef.current?.localDescription?.sdp).map(
                  ({ media, port, protocol, format }, i) => (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{media}</td>
                      <td>{port}</td>
                      <td className="protocol">{protocol}</td>
                      <td className="format">{format}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </Descriptions.Item>

        <Descriptions.Item span={columns} label="编码格式">
          <div>
            <table className="encoding">
              <thead>
                <tr>
                  <th>类型</th>
                  <th>编码</th>
                  <th>频率</th>
                </tr>
              </thead>
              <tbody>
                {parsePayloadType(connRef.current?.localDescription?.sdp ?? '')
                  .sort(({ type: a }, { type: b }) => a - b)
                  .map(({ type, encodingName, encodingParameter, clockRate }, i) => (
                    <tr key={type}>
                      <td>{type}</td>
                      <td>{encodingName}</td>
                      <td>
                        {clockRate}/{clockRate / 1000}Khz
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Descriptions.Item>

        <Descriptions.Item
          span={columns}
          label={
            <div>
              链接待选信息 / candidates / {candidates.length}
              {connState.iceGatheringState === 'gathering' ? <LoadingOutlined /> : null}
            </div>
          }
        >
          <div>
            <table className="candidate">
              <thead>
                <tr>
                  <th className="sdp-mid">媒体</th>
                  <th className="address">地址</th>
                  <th>协议</th>
                  <th>类型</th>
                  <th>用户</th>
                  <th className="priority">Foundation</th>
                  <th className="priority">优先级</th>
                </tr>
              </thead>
              <tbody>
                {candidates
                  .filter(({ errorCode }) => !errorCode)
                  .sort(({ sdpMid: a }, { sdpMid: b }) => a - b)
                  .map(
                    (
                      {
                        ip,
                        address,
                        port,
                        protocol,
                        type,
                        component,
                        relatedAddress,
                        relatePort,
                        priority,
                        foundation,
                        usernameFragment,

                        sdpMid,
                      },
                      i,
                    ) => (
                      <tr key={i}>
                        <td className="sdp-mid">{sdpMid}</td>
                        <td className="address">
                          {ip || address}:{port}
                        </td>
                        <td>{protocol}</td>
                        <td>
                          {type}/{component}
                        </td>
                        <td>{usernameFragment}</td>
                        <td className="priority">{foundation}</td>
                        <td className="priority">{priority}</td>
                      </tr>
                    ),
                  )}
              </tbody>
            </table>

            <h4>异常</h4>

            {candidates
              .filter(({ errorCode }) => errorCode)
              .map((candidate, i) => (
                <CandidateErrorLine candidate={candidate} key={i} />
              ))}
          </div>
        </Descriptions.Item>

        <Descriptions.Item span={columns} label="设备信息">
          <div>
            <table style={{ tableLayout: 'auto' }}>
              <thead>
                <tr>
                  <th style={{ minWidth: 40 }}>标签</th>
                  <th>类型</th>
                  <th>分组ID</th>
                  <th>设备ID</th>
                </tr>
              </thead>
              <tbody>
                {devices.map(({ label, kind, groupId, deviceId }, i) => (
                  <tr key={i}>
                    <td style={{ minWidth: 40 }}>{label || 'N/A'}</td>
                    <td>{kind}</td>
                    <td>{renderSummary(groupId)}</td>
                    <td>{renderSummary(deviceId)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Descriptions.Item>

        <Descriptions.Item label="支持的设备限制" span={columns}>
          <div>
            <pre>
              {JSON.stringify(globalThis?.navigator?.mediaDevices?.getSupportedConstraints?.() ?? {}, null, '  ')}
            </pre>
          </div>
        </Descriptions.Item>

        <Descriptions.Item span={columns} label="请求方描述信息 / offer">
          <div style={{ width: '100%', overflowX: 'scroll' }}>
            <pre>{connRef.current?.localDescription?.sdp}</pre>
          </div>
        </Descriptions.Item>

        <Descriptions.Item span={columns} label="接受方描述信息 / answer">
          <div style={{ width: '100%', overflowX: 'scroll' }}>
            <pre>{remoteRef.current?.localDescription?.sdp}</pre>
          </div>
        </Descriptions.Item>
      </Descriptions>

      <style jsx global>{`
        @media (max-width: 576px) {
          .descriptions-table-fixed .ant-descriptions-view > table {
            table-layout: fixed !important;
          }

          table.media,
          table.candidate,
          table.encoding {
            display: block !important;
          }
        }
      `}</style>
      <style jsx>{`
        h3,
        h4 {
          margin-top: 16px;
          margin-bottom: 8px;
        }

        table.media,
        table.candidate,
        table.encoding {
          overflow-x: auto;
          white-space: nowrap;
          table-layout: unset;
        }

        table tr:hover {
          background-color: #edf0f4;
        }

        table.candidate td,
        table.candidate th,
        table.media td,
        table.media th,
        table.encoding td,
        table.encoding th {
          width: 70px;
          text-align: center;
        }
        .candidate td.address,
        .candidate th.address {
          white-space: nowrap;

          width: unset;
          text-align: left;
        }
        .candidate td.priority,
        .candidate th.priority {
          width: 140px;
          text-align: right;
        }
        .candidate td.sdp-mid,
        .candidate th.sdp-mid {
          width: 40px;
        }

        table.media td.format,
        table.media th.format {
          width: auto;
          text-align: left;
        }
        table.media td.protocol,
        table.media th.protocol {
          width: 200px;
        }

        pre {
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
};

function emojiOfBoolean(s) {
  return s ? '✅ - 支持' : '❌ - 不支持';
}

function parseMediaDescription(sdp) {
  return (sdp ?? '')
    .split('\n')
    .filter((v) => v.startsWith('m='))
    .map((v) => v.substring(2))
    .map((v) => v.match(/^(\S+)\s+(\S+)\s+(\S+)\s+(.*)/))
    .map(([_, media, port, protocol, format]) => ({
      media,
      port,
      protocol,
      format,
    }));
}

function parsePayloadType(sdp) {
  return (sdp ?? '')
    .split('\n')
    .filter((v) => v.startsWith('a=rtpmap:'))
    .map((v) => v.substring('a=rtpmap:'.length))
    .map((v) => v.match(/^(\S+)\s+([^/]+)[/]([^/]+)(\s+(.*))?/))
    .map(([_, type, encodingName, clockRate, encodingParameter]) => ({
      type,
      encodingName,
      clockRate,
      encodingParameter,
    }));
}

/// https://getbootstrap.com/docs/4.1/layout/overview/
/// xm md lg xl
function useBreakpoints({ breaks = [575.98, 768.98, 991.98, 1199.98], values = null } = {}) {
  const onResize = () => {
    const w = getGlobalThis()['innerWidth'] || 0;
    let i = breaks.findIndex((v) => v > w);
    i = i === -1 ? breaks.length : i;
    let v = i;
    if (values) {
      if (i > values.length - 1) {
        v = values[values.length - 1];
      } else {
        v = values[i];
      }
    }
    return v;
  };

  const [val, setVal] = useState(onResize);

  useEffect(() => {
    setVal(onResize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return val;
}

function renderSummary(s: string) {
  if (s.length < 10) {
    return s;
  }
  return (
    <details>
      <summary title={s}>{s.substring(0, 8)}</summary>
      {s}
    </details>
  );
}
