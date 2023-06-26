import ConfigManager from './ConfigManager.js'
import ModuleLoader from './ModuleLoader.js'
import Logger from './Logger.js'
import Server from './Server.js'

class CoreApp{
    buildLogger() {
        this.logger = new Logger()
        this.logger.info('Starting up...')
    }
    buildConfigManager() {
        this.configManager = new ConfigManager()
        this.config = this.configManager.load()
        this.logger.info(`The config file was loaded`)
    }
    buildModuleLoader() {
        this.loader = new ModuleLoader()
    }
    buildServer() {
        this.server = new Server(this)
    }
    start() {
        this.buildLogger()
        this.buildConfigManager()
        this.buildModuleLoader()
        this.buildServer()

        process.on('uncaughtException', err => {
            this.logger.error(`Error:\n${err.stack}`)
            process.exit(1)
        })

        process.on('exit', code => {
            this.logger.info('Stopping OS, code: ' + code)
        })
    }
}

export default CoreApp