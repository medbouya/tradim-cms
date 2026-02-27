import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const nodeModulesBin = path.join(__dirname, 'node_modules', '.bin')

console.log('🔄 Running database migrations...')

const migrate = spawn('node', [
  './node_modules/.bin/payload',
  'migrate'
], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_OPTIONS: '--no-deprecation'
  }
})

migrate.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Migration failed with code', code)
    process.exit(code)
  }

  console.log('✅ Migrations completed')
  console.log('🚀 Starting application...')

  const start = spawn('node', ['server.js'], {
    stdio: 'inherit',
    cwd: __dirname,
    env: {
      ...process.env,
      HOSTNAME: '0.0.0.0',
      PORT: '3000'
    }
  })

  start.on('close', (code) => {
    process.exit(code)
  })
})
