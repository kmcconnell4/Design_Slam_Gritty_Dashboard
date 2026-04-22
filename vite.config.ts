import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/vuetify')) return 'vendor-vuetify'
          if (id.includes('node_modules/chart.js') || id.includes('node_modules/vue-chartjs'))
            return 'vendor-charts'
          if (id.includes('node_modules/vue')) return 'vendor-vue'
        },
      },
    },
  },
})
