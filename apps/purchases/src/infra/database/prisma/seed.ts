import { prisma } from './prisma'
import crypto from 'node:crypto';

async function main() {
  await prisma.product.createMany({
    data: [
      { id: crypto.randomUUID(), title: 'Node.js course' },
      { id: crypto.randomUUID(), title: 'ReactJS course' },
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })