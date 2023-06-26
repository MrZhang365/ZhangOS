import * as fs from 'fs'
import * as path from 'path'

class ConfigManager {
	constructor(configPath) {
		this.configPath = configPath || path.resolve(baseDir, 'config', 'config.json')
		this.config = {}
	}
	load() {
		this.config = JSON.parse(fs.readFileSync(this.configPath))
		return this.config
	}
	save() {
		fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 4))
	}
}

export default ConfigManager