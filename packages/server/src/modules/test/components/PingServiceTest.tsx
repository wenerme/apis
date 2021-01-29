import React, { useEffect, useMemo, useRef, useState } from 'react';
import { consumeClientService, PingService } from 'src/modules/client';
import { Button, Input, notification } from 'antd';
import { useMutation, useQuery } from 'react-query';

const PingButton: React.FC = () => {
  const svc = consumeClientService(PingService);
  const { isLoading, isError, refetch: ping } = useQuery('test.ping', () => svc.ping(), {
    enabled: false,
    onError(error) {
      notification.error({ message: JSON.stringify(error) });
    },
    onSuccess(data) {
      notification.success({ message: JSON.stringify(data) });
    },
  });
  return (
    <Button danger={isError} loading={isLoading} onClick={() => ping()}>
      PING
    </Button>
  );
};

const HelloButton: React.FC = () => {
  const svc = consumeClientService(PingService);
  const { isLoading, isError, mutateAsync: hello } = useMutation((name: string) => svc.hello(name), {
    onSuccess(data) {
      notification.success({ message: JSON.stringify(data) });
    },
    onError(error) {
      notification.error({ message: JSON.stringify(error) });
    },
  });
  return (
    <div>
      <Input.Search
        loading={isLoading}
        prefix={'Hello '}
        placeholder={'Hello to ...'}
        onSearch={(v) => hello(v)}
        enterButton={'Send'}
      />
    </div>
  );
};

function useAsyncInterval(handler, interval, { initialDelay = interval, onError = (e) => console.error(e) } = {}) {
  const ref = useRef<any>();
  const close = useMemo(
    () => () => {
      clearInterval(ref.current);
      ref.current = null;
    },
    [],
  );

  useEffect(() => {
    const tick = async (...args) => {
      try {
        await handler(...args);
      } catch (e) {
        onError(e);
      }
      if (ref.current) {
        ref.current = setTimeout(tick, interval);
      }
    };
    ref.current = setTimeout(tick, initialDelay);
    return close;
  }, [interval]);
  return close;
}

export const ServerTimeOffset: React.FC = () => {
  const [offset, setOffset] = useState({ a: 0, b: 0, c: 0 });
  const svc = consumeClientService(PingService);
  useAsyncInterval(async () => {
    const a = Date.now();
    const svr = await svc.now();
    const b = Date.now();
    setOffset({
      a: svr - a,
      b: b - svr,
      c: b - a,
    });
  }, 1000);
  return (
    <div>
      TimeOffset: C &rarr; S {offset.a}ms; S &rarr; C {offset.b}ms; C &rarr; S &rarr; C {offset.c}ms
    </div>
  );
};

export const PingServiceTest: React.FC = () => {
  return (
    <div>
      <PingButton />
      <hr />
      <HelloButton />
      <hr />
      <ServerTimeOffset />
    </div>
  );
};
