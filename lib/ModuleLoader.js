import * as fs from 'fs'
import * as path from 'path'

class ModuleLoader {
	constructor() {
		this.modules = {}
	}
	clearCache(dir) {
		Object.keys(require.cache).forEach((path) => {
			if (!path.startsWith(dir)) {
				return
			}
			delete require.cache[path]
		})
	}
	async load(dir) {
		if (this.modules[dir]) {
			this.clearCache(dir)
		}
		this.modules[dir] = {}
		let err = []

		
		const files = fs.readdirSync(dir)
		for (let file of files) {
			if (file.startsWith('.') || file.startsWith('_') || !file.endsWith('.js')) {
				continue
			}
			try{
				this.modules[dir][file] = await import('file://' + path.resolve(dir, file))
			} catch (e) {
				err.push(`Failed to load ${path.resolve(dir, file)}: ${e.message}`)
			}
		}
		return err.length === 0 ? null : err.join('\n')
	}
	get(dir) {
		return this.modules[dir] || null
	}
}

export default ModuleLoader