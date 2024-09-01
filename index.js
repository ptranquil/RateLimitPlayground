import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

/*************** TOKEN BUCKET ALGORITHM ********************/
import { tokenBucketRateLimitMiddleware } from './Algorithms/token-bucket.js';
app.use(tokenBucketRateLimitMiddleware); // Using Token Bucket Middleware for Request Throttling

/*************** LEAKY BUCKET ALGORITHM ********************/
//! Uncomment to use the desired algorithm
// import { leakingBucketRateLimitMiddleware } from './Algorithms/leaky-bucket.js';
// const leakingBucket = new leakingBucketRateLimitMiddleware(10,5000);
// app.use((req, res, next) => leakingBucket.handleThrottling(req, res, next));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Sample endpoint for testing rate limiting
app.get('/addRequest', (req, res) => {
    const ROCK_PAPER_SCISSORS = ['rock 🪨', 'paper 📃', 'scissors ✂️'];
    
    const randomIndex = Math.floor(Math.random() * 3);
    const randomChoice = ROCK_PAPER_SCISSORS[randomIndex];
    
    res.json({
        success: true,
        message: `You got ${randomChoice}`
    });
});

/**
 * Function to test the by calling it after some time intervals to add request and process it
 * You can uncomment the setInterval function which has been sent to call the api in every 200 ms
 * It can used for testing purpose
 */
async function callTestEndpoint() {
    try {
        const response = await axios.get('http://localhost:5000/addRequest');
        console.log('Internal API Call Response:', response.data);
    } catch (error) {
        console.error('Error calling the /addRequest endpoint:', error.message);
    }
}
// setInterval(callTestEndpoint, 200); //! Uncomment to test