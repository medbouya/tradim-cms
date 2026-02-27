import { getPayload } from 'payload'
import config from '../payload.config'

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing Payload database...')
    
    // This will initialize Payload and create tables if needed
    const payload = await getPayload({ config })
    
    console.log('✅ Database initialized successfully')
    
    return payload
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}

export default initializeDatabase()
