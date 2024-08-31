import express from 'express';
import axios from 'axios';
import {tokenBucketRateLimitMiddleware, bucket} from './Algorithms/token-bucket.js';

const app = express();
app.use(express.json());
app.use(tokenBucketRateLimitMiddleware);

// Sample endpoint for testing rate limiting
app.get('/test', (req, res) => {
    const ROCK_PAPER_SCISSORS = ['rock 🪨', 'paper 📃', 'scissors ✂️'];
    
    const randomIndex = Math.floor(Math.random() * 3);
    const randomChoice = ROCK_PAPER_SCISSORS[randomIndex];
    
    res.json({
        success: true,
        message: `You got ${randomChoice}`
    });
});
// Endpoint to get the token bucket data
app.get("/token-bucket-data", bucket);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Function to test the Token Bucket Algorithm by calling it after 500 ms
async function callTestEndpoint() {
    try {
        const response = await axios.get('http://localhost:5000/test');
        console.log('Internal API Call Response:', response.data);
    } catch (error) {
        console.error('Error calling the /test endpoint:', error.message);
    }
}
setInterval(callTestEndpoint, 500);