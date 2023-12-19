import Constants from 'expo-constants'

const { manifest2 } = Constants

if (process.env.NODE_ENV !== 'development') {
  // TODO: Implement API_URL for production
  throw new Error('API_URL is not implemented for production')
}

if (process.env.API_PORT === undefined) {
  throw new Error('API_PORT is not implemented for development')
}

const HOST_URI = manifest2?.extra?.expoClient?.hostUri
export const API_URL = `http://${HOST_URI?.split(':')[0]}:${process.env.API_PORT}`
