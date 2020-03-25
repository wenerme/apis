export type AsyncIntervalIdentifier = any;

export function setAsyncInterval(cb: () => void, interval, initial = interval): AsyncIntervalIdentifier {
  let id;
  const handler = async () => {
    await cb();
    id = setTimeout(handler, interval);
  };
  id = setTimeout(handler, initial);
  return () => id;
}

export function clearAsyncInterval(v: AsyncIntervalIdentifier) {
  clearTimeout(v?.());
}
