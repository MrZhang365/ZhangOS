import CoreApp from './lib/CoreApp.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

global.baseDir = dirname(fileURLToPath(import.meta.url))

global.core = new CoreApp()
global.core.start()