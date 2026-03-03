import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const res = await prisma.caseFile.findFirst({
        include: {
            client: true,
            phase: true,
            type: true,
            opposingLawyer: true,
            assignedUsers: {
                select: { id: true, name: true, email: true }
            },
            documents: true,
            annotations: {
                include: { author: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    })
    console.log("SUCCESS:", !!res)
  } catch (e) {
    console.error("ERROR:", e)
  }
}
main()
