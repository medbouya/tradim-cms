import { spawn } from 'child_process'

console.log('🔄 Running database migrations...')

const migrate = spawn('npm', ['run', 'migrate'], {
  stdio: 'inherit',
  shell: true,
})

migrate.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Migration failed with code', code)
    process.exit(code)
  }

  console.log('✅ Migrations completed')
  console.log('🚀 Starting application...')

  const start = spawn('npm', ['start'], {
    stdio: 'inherit',
    shell: true,
  })

  start.on('close', (code) => {
    process.exit(code)
  })
})
