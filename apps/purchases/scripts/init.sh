#!/bin/bash
echo "Running startup commands"

npx prisma migrate deploy
npx prisma generate
npm run start