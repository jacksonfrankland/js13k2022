import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte({
		experimental: {
			inspector: true
		}
	})],
	resolve: {
		alias: {
			'$lib': path.resolve(__dirname, './src/lib'),
			'$assets': path.resolve(__dirname, './src/assets'),
		}
	}
})
