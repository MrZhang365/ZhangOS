import express from 'express'
import basicAuth from 'express-basic-auth'
import * as path from 'path'

class Server {
    constructor(core) {
        this.app = express()
        this.apps = []
        this.app.use(basicAuth({
            authorizer: (username, password) => basicAuth.safeCompare(username, core.config.username) & basicAuth.safeCompare(password, core.config.password),
            challenge: true,
            realm: [...Array(Math.floor(Math.random() * 128) + 128)].map(() => (~~(Math.random() * 36)).toString(36)).join(''),    // 生成随机的会话ID，用来告诉浏览器保存密码的时机，每次重启本程序以后，正常的浏览器都会自动忘记密码。这段代码来自HC
        }))
        this.setupServer(core)
    }
    async setupServer(core) {
        core.logger.info(`Setting server up...`)
        core.logger.info(`Loading handlers...`)
        const loadResult = await core.loader.load(path.join(baseDir, 'handlers'))
        if (loadResult) core.logger.error(loadResult)
        const modules = core.loader.get(path.join(baseDir, 'handlers'))
        if (!modules) {
            core.logger.error('Failed to load handlers')
            process.exit(1)
        }
        core.logger.info(`${Object.keys(modules).length} handler(s) was loaded`)
        Object.keys(modules).forEach(target => {
            if (typeof modules[target].url !== 'string' || !modules[target].url) {
                return core.logger.error(`${target}'s url is not a string `)
            }
            if (typeof modules[target].name !== 'string' || !modules[target].name) {
                return core.logger.error(`${target}'s name is not a string `)
            }
            if (typeof modules[target].app !== 'function') {
                return core.logger.error(`${target}'s app is not a function`)
            }
            try{
                this.app.use(modules[target].url, modules[target].app)
                this.apps.push(modules[target])
            } catch(e) {
                return core.logger.error(`Failed to load ${target}`)
            }
            core.logger.info(`Loaded app: ${modules[target].name}, path: ${target}`)
        })
        this.app.listen(core.config.port)
        core.logger.info(`Server is now running on localhost:${core.config.port}`)
    }
}

export default Server