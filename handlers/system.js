import { Router, static as expressStatic, json as jsonParser } from 'express'
import * as path from 'path'

const router = Router()
router.use('/', expressStatic(path.join(baseDir, 'static')))    // 静态资源
router.get('/system/app-list', (req, res) => {    // 获取APP列表
    const core = global.core    // "fork" 一个 core
    const apps = core.server.apps
    const appList = apps.map(app => {
        return {
            name: app.name,
            homepage: app.url,
            explain: app.explain,
        }
    })
    res.json(appList)
})
router.post('/system/user-change', jsonParser({
    type: 'application/json',
}), (req, res) => {
    if (!req.body) return res.status(400).end()
    const { username, password } = req.body
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') return res.status(400).end()
    if (!/^[a-zA-Z0-9_-]{1,15}$/.test(username) || !/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(password)) return res.status(200).end()
    const core = global.core    // fork 一个 core
    core.config.username = username
    core.config.password = password
    core.configManager.save()
    res.status(200).end()
})

export const url = '/'
export const app = router
export const name = 'SYSTEM'
export const explain = 'ZhangOS系统程序 - 底层API'