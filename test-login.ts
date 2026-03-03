import bcrypt from "bcrypt";
async function test() {
  const match1 = await bcrypt.compare("password123", "$2b$10$p2Rpte/hTH2nH0LTmsUjwuxFtPX2qoLF73Va1urIrBrppR2sshLfe");
  console.log("counsel@firm.com match:", match1);
  const match2 = await bcrypt.compare("Legalbos1", "$2b$10$exxfWLQfa/H2.0t033zKEec4ll.sMs5ylwOBEd/cPTEYMvJbfnfnK");
  console.log("luis@sabuard.com match:", match2);
}
test();
