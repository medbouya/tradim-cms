import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('🔄 Running database migrations...\n')

// Use node to run tsx which will handle TypeScript
const migrate = spawn('node', [
  '--loader=tsx',
  './node_modules/.bin/payload',
  'migrate'
], {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_OPTIONS: '--no-deprecation --loader=tsx'
  }
})

migrate.on('close', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`\n⚠️  Migration exited with code ${code}, but continuing...`)
  }

  console.log('\n✅ Ready to start application\n')
  console.log('🚀 Starting Next.js server...\n')

  // Start the Next.js server
  const start = spawn('npm', ['start'], {
    stdio: 'inherit',
    cwd: __dirname
  })

  start.on('close', (code) => {
    process.exit(code || 0)
  })

  start.on('error', (err) => {
    console.error('Failed to start app:', err)
    process.exit(1)
  })
})

migrate.on('error', (err) => {
  console.warn('Migration spawn error (continuing anyway):', err.message)
  // Continue anyway - migrations might happen on second request
  setTimeout(() => {
    console.log('\n✅ Continuing with app startup...\n')
    const start = spawn('npm', ['start'], {
      stdio: 'inherit',
      cwd: __dirname
    })

    start.on('close', (code) => {
      process.exit(code || 0)
    })
  }, 1000)
})
