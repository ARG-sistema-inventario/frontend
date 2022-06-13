#!/bin/bash
cd /app
npm install;
npm run build;
npx serve -s ./build -p ${REACT_APP_PORT}