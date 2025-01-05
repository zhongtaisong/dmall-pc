import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';

export default defineConfig({
  html: {
    template: './public/index.html',
  },
  plugins: [pluginReact(), pluginLess()],
});
