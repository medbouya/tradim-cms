import type { Payload } from 'payload'

/**
 * Seeds initial admin user on deployment
 * Email: admin@tradim.mr
 * Password: Change-Me-On-First-Login-2026!
 * 
 * This runs after Payload initializes. It gracefully handles the case where
 * the database tables might not be created yet.
 */
export async function seedDefaultAdmin(payload: Payload): Promise<void> {
  try {
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@tradim.mr',
          password: 'Change-Me-On-First-Login-2026!',
        },
      })
      console.log('✅ Default admin user created')
    }
  } catch (error) {
    // This is expected on first run when tables don't exist
    console.log('ℹ️  Could not find users table, this is normal on first startup.')
  }
}
