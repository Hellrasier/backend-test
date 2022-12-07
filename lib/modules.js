const fs = require('fs')
const path = require('path')
const logger = require('./logger')

const resolveDependencies = (mod) => ({
  imports: mod.imports ? mod.imports : [],
  providers: mod.providers ? mod.providers : [],
  controller: mod.controller ? mod.controller : null
})

const getControllers = async (pathToModules, callback) => {
	const controllers = {}
  // const services = {}

  const cacheFile = (name) => {
		const filePath = `${pathToModules}/${name}/module.js`
		const key = path.basename(name, '.js')
    const importPath = '../' + filePath
		try {
			const libPath = require.resolve(importPath)
			delete require.cache[libPath]
		} catch(err) {
			return
		}
		try {
			const mod = require(importPath)
      const { imports, providers, controller } = resolveDependencies(mod)
      const loadedProviders = providers.map(Provider => new Provider(...imports))
      if (controller) {
			  controllers[key] = controller(...loadedProviders)
      }
      logger.info(`Succesfully loaded ${name} module`)
		} catch (e) {
			console.error(e)
			delete controllers[key]
		}
	}

	const cacheFolder = (path) => {
		fs.readdir(path, (err, files) => {
			if (err){
				console.error(err)
        return
			}
			files.forEach(cacheFile)
      callback(controllers)
		});
	};

	cacheFolder(pathToModules);
}

const parseKey = (key) => {
    key = key.split(',')
    let path, method
    if (key.length == 1) {
      method = key[0].toLowerCase()
    } else {
      [path, method] = key 
      method = method.toLowerCase()
    }
  return [path, method]
}


const parseController = (controller) => {
  if (typeof controller == 'function') {
    return [null, null, controller]
  }
  let { access, params, handler } = controller
  if (typeof handler == 'function') {
    return [access, params, handler]
  }
}

module.exports = { getControllers, parseKey, parseController}
