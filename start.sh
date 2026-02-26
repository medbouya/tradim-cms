#!/bin/sh
# Railway start script - runs migrations then starts the app

echo "Running database migrations..."
npm run migrate

echo "Starting application..."
npm start
