import { CronJob } from 'cron';

const RATE_LIMIT = 10;

const tokenBucket = [];

// Function to refill the bucket
const refillBucket = () => {
    if (tokenBucket.length < RATE_LIMIT) {
        const newToken = Date.now();
        tokenBucket.push(newToken);
        console.log(`Token Bucket : Token Refilled, New Token Added : ${newToken}, Bucket Size: ${tokenBucket.length}`)
    }
};

// Cron job to periodically refill the bucket after 1 sec, i.e. 1 request/second
const job = new CronJob('*/1 * * * * *', () => {
    refillBucket();
});
job.start();

// Middleware for rate limiting
export const tokenBucketRateLimitMiddleware = (req, res, next) => {

    if (tokenBucket.length > 0) {
        const token = tokenBucket.shift();
        console.log({
            message: `Token ${token} is consumed`,
            bucketLimit: RATE_LIMIT,
            currentBucketSize: tokenBucket.length,
            bucket: tokenBucket
        })

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
