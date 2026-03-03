import prisma from "./lib/db/prisma";

async function test() {
  try {
    const clients = await prisma.client.findMany({ take: 1 });
    console.log("Success reading clients:", clients);
  } catch (e: any) {
    console.error("Error reading clients:", e.message);
  }
}
test();
