import { CronJob } from 'cron';

const RATE_LIMIT = 10;

const tokenBucket = [];

// Function to refill the bucket
const refillBucket = () => {
    if (tokenBucket.length < RATE_LIMIT) {
        const newToken = Date.now();
        tokenBucket.push(newToken);
        console.log(`Token Bucket : Token Refilled, New Token Added : ${newToken}`)
    }
};

// function to get the current status of bucket
export const bucket = (req, res) => {
    res.json({
        bucketLimit: RATE_LIMIT,
        currentBucketSize: tokenBucket.length,
        bucket: tokenBucket
    });
}

// Middleware for rate limiting
export const tokenBucketRateLimitMiddleware = (req, res, next) => {

    if (tokenBucket.length > 0) {
        const token = tokenBucket.shift();
        console.log(`Token ${token} is consumed`);

        res.set('X-RateLimit-Remaining', tokenBucket.length);
        next();
    }
    else {
        res.status(429).set('X-RateLimit-Remaining', 0).set('Retry-After', 2).json({
            success: false,
            message: 'Too many requests'
        });
    }
};

// Cron job to periodically refill the bucket after 1 sec, i.e. 1 request/second
const job = new CronJob('*/1 * * * * *', () => {
    refillBucket();
});
job.start();
