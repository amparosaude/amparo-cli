const { promises: fs } = require('fs')

const pathExists = async (path) => {  
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

module.exports = pathExists