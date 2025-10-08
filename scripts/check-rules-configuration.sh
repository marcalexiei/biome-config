#!/bin/sh
set -e

# Trap any command that fails, print an error message, and exit immediately
trap 'echo "❌ Error: Command failed on line $LINENO."; exit 1' ERR

# node ./scripts/check-rules-group-configuration.ts A11y
node ./scripts/check-rules-group-configuration.ts Complexity
node ./scripts/check-rules-group-configuration.ts Correctness
node ./scripts/check-rules-group-configuration.ts Nursery
node ./scripts/check-rules-group-configuration.ts Performance
node ./scripts/check-rules-group-configuration.ts Security
node ./scripts/check-rules-group-configuration.ts Style
node ./scripts/check-rules-group-configuration.ts Suspicious
