import React, {useEffect, useState} from 'react';
import {checkGateways, compareCheckState, OnScriptloaded} from 'libs/ipfs/gateway/checker';


export const GatewayChecker: React.FC<{ gateways: string[] }> = ({gateways}) => {

  const [checks, setChecks] = useState([]);

  useEffect(() => {
    window['OnScriptloaded'] = OnScriptloaded
  }, []);

  useEffect(() => {
    checkGateways(gateways, setChecks)
      .then(v => {
        localStorage['IPFS_PREFER_GW'] = v[0].gateway
      })
    ;
  }, [gateways]);

  return (
    <div>
      <table className="check-table">
        <thead>
        <tr>
          <th>
            Online
          </th>
          <th>
            CORS
          </th>
          <th>
            Origin
          </th>
          <th>
            Hostname / 主机名
          </th>
          <th>
            ΔT
          </th>
        </tr>
        </thead>
        <tbody>
        {Array.from(checks).sort(compareCheckState).map(({gateway, hostname, status, cors, origin}) => (
          <tr key={gateway}>
            <td title={latency(cors)}>{stateEmoji(status.status)}</td>
            <td title={latency(cors)}>{stateEmoji(cors.status)}</td>
            <td>{stateEmoji(origin.status)}</td>
            <td title={gateway}>{hostname}</td>
            <td>{latency(status)}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <style jsx>{`
.check-table {
 font-family: monospace;
 text-align: center;
 width: 100%;
}
.check-table tr:hover{
  background-color: #edf0f4;
}

.check-table th:nth-child(1),.check-table th:nth-child(2),.check-table th:nth-child(3){
  max-width: 30px;
}
.check-table td:nth-child(4),.check-table th:nth-child(4){
  text-align: left;
}
.check-table td:nth-child(5),.check-table th:nth-child(5){
  text-align: right;
}
`}</style>

    </div>
  )
};

function latency({startTime, endTime}) {
  if (endTime) {
    return ((endTime - startTime) / 1000).toFixed(2) + ' s'
  }
  return ''
}

function stateEmoji(s) {
  switch (s) {
    case 'new':
      return '🆕';
    case 'running':
      return '🕑';
    case 'error':
      return '❌';
    case 'success':
      return '✅';
    default:
      return s;
  }
}
