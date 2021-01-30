import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { CheckCircleOutline, Refresh, XCircleOutline } from 'heroicons-react';
import { parseBcrypt } from './bcrypt';

export const BcryptHashTool: React.FC = () => {
  const [state, update] = useImmer({
    plain: '',
    hash: '',
    round: 10,
    match: undefined,
    error: '',
    parsed: parseBcrypt(''),
    loading: false,
  });
  const handleBcrypt = async () => {
    if (state.loading) {
      return;
    }
    update((s) => {
      s.loading = true;
    });
    try {
      const bcrypt = await import('bcryptjs');
      const hash = await new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(state.round, function (err, salt) {
          if (err) {
            reject(err);
            return;
          }
          bcrypt.hash(state.plain, salt, function (err, hash) {
            if (err) {
              reject(err);
              return;
            }
            resolve(hash);
          });
        });
      });
      update((s) => {
        s.hash = hash;
      });
    } finally {
      update((s) => {
        s.loading = false;
      });
    }
  };
  const handleCheck = async () => {
    const bcrypt = await import('bcryptjs');
    const match = await bcrypt.compare(state.plain, state.hash);
    update((s) => {
      s.match = match;
    });
  };
  useEffect(() => {
    update((s) => {
      s.parsed = parseBcrypt(state.hash);
    });
  }, [state.hash]);
  return (
    <div className={'py-2'}>
      <div className="pb-5 border-b border-gray-200">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">BCrypt</h3>
          <p className="ml-2 mt-1 text-sm text-gray-500 truncate">常用的密码哈希算法</p>
        </div>
      </div>

      <main className={'space-y-2 py-2'}>
        <div>
          <label htmlFor="plainText" className="block text-sm font-medium text-gray-700">
            明文
          </label>
          <div className="mt-1 relative">
            <input
              readOnly={state.loading}
              type="text"
              name="plainText"
              id="plainText"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="abc"
              value={state.plain}
              onChange={(e) =>
                update((s) => {
                  s.plain = e.target.value;
                  s.match = undefined;
                })
              }
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="round" className="sr-only">
                Round
              </label>
              <input
                readOnly={state.loading}
                id="round"
                name="round"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                type={'number'}
                value={state.round}
                onChange={(e) =>
                  update((s) => {
                    s.round = parseInt(e.target.value);
                    s.match = undefined;
                  })
                }
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500" id="plainText-description">
            哈希会在前端完成，不会发送请求到后端。
          </p>
        </div>

        <div>
          <label htmlFor="hash" className="block text-sm font-medium text-gray-700">
            密文
          </label>
          <div className="mt-1">
            <input
              readOnly={state.loading}
              type="text"
              name="hash"
              id="hash"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="$2b$10$salthash"
              value={state.hash}
              onChange={(e) =>
                update((s) => {
                  s.hash = e.target.value;
                  s.match = undefined;
                })
              }
            />
          </div>
          <p className="mt-2 text-sm text-gray-500" id="plainText-description">
            BCrypt 相同的明文会产生不同的密文
          </p>
        </div>

        <div className="mt-3 flex md:mt-0 gap-3 items-center">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleBcrypt}
            disabled={!state.plain || state.loading}
          >
            bcrypt
          </button>

          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleCheck}
            disabled={!state.hash || state.loading}
          >
            检测
          </button>

          {state.match === undefined ? null : state.match ? (
            <CheckCircleOutline className={'text-green-500'} />
          ) : (
            <XCircleOutline className={'text-red-500'} />
          )}
          {state.loading && <span className={'text-yellow-500'}>处理中...</span>}
        </div>

        <div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">BCrypt Hash</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">哈希中包含的结构化信息</p>
            </div>
            <div className={'px-6'}>
              <ParseInfo parsed={state.parsed} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ParseInfo: React.FC<{ parsed }> = ({ parsed }) => {
  const { raw, algorithm, costFactor, salt, hash, valid } = parsed;
  return (
    <div className={'flex'}>
      <div className={'flex flex-col md:text-lg text-gray-600 pr-2'}>
        <div>算法</div>
        <div>Cost Factor</div>
        <div>Salt</div>
        <div>Hash</div>
      </div>
      <div className={'flex flex-col md:text-lg'}>
        <div className={'text-green-600'}>${algorithm}</div>
        <div className={'text-yellow-600'}>${costFactor}</div>
        <div className={'text-blue-600'}>${salt}</div>
        <div className={'text-purple-600'}>{hash}</div>
      </div>
    </div>
  );
};
