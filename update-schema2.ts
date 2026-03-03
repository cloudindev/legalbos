import fs from 'fs';

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

schema = schema.replace(
`  createdAt DateTime   @default(now())`,
`  createdAt DateTime   @default(now())
  claudeApiKey String?
  aiEnabled    Boolean    @default(false)`
);

schema = schema.replace(
`  content   String`,
`  content   String
  type      String?
  documentUrl String?`
);

fs.writeFileSync('prisma/schema.prisma', schema);
