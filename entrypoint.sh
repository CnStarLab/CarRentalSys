#!/bin/bash

# Start the backend in development mode
if [ -f /app/src/backend/cmd/main.go ]; then
    cd /app/src/backend/cmd
    go run main.go &
fi

# Start the frontend in development mode
if [ -f /app/src/frontend/package.json ]; then
    cd /app/src/frontend
    npm run dev &
fi

# Wait for all background processes to finish
wait