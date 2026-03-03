const bcrypt = require("bcryptjs");
console.log(typeof bcrypt.compare);
import("bcryptjs").then(b => console.log("import:", typeof b.compare, "default:", typeof b.default?.compare));
