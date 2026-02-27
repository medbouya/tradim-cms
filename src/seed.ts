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
    // Wait a moment for Payload to fully initialize all tables
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('✅ Payload initialized successfully')

    // Try to find existing users
    let existingUsers
    try {
      existingUsers = await payload.find({
        collection: 'users',
        limit: 1,
      })
    } catch (findError) {
      // Tables might not exist yet, which is fine
      console.log('ℹ️  Users table not ready yet, seeding skipped')
      return
    }

    // Only create default admin if no users exist
    if (existingUsers.totalDocs === 0) {
      try {
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
      } catch (createError) {
        console.warn('⚠️  Could not create default admin:', createError instanceof Error ? createError.message : createError)
      }
    } else {
      console.log('ℹ️  Users already exist, skipping default admin creation')
    }
  } catch (error) {
    // Don't fail startup if seeding fails
    console.warn('⚠️  Seeding issue (app will still work):', error instanceof Error ? error.message : error)
  }
}
