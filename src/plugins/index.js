/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import axios from './axios'

export function registerPlugins (app) {
  loadFonts()
  app.use(axios, { baseUrl: process.env.VUE_APP_API_URL })
}
