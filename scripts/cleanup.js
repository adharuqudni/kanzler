#!/usr/bin/env node

/**
 * Cleanup script to kill zombie processes and clear Next.js cache
 * Run this when you have zombie processes after stopping Next.js
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function cleanup() {
  console.log('🧹 Starting cleanup process...')

  try {
    // Kill any running Next.js processes
    console.log('🔪 Killing Next.js processes...')
    try {
      execSync('pkill -f "next-server"', { stdio: 'ignore' })
      execSync('pkill -f "next dev"', { stdio: 'ignore' })
      execSync('pkill -f "node.*next"', { stdio: 'ignore' })
    } catch (e) {
      // Ignore errors if no processes found
    }

    // Clear Next.js cache
    console.log('🗑️  Clearing Next.js cache...')
    const nextDir = path.join(process.cwd(), '.next')
    if (fs.existsSync(nextDir)) {
      execSync(`rm -rf "${nextDir}"`, { stdio: 'inherit' })
    }

    // Clear node_modules cache
    console.log('🗑️  Clearing node_modules cache...')
    const cacheDir = path.join(process.cwd(), 'node_modules', '.cache')
    if (fs.existsSync(cacheDir)) {
      execSync(`rm -rf "${cacheDir}"`, { stdio: 'inherit' })
    }

    // Clear npm/yarn cache if needed
    console.log('🗑️  Clearing package manager cache...')
    try {
      execSync('npm cache clean --force', { stdio: 'ignore' })
    } catch (e) {
      // Ignore if npm not available
    }

    console.log('✅ Cleanup completed successfully!')
    console.log('')
    console.log('💡 Now you can run: npm run dev')
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message)
    process.exit(1)
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Cleanup interrupted')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Cleanup terminated')
  process.exit(0)
})

cleanup()
