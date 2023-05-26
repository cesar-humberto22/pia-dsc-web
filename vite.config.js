import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
    plugins: [vue(), svgLoader()],
    define: {
        'process.env': {}
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        origin: 'http://192.168.0.187:8080',
    }
})
