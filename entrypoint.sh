#!/bin/sh

set -e

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Start the Next.js application
exec node server.js
