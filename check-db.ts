import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("=== TENANTS ===")
    const tenants = await prisma.tenant.findMany()
    console.table(tenants)

    console.log("\n=== USERS ===")
    const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, tenantId: true } })
    console.table(users)

    console.log("\n=== CLIENTS ===")
    const clients = await prisma.client.findMany({ select: { id: true, firstName: true, companyName: true, tenantId: true } })
    console.table(clients)
}

main().catch(console.error).finally(() => prisma.$disconnect())
