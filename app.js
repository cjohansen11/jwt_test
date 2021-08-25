const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

app.post('/api/post', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post successfully created',
        data,
      });
    }
  });
});

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'chris',
    email: 'chris@gmail.com',
  };

  jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token,
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')[1];
    // Set req token
    req.token = bearer;
    // Call next
    next();
  } else {
    // Forbidden
    res.status(403).send('Not authenticated');
  }
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
