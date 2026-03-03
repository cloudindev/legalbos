import fs from 'fs';

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

schema = schema.replace(
`model Annotation {
  id        String   @id @default(uuid())
  content   String
  isPinned  Boolean  @default(false)
  authorId  String
  clientId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    User     @relation(fields: [authorId], references: [id])
  client    Client   @relation(fields: [clientId], references: [id], onDelete: Cascade)
}`,
`model Annotation {
  id        String   @id @default(uuid())
  content   String
  isPinned  Boolean  @default(false)
  authorId  String
  clientId  String?
  caseFileId String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    User     @relation(fields: [authorId], references: [id])
  client    Client?   @relation(fields: [clientId], references: [id], onDelete: Cascade)
  caseFile  CaseFile? @relation(fields: [caseFileId], references: [id], onDelete: Cascade)
}`
);

schema = schema.replace(
`  assignedUsers    User[]            @relation("CaseFileUsers")`,
`  assignedUsers    User[]            @relation("CaseFileUsers")
  annotations      Annotation[]`
);

fs.writeFileSync('prisma/schema.prisma', schema);
