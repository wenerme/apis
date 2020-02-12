import React, {useRef, useState} from 'react';
import {Descriptions, Icon} from 'antd';
import {addPeerConnectionStateListener, getCandidates} from 'libs/webrtc/rtcs';
import {PeerConnectionState} from 'libs/webrtc/types';
import {useAsyncEffect} from 'hooks/useAsyncEffect';
import produce from 'immer';
import {createLazyPromise} from 'utils/promises';

const CandidateErrorLine: React.FC<{ candidate }> = ({candidate}) => {
  const {url, errorCode, errorText, hostCandidate} = candidate;
  if (errorCode) {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span>❌</span>
        <span>{url} - 错误码 {errorCode} - {errorText} - {hostCandidate}</span>
      </div>
    )
  }
  return null
};

export const WebRTCChecker: React.FC = () => {
  const [phase, setPhase] = useState('N/A');

  const [connState, setConnState] = useState<PeerConnectionState>({} as any);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [iceServers, setIceServers] = useState(['stun:111.231.102.99']);

  const connRef = useRef<RTCPeerConnection>();
  const remoteRef = useRef<RTCPeerConnection>();
  const metaRef = useRef<RTCDataChannel>();

  const globalThis = require('globalthis')();

  useAsyncEffect(async ({setCloser}) => {
    if (!globalThis.RTCPeerConnection) {
      return;
    }
    const closer = [];
    setCloser(() => closer.forEach(v => v()));

    setPhase('初始化');
    const configuration = {
      iceServers: [{
        urls: iceServers
      }]
    };
    const conn = connRef.current = new RTCPeerConnection(configuration);
    closer.push(addPeerConnectionStateListener(conn, setConnState));
    closer.push(conn.close.bind(conn));

    window['WebRTCCheckerTest'] = {conn};

    const candidates = [];
    const gatherReady = createLazyPromise();
    const connectionReady = createLazyPromise();
    conn.addEventListener('icegatheringstatechange', e => {
      if (conn.iceGatheringState === 'complete') {
        gatherReady.resolve('');
      }
    });
    conn.addEventListener('connectionstatechange', e => {

      if (['failed', 'connected'].includes(conn.connectionState)) {
        connectionReady.resolve(conn.connectionState);
      }
    });

    conn.addEventListener('icecandidate', e => {
      // console.log('candidate', e);

      if (e.candidate) {
        candidates.push(e.candidate);

        const {
          foundation,
          candidate,
          address, component,
          ip, port, priority, protocol, relatedAddress, relatedPort, sdpMLineIndex, sdpMid, tcpType, type, usernameFragment,

        } = e.candidate as any;

        setCandidates(produce(s => {
          s.push({
            url: e.url,
            candidate,
            address, component,
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
            usernameFragment
          })
        }))
      }
    });
    conn.addEventListener('icecandidateerror', e => {
      const {url, errorCode, errorText, hostCandidate} = e;

      setCandidates(produce(s => {
        s.push({url, errorCode, errorText, hostCandidate});
      }))
    });

    const meta = metaRef.current = conn.createDataChannel('meta', {ordered: true});
    closer.push(meta.close.bind(meta));


    const offer = await conn.createOffer({offerToReceiveAudio: true, offerToReceiveVideo: true});
    await conn.setLocalDescription(offer);

    //
    setPhase('等待待选信息');
    await gatherReady;

    //
    setPhase('应答');
    const remote = remoteRef.current = new RTCPeerConnection(configuration);
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

    setPhase(await connectionReady === 'connected' ? '已链接' : '链接失败');
  }, []);

  const ConnectionStates = [
    {label: '链接状态', name: 'connectionState'},
    {label: 'ICE 链接状态', name: 'iceConnectionState'},
    {label: 'ICE 收集状态', name: 'iceGatheringState'},
    {label: '信令状态', name: 'signalingState'},
    {label: 'SCTP 状态', name: 'sctpState'},
    {label: 'SCTP 传输状态', name: 'sctpTransportState'},
  ];

  return (
    <div>
      <h3>WebRTC 支持</h3>
      <Descriptions column={4} layout="vertical" bordered>
        <Descriptions.Item label="RTCPeerConnection" span={2}>
          {emojiOfBoolean(globalThis.RTCPeerConnection)}
        </Descriptions.Item>
        <Descriptions.Item label="RTCDataChannel" span={2}>
          {emojiOfBoolean(globalThis.RTCDataChannel)}
        </Descriptions.Item>
      </Descriptions>

      <h3>
        WebRTC 链接
      </h3>

      <Descriptions column={4} layout="vertical" bordered>
        <Descriptions.Item label="阶段">
          <span>{phase}</span>
        </Descriptions.Item>

        {ConnectionStates.map(({name, label}) => (
          <Descriptions.Item label={label} key={name}>
            {connState[name] ?? 'N/A'}
          </Descriptions.Item>
        ))}
        <Descriptions.Item label={''}>
          {''}
        </Descriptions.Item>


        <Descriptions.Item span={4} label="媒体信息">
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
              {parseMediaDescription(connRef.current?.localDescription?.sdp).map(({media, port, protocol, format}, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{media}</td>
                  <td>{port}</td>
                  <td className="protocol">{protocol}</td>
                  <td className="format">{format}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </Descriptions.Item>

        <Descriptions.Item span={4} label="编码格式">
          <div>
            <table className="encoding">
              <thead>
              <tr>
                <th>类型</th>
                <th>编码</th>
                <th>频率</th>
                <th>参数</th>
              </tr>
              </thead>
              <tbody>
              {parsePayloadType(connRef.current?.localDescription?.sdp ?? '').sort(({type: a}, {type: b}) => a - b).map(({type, encodingName, encodingParameter, clockRate}, i) => (
                <tr key={type}>
                  <td>{type}</td>
                  <td>{encodingName}</td>
                  <td>{clockRate}/{clockRate / 1000}Khz</td>
                  <td>{encodingParameter}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </Descriptions.Item>

        <Descriptions.Item span={4} label={
          <div>
            链接待选信息 / candidates / {candidates.length}
            {connState.iceGatheringState === 'gathering' ? <Icon type="loading" /> : null}
          </div>
        }>
          <div>
            <table className="candidate-table">
              <thead>
              <tr>
                <th className="sdp-mid">媒体</th>
                <th className="address">地址</th>
                <th>协议</th>
                <th>类型</th>
                <th>用户</th>
                <th className="priority">优先级</th>
              </tr>
              </thead>
              <tbody>
              {candidates.filter(({errorCode}) => !errorCode).sort(({sdpMid: a}, {sdpMid: b}) => a - b).map((
                {
                  ip, address, port, protocol, type, component,
                  relatedAddress, relatePort,
                  priority,
                  usernameFragment,

                  sdpMid,
                }, i) => (
                <tr key={i}>
                  <td className="sdp-mid">{sdpMid}</td>
                  <td className="address">{ip || address}:{port}</td>
                  <td>{protocol}</td>
                  <td>{type}/{component}</td>
                  <td>{usernameFragment}</td>
                  <td className="priority">{priority}</td>
                </tr>
              ))}
              </tbody>
            </table>

            <h4>异常</h4>

            {candidates.filter(({errorCode}) => errorCode).map((candidate, i) => (
              <CandidateErrorLine candidate={candidate} key={i} />
            ))}
          </div>
        </Descriptions.Item>

        <Descriptions.Item span={4} label="请求方描述信息 / offer">
          <div style={{width: '100%', overflowX: 'scroll'}}>
            <pre>
{connRef.current?.localDescription?.sdp}
            </pre>
          </div>
        </Descriptions.Item>

        <Descriptions.Item span={4} label="接受方描述信息 / answer">
          <div style={{width: '100%', overflowX: 'scroll'}}>
            <pre>
{remoteRef.current?.localDescription?.sdp}
            </pre>
          </div>
        </Descriptions.Item>
      </Descriptions>

      <style jsx>{`
h3, h4 {
  margin-top: 16px;
  margin-bottom: 8px;
}

table tr:hover {
  background-color: #edf0f4;
}

.candidate-table td,.candidate-table th, table.media td, table.media th,
table.encoding td, table.encoding th{
  width: 70px;
  text-align: center;
}
.candidate-table td.address,.candidate-table th.address{
  white-space: nowrap;
  
  width: unset;
  text-align: left;
}
.candidate-table td.priority,.candidate-table th.priority{
  width: 140px;
  text-align: right;
}
.candidate-table td.sdp-mid,.candidate-table th.sdp-mid{
  width: 40px;
}

table.media td.format,table.media th.format{
  width: auto;
  text-align: left;
}
table.media td.protocol,table.media th.protocol{
  width: 200px;
}

pre {
  white-space: pre-wrap; 
  word-break: break-word;
}

`}</style>
    </div>
  )
};


function emojiOfBoolean(s) {
  return s ? '✅' : '❌'
}

function parseMediaDescription(sdp) {
  return (sdp ?? '')
    .split('\n')
    .filter(v => v.startsWith('m='))
    .map(v => v.substring(2))
    .map(v => v.match(/^(\S+)\s+(\S+)\s+(\S+)\s+(.*)/))
    .map(([_, media, port, protocol, format]) => ({media, port, protocol, format}))
}

function parsePayloadType(sdp) {
  return (sdp ?? '')
    .split('\n')
    .filter(v => v.startsWith('a=rtpmap:'))
    .map(v => v.substring('a=rtpmap:'.length))
    .map(v => v.match(/^(\S+)\s+([^/]+)[/]([^/]+)(\s+(.*))?/))
    .map(([_, type, encodingName, clockRate, encodingParameter]) => ({
      type,
      encodingName,
      clockRate,
      encodingParameter
    }))
}
