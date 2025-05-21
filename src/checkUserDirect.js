import { MongoClient } from 'mongodb';

const DB_URL = 'mongodb://0.0.0.0:27017/ekmateDB';
const email = 'ekkajsnhs.21jdds031@jietjodhpur.ac.in';

async function checkUser() {
  const client = new MongoClient(DB_URL);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    console.log(`Checking if user with email ${email} exists...`);
    const user = await usersCollection.findOne({ email });
    
    console.log('User exists:', !!user);
    
    if (user) {
      console.log('User details:', {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

checkUser();
