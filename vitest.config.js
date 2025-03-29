import { defineConfig } from 'vitest/config'
import vuePlugin from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vuePlugin()],
    resolve: {
      alias: [
        {
          find: '~',
          replacement: resolve('./test/theseedMock')
        }
      ],
      extensions: [
        '.js', '.vue', '.json'
      ]
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
  })