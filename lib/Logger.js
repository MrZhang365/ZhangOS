import colors from 'colors'
import moment from 'moment'
import * as fs from 'fs'
import * as path from 'path'

class Logger {
	constructor(dir) {
		this.dir = dir || path.resolve(baseDir, 'logs')
	}
	log(text) {
		console.log(text)
		fs.appendFileSync(path.resolve(this.dir, moment().format('YYYY-MM-DD') + '.log'), text + '\n')
	}
	info(text) {
		const prefix = colors.green(`[${moment().format('YYYY-MM-DD hh:mm:ss')}] [INFO] `)
		this.log(prefix + text.split('\n').join('\n' + prefix))
	}
	warn(text) {
		const prefix = colors.yellow(`[${moment().format('YYYY-MM-DD hh:mm:ss')}] [WARN] `)
		this.log(prefix + text.split('\n').join('\n' + prefix))
	}
	error(text) {
		const prefix = colors.red(`[${moment().format('YYYY-MM-DD hh:mm:ss')}] [ERROR] `)
		this.log(prefix + text.split('\n').join('\n' + prefix))
	}
}

export default Logger