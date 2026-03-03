import prisma from "./lib/db/prisma";

async function test() {
  const users = await prisma.user.findMany({ select: { email: true, passwordHash: true, tenantId: true } });
  console.log("Users in DB:", users);
}
test();
