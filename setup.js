
import mongoose from 'mongoose';

beforeAll(async () => {
  const uri = process.env.TEST_MONGODB_URI;
  if (!uri) {
    console.warn('
[tests] TEST_MONGODB_URI not set – tests will be skipped.');
    return;
  }
  await mongoose.connect(uri);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
});
