#!/usr/bin/env node

/**
 * Development Monitor Script
 * Monitors Next.js development server performance and handles cleanup
 */

const { spawn, exec } = require('child_process')
const fs = require('fs')
const path = require('path')

let nextProcess = null
let isShuttingDown = false

// Performance monitoring
let memoryThreshold = 1024 * 1024 * 1024 // 1GB
let checkInterval = 30000 // 30 seconds

function logWithTimestamp(message) {
  const timestamp = new Date().toLocaleTimeString()
  console.log(`[${timestamp}] ${message}`)
}

function checkMemoryUsage() {
  if (!nextProcess || isShuttingDown) return

  try {
    exec(`ps -p ${nextProcess.pid} -o pid,vsz,rss,pcpu --no-headers`, (error, stdout) => {
      if (error || !stdout.trim()) return

      const [pid, vsz, rss, cpu] = stdout.trim().split(/\s+/)
      const memoryMB = parseInt(rss) * 1024 // Convert KB to bytes then to MB
      const cpuPercent = parseFloat(cpu)

      if (memoryMB > memoryThreshold / (1024 * 1024)) {
        logWithTimestamp(`⚠️  High memory usage: ${Math.round(memoryMB)}MB (CPU: ${cpuPercent}%)`)
        
        if (memoryMB > (memoryThreshold * 2) / (1024 * 1024)) {
          logWithTimestamp('🔄 Memory usage too high, restarting Next.js...')
          restartNextJS()
        }
      } else {
        logWithTimestamp(`✅ Memory: ${Math.round(memoryMB)}MB, CPU: ${cpuPercent}%`)
      }
    })
  } catch (error) {
    // Ignore errors
  }
}

function startNextJS() {
  if (nextProcess) return

  logWithTimestamp('🚀 Starting Next.js development server...')
  
  nextProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096',
      NEXT_TELEMETRY_DISABLED: '1'
    }
  })

  nextProcess.on('error', (error) => {
    logWithTimestamp(`❌ Next.js process error: ${error.message}`)
  })

  nextProcess.on('exit', (code, signal) => {
    logWithTimestamp(`🛑 Next.js exited with code ${code} and signal ${signal}`)
    nextProcess = null
    
    if (!isShuttingDown && code !== 0) {
      logWithTimestamp('🔄 Auto-restarting in 5 seconds...')
      setTimeout(startNextJS, 5000)
    }
  })

  // Start monitoring after process starts
  setTimeout(() => {
    const monitorInterval = setInterval(() => {
      if (!nextProcess || isShuttingDown) {
        clearInterval(monitorInterval)
        return
      }
      checkMemoryUsage()
    }, checkInterval)
  }, 10000) // Wait 10 seconds before starting monitoring
}

function restartNextJS() {
  if (!nextProcess || isShuttingDown) return

  logWithTimestamp('🔄 Restarting Next.js process...')
  
  nextProcess.kill('SIGTERM')
  
  setTimeout(() => {
    if (nextProcess && !nextProcess.killed) {
      logWithTimestamp('⚡ Force killing Next.js process...')
      nextProcess.kill('SIGKILL')
    }
    setTimeout(startNextJS, 2000)
  }, 5000)
}

function cleanup() {
  if (isShuttingDown) return
  isShuttingDown = true

  logWithTimestamp('🧹 Cleaning up...')
  
  if (nextProcess) {
    nextProcess.kill('SIGTERM')
    
    setTimeout(() => {
      if (nextProcess && !nextProcess.killed) {
        nextProcess.kill('SIGKILL')
      }
    }, 5000)
  }

  // Clean up any zombie processes
  exec('pkill -f "next-server" || true', () => {
    exec('pkill -f "next dev" || true', () => {
      logWithTimestamp('✅ Cleanup complete')
      process.exit(0)
    })
  })
}

// Handle process signals
process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
process.on('SIGUSR2', restartNextJS) // Send SIGUSR2 to restart

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logWithTimestamp(`💥 Uncaught exception: ${error.message}`)
  cleanup()
})

process.on('unhandledRejection', (reason) => {
  logWithTimestamp(`💥 Unhandled rejection: ${reason}`)
  cleanup()
})

// Start the monitor
logWithTimestamp('🎯 Starting development monitor...')
logWithTimestamp(`📊 Memory threshold: ${Math.round(memoryThreshold / (1024 * 1024))}MB`)
logWithTimestamp(`⏱️  Check interval: ${checkInterval / 1000}s`)
logWithTimestamp('💡 Send SIGUSR2 to restart Next.js')

startNextJS()
