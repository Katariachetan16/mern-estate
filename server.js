const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = 3000;

// Enable CORS for all routes and origins (for development)
// For production, you should specify allowed origins for security
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests only from your frontend origin
}));

// If you want to allow requests from multiple specific origins:
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://yourproductiondomain.com']
// }));

// If you want to allow all origins (less secure, use only for development):
// app.use(cors());

// Your routes
app.post('/api/auth/signup', (req, res) => {
  // Handle signup logic
  res.json({ message: 'User signed up successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
