import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI eksik .env.local dosyasında')
  throw new Error('MONGODB_URI eksik .env.local dosyasında')
}

const NEW_DB_URI = "mongodb+srv://eddiemorraa1:hamza_5031@cluster0.rvapadm.mongodb.net/hmz-solutions?retryWrites=true&w=majority";

const uri = process.env.MONGODB_URI || NEW_DB_URI;

// Log the connection target (safely)
if (uri.includes('efk3rqp')) {
  console.warn('WARNING: Using old non-existent MongoDB cluster. Forcing new cluster connection.');
}
const finalUri = uri.includes('efk3rqp') ? NEW_DB_URI : uri;
// Add SSL options to the connection
const options = {
  tls: true,
  retryWrites: true,
  writeConcern: {
    w: 'majority' as const
  }
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // Development'ta global object kullan hot reload sırasında connection'ları korumak için
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    console.log('Creating new MongoDB client for development');
    client = new MongoClient(finalUri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch(err => {
      console.error('MongoDB connection error in development:', err)
      throw err
    })
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // Production'da her seferinde yeni client
  console.log('Creating new MongoDB client for production with SSL options');
  client = new MongoClient(finalUri, options);
  clientPromise = client.connect().catch(err => {
    console.error('MongoDB connection error in production:', err)
    throw err
  })
}

export default clientPromise

export async function getDatabase(): Promise<Db> {
  try {
    console.log('Getting database connection')
    const client = await clientPromise
    console.log('Database client ready')
    return client.db('hmz-solutions')
  } catch (error) {
    console.error('Database connection failed:', error)
    throw new Error('Veritabanı bağlantısı kurulamadı: ' + (error as Error).message)
  }
}