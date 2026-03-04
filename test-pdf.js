const fs = require('fs');
async function test() {
  try {
    const mod = await import('pdf-parse');
    console.log("import('pdf-parse')", Object.keys(mod));
    console.log("mod.default type:", typeof mod.default);
    console.log("mod type:", typeof mod);
  } catch (e) {
    console.error(e);
  }
}
test();
