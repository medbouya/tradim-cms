import type { Payload } from 'payload'

/**
 * Seeds initial admin user on deployment
 * Email: admin@tradim.mr
 * Password: Change-Me-On-First-Login-2026!
 * 
 * This function runs after Payload initializes and creates tables automatically.
 */
export async function seedDefaultAdmin(payload: Payload): Promise<void> {
  try {
    // Give Payload a moment to initialize the database schema
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if any users exist
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    // Only create default admin if no users exist
    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@tradim.mr',
          password: 'Change-Me-On-First-Login-2026!',
        },
      })

      console.log('✅ Default admin user created')
      console.log('📧 Email: admin@tradim.mr')
      console.log('🔑 Password: Change-Me-On-First-Login-2026!')
      console.log('⚠️  IMPORTANT: Change password after first login!')
    } else {
      console.log('ℹ️  Users already exist, skipping default admin creation')
    }
  } catch (error) {
    console.error('⚠️  Error seeding default admin (this is normal on migrations):', error instanceof Error ? error.message : error)
    // Don't throw - let the app start even if seeding fails
  }
}
