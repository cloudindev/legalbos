import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Clear previous data
    await prisma.user.deleteMany()
    await prisma.tenant.deleteMany()

    // Create default tenant
    const tenant = await prisma.tenant.create({
        data: {
            name: 'Lexington Law Firm',
            domain: 'lexington.com'
        }
    })

    // Create super admin user
    await prisma.user.create({
        data: {
            email: 'counsel@firm.com',
            passwordHash: await bcrypt.hash('password123', 10),
            name: 'Marcus Sterling',
            role: 'SUPER_ADMIN',
            tenantId: tenant.id
        }
    })

    console.log('🌱 Seed completed successfully')
    console.log('Login: counsel@firm.com / password123')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
