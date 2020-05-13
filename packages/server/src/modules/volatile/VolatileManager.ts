import { addMinutes } from 'date-fns';

export class VolatileManager {
  private _entries: Record<string, VolatileEntry> = {};
  private _maintainAt = addMinutes(Date.now(), 5).getTime();

  get({ key }): VolatileEntry | null {
    this._check();
    const e = this._checkEntry(this._entries[key]);
    return e?.expired ? null : e;
  }

  update({ key, data }) {
    this._check();
    const entry = this.get({ key });
    if (!entry) {
      throw new Error(`Entry not found: ${key}`);
    }
    return (this._entries[key] = {
      ...entry,
      data,
      version: entry.version + 1,
    });
  }

  create({ key, data }) {
    this._check();
    return (this._entries[key] = {
      key,
      data,
      expireAt: addMinutes(Date.now(), 5).getTime(),
      expired: false,
      version: 1,
    });
  }

  delete({ key }) {
    delete this._entries[key];
  }

  private _check() {
    if (this._maintainAt < Date.now()) {
      this._maintainAt = addMinutes(Date.now(), 5).getTime();
      setTimeout(() => this._maintain(), 50);
    }
  }
  private _maintain() {
    const expired = Object.values(this._entries)
      .map(v => this._checkEntry(v))
      .filter(v => v.expired);
    expired.forEach(v => {
      delete this._entries[v.key];
    });
    if (expired.length) {
      console.info(
        `[${new Date()}] Volatile Maintain: expired ${expired.length}, key samples: ${expired
          .slice(0, 50)
          .map(v => v.key)
          .join(', ')}`,
      );
    }
  }
  private _checkEntry(e: VolatileEntry) {
    if (!e) {
      return e;
    }
    if (e.expireAt < Date.now()) {
      e.expired = true;
    }
    return e;
  }
}

export interface VolatileEntry {
  expireAt: number;
  data: any;
  key: string;
  expired: boolean;
  version: number;
}
