import { Router, static as expressStatic} from 'express'
import * as path from 'path'

const router = Router()

router.use('/', expressStatic(path.join(baseDir, 'handlers', 'settings')))

export const url = '/settings'
export const app = router
export const name = '设置'
export const explain = 'ZhangOS系统程序 - 设置'