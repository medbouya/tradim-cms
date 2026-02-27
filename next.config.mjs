import { withPayload } from '@payloadcms/next/withPayload'
import dotenv from 'dotenv'

dotenv.config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    DATABASE_URI: process.env.DATABASE_URI,
  },
  // Don't use standalone output with Payload CMS as it needs full app for migrations
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
