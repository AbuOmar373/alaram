#!/bin/bash

# ALaram Project Setup Script
# This script helps you set up the project quickly

echo "🚀 Setting up ALaram project..."
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null
then
    echo "⚠️  pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.local.example .env.local
    echo "✅ .env.local created! Please edit it with your configuration."
else
    echo "ℹ️  .env.local already exists."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "  1. Edit .env.local with your configuration"
echo "  2. Run: pnpm dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "📖 Read README.md for more information"
echo "🚀 Read QUICKSTART.md for a quick guide"
echo ""
echo "Happy coding! 🎉"

