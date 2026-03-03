const { z } = require('zod');
const bcrypt = require('bcryptjs');

const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse({ email: "luis@sabuard.com", password: "Legalbos1" });

console.log("parsed:", parsedCredentials.success);

async function test() {
  const hash = await bcrypt.hash("Legalbos1", 10);
  console.log("hash match:", await bcrypt.compare("Legalbos1", hash));
}
test();
