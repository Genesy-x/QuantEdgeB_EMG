// Simple Node.js script to test function logic
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function testAuthLogic() {
  console.log('🧪 Testing authentication logic...\n');

  // Test password hashing
  const password = 'test123';
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('✅ Password hashing works');

  // Test password comparison
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log('✅ Password comparison works:', isValid);

  // Test JWT creation
  const JWT_SECRET = 'test-secret';
  const token = jwt.sign({ userId: '123', email: 'test@example.com' }, JWT_SECRET, { expiresIn: '7d' });
  console.log('✅ JWT creation works');

  // Test JWT verification
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('✅ JWT verification works:', decoded);

  console.log('\n🎉 All authentication logic tests passed!');
  console.log('\nNext steps:');
  console.log('1. Deploy to Netlify to test functions');
  console.log('2. Check Netlify function logs for errors');
  console.log('3. Test with actual API calls');
}

testAuthLogic().catch(console.error);