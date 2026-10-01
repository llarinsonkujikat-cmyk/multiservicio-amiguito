// Declaraciones de tipos para pruebas unitarias (*.spec.ts)
// Esto permite que el editor no marque errores cuando Jest y @nestjs/testing no están instalados.

declare module '@nestjs/testing' {
  export const Test: {
    createTestingModule: (metadata: any) => {
      compile: () => Promise<any>;
    };
  };
  export type TestingModule = any;
}

declare const describe: (name: string, fn: (...args: any[]) => any) => void;
declare const beforeEach: (fn: (...args: any[]) => any) => void;
declare const afterEach: (fn: (...args: any[]) => any) => void;
declare const beforeAll: (fn: (...args: any[]) => any) => void;
declare const afterAll: (fn: (...args: any[]) => any) => void;
declare const it: (name: string, fn: (...args: any[]) => any) => void;
declare const test: (name: string, fn: (...args: any[]) => any) => void;
declare const expect: (actual?: any) => any;
declare const jest: any;
