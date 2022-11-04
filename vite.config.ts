import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@comps': resolve(__dirname, './src/components'),
			'@assets': resolve(__dirname, './src/assets'),
			'@icons': resolve(__dirname, './src/assets/icons'),
			'@store': resolve(__dirname, './src/store'),
			'@views': resolve(__dirname, './src/views'),
			'@path': resolve(__dirname, './src/path_map.ts'),
			'@hooks': resolve(__dirname, './src/hooks'),
		},
	},
})
