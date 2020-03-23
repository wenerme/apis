let tick = 1;
const maxTick = 65535;
const resolution = 4;
const inc = () => {
  tick = (tick + 1) & maxTick;
};
let timer;

/// https://github.com/mafintosh/speedometer
function createSpeedometer(seconds) {
  // lazy
  if (!timer) {
    timer = setInterval(inc, (1000 / resolution) | 0);
    if (timer.unref) timer.unref();
  }

  //
  const size = resolution * (seconds || 5);
  const buffer = [0];
  let pointer = 1;
  let last = (tick - 1) & maxTick;

  return (delta) => {
    let dist = (tick - last) & maxTick;
    if (dist > size) dist = size;
    last = tick;

    while (dist--) {
      if (pointer === size) pointer = 0;
      buffer[pointer] = buffer[pointer === 0 ? size - 1 : pointer - 1];
      pointer++;
    }

    if (delta) buffer[pointer - 1] += delta;

    const top = buffer[pointer - 1];
    const btm = buffer.length < size ? 0 : buffer[pointer === size ? 0 : pointer];

    return buffer.length < resolution ? top : ((top - btm) * resolution) / buffer.length;
  };
}

class Progress {
  length;
  transferred;
  speed;
  streamSpeed;
  initial;
  emitDelay;
  eventStart;
  percentage;

  constructor(length, emitDelay = 1000) {
    this.length = Number(length) || 0;
    this.transferred = 0;
    this.speed = 0;
    this.streamSpeed = createSpeedometer(this.speed || 5000);
    this.initial = false;
    this.emitDelay = emitDelay;
    this.eventStart = 0;
    this.percentage = 0;
  }

  getRemainingBytes() {
    return Number(this.length) - Number(this.transferred);
  }

  getEta() {
    return this.length >= this.transferred ? (this.getRemainingBytes() / this.speed) * 1000000000 : 0;
  }

  flow(chunk, onProgress) {
    const chunkLength = chunk.length;
    this.transferred += chunkLength;
    this.speed = this.streamSpeed(chunkLength);
    this.percentage = Math.round((this.transferred / this.length) * 100);
    if (!this.initial) {
      this.eventStart = Date.now();
      this.initial = true;
    }
    if (this.length >= this.transferred || Date.now() - this.eventStart > this.emitDelay) {
      this.eventStart = Date.now();

      const progress = {
        total: this.length,
        transferred: this.transferred,
        speed: this.speed,
        eta: this.getEta(),
        remaining: 0,
        percentage: 0,
      };
      if (this.length) {
        progress.remaining = this.getRemainingBytes();
        progress.percentage = this.percentage;
      }
      onProgress(progress);
    }
  }
}

export interface ProgressEvent {
  total: number;
  transferred: number;
  speed: number;
  eta: number;
  remaining: number;
  percentage: number;
}

export function isFetchProgressSupported() {
  return typeof Response !== 'undefined' && typeof ReadableStream !== 'undefined';
}

/// https://github.com/samundrak/fetch-progress
export function fetchProgress({
  defaultSize = 0,
  emitDelay = 10,
  onProgress = (e: ProgressEvent) => null,
  onComplete = (v) => null,
  onError = (err) => null,
}) {
  return (res: Response) => {
    const { body, headers, status } = res;

    if (!isFetchProgressSupported() || status >= 300) {
      return res;
    }

    const contentLength = headers.get('content-length') || defaultSize;
    const progress = new Progress(contentLength, emitDelay);
    const reader = body.getReader();
    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                onComplete({});
                controller.close();
                return;
              }
              if (value) {
                progress.flow(value, onProgress);
              }
              controller.enqueue(value);
              push();
            })
            .catch((err) => {
              onError(err);
            });
        }

        push();
      },
    });
    return new Response(stream, { headers });
  };
}
