// src/types/zmp.d.ts
interface ZMPReadyCallback {
  (): void;
}

interface ZMPSDK {
  ready(callback: ZMPReadyCallback): void;
  login?(options?: any): Promise<any>;
  [key: string]: any;
}

declare global {
  interface Window {
    zmp?: ZMPSDK;
  }
}

export {};