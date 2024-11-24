#!/bin/bash

# Define the file containing the version
VERSION_FILE="version"

# Check if the version file exists
if [ ! -f "$VERSION_FILE" ]; then
    echo "Version file not found. Exiting."
    exit 1
fi

# Read the current version
CURRENT_VERSION=$(cat "$VERSION_FILE")

echo "Current version: $CURRENT_VERSION"

# Split the version into major, minor, and patch components
MAJOR=$(echo "$CURRENT_VERSION" | cut -d. -f1)
MINOR=$(echo "$CURRENT_VERSION" | cut -d. -f2)
PATCH=$(echo "$CURRENT_VERSION" | cut -d. -f3)

NEW_PATCH=$((PATCH + 1))

echo "Current version components: $MAJOR, $MINOR, $PATCH"

NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

npm run build

docker build -t joasjaphes/accounting-app:$NEW_VERSION .

docker push joasjaphes/accounting-app:$NEW_VERSION

echo "$NEW_VERSION" > "$VERSION_FILE"
