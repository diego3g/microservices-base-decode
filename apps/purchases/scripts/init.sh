#!/bin/bash
echo "Running startup commands"

npm run prisma migrate deploy
npm run prisma generate
npm run start