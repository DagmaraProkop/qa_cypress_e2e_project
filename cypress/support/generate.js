function generateUser() {
  const randomNumber = Math.random().toString().slice(2, 8);
  const username = `Testuser_${randomNumber}`;
  const email = `${username}@mailll.com`;
  const password = 'RandomPassword123!!';
  const bio = 'This a a random bio';

  return { username, email, password, bio };
};

function generateUser2() {
  const randomNumber = Math.random().toString().slice(2, 8);
  const username2 = `Testuser_${randomNumber}`;
  const email2 = `${username2}@mailll.com`;
  const password2 = 'RandomPassword123!!';
  const bio = 'This a a random bio';

  return { username2, email2, password2, bio };
};

module.exports = { generateUser, generateUser2 };
