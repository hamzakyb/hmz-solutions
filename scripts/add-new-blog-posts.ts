#!/usr/bin/env node

// Script to add new service blog posts to the HMZ Solutions website
// This script should be run from the command line after setting up the environment

import { BlogAPIClient } from '../src/lib/blog-api-client'

async function main() {
  // Get environment variables
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@hmzsolutions.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  console.log('Starting blog post addition process...')
  console.log(`Base URL: ${baseURL}`)
  console.log(`Admin Email: ${adminEmail}`)
  console.log('---')

  // Create API client
  const client = new BlogAPIClient(baseURL)

  // Login as admin
  console.log('Authenticating as admin...')
  const loginSuccess = await client.login(adminEmail, adminPassword)
  
  if (!loginSuccess) {
    console.error('Failed to authenticate as admin')
    process.exit(1)
  }

  console.log('Authentication successful!')
  console.log('---')

  // Add all new service blog posts
  await client.addAllNewServicePosts()

  console.log('---')
  console.log('Process completed!')
}

// Run the script
main().catch((error) => {
  console.error('Script failed:', error)
  process.exit(1)
})