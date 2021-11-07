import path from 'path';
import { UserConfigExport, BuildOptions } from 'vite';

export function buildModuleOptions(o: { name }): BuildOptions {
  const { name } = o;
  const libs = {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `${name}.${format}.js`,
      formats: ['es', 'systemjs' as any],
    },
    module: {
      entry: path.resolve(__dirname, 'src/module.tsx'),
      fileName: (format) => `module.${format}.js`,
      formats: ['es', 'systemjs' as any],
    },
  };

  const lib = libs[process.env['BUILD_LIB'] ?? 'lib'];
  const outDir = process.env['BUILD_OUTDIR'] ?? 'dist';
  console.log('Build lib to', outDir);

  return {
    outDir: outDir,
    minify: false,
    lib: lib,
    target: 'es2015',
    rollupOptions: {
      external: ['react', 'object-assign', 'use-immer', 'immer', 'react/jsx-runtime', 'classnames'],
      output: {
        globals: {},
      },
    },
  };
}
