import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI eksik .env.local dosyasında')
  throw new Error('MONGODB_URI eksik .env.local dosyasında')
}

const uri = process.env.MONGODB_URI
console.log('MongoDB URI configured:', uri ? 'YES' : 'NO')
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // Development'ta global object kullan hot reload sırasında connection'ları korumak için
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    console.log('Creating new MongoDB client for development')
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // Production'da her seferinde yeni client
  console.log('Creating new MongoDB client for production')
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDatabase(): Promise<Db> {
  console.log('Getting database connection')
  const client = await clientPromise
  console.log('Database client ready')
  return client.db('hmz-solutions')
}
