const fs = require('fs')
const cwd = require('process').cwd()
const path = require('path')
const exec = require('child_process').exec

const appPath = path.normalize(cwd.slice(0, cwd.lastIndexOf('node_modules')))

const packageJsonPath = path.join(appPath, 'package.json')

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

  if (packageJson.scripts && packageJson.scripts.postinstall) {
    const pkgManager = shouldUseYarn() ? 'yarn' : 'npm';
    exec(`${pkgManager} run postinstall`, {cwd: appPath},  (error, stdout) => {
      console.log({error})
      console.log({stdout})
    })
  }
}

function shouldUseYarn() {
  try {
    exec('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}
