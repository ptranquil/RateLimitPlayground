export class leakingBucketRateLimitMiddleware {
    /**
     * 
     * @param {Number} bucketSize It holds the number of request to be processes at a fixed rate
     * @param {*} leakRate It defines how many request can be processed per seconds
     */
    constructor(bucketSize, leakRate) {
        this.bucketSize = bucketSize;
        this.leakRate = leakRate;
        this.leakingBucketQueue = []; // The queue that holds the request
        this.currentLoad = 0; // It tracks the number of request has been processed for comparison
        this.startLeaking(); // The cron to start processing the request at a provided rate
    }

    // Method to handle the request throttling
    handleThrottling(req, res, next) {
        if (this.currentLoad < this.bucketSize) {
            const currentRequest = Date.now();
            this.leakingBucketQueue.push(currentRequest);
            this.currentLoad++;
            console.log({
                message: 'Request Added for processing',
                currentQueue: this.leakingBucketQueue
            });
            res.set('X-Ratelimit-Remaining', this.bucketSize - this.leakingBucketQueue.length);
            next();
        } else {
            res.status(429).set('X-RateLimit-Remaining', 0).set('Retry-After', 2).json({
                success: false,
                message: 'Too many requests'
            });
        }
    }

    // Method to simulate the leaking of the bucket
    startLeaking() {
        setInterval(() => {
            if (this.leakingBucketQueue.length > 0) {
                const currentProcessedRequest = this.leakingBucketQueue.shift();
                this.currentLoad--;
                console.log(`Request Processed: ${currentProcessedRequest}, Current Queue Length: ${this.leakingBucketQueue.length}`);
            }
        }, 1000 / this.leakRate);
    }
}

// Leaking Bucket Algorithm Function based
let leakingBucketQueue = [];

const bucketSize = 10; // Allowing 10 request at once
const leakRate = 5000; // 1 request processing time in millisecond
let currentLoad = 0;

export const leakingBucketRateLimitMiddlewareFunction = (req, res, next) => {
    if(currentLoad < bucketSize){
        const currentRequest = Date.now();
        leakingBucketQueue.push(currentRequest);
        currentLoad++;
        console.log({
            message : 'Request Added for processing',
            currentQueue: leakingBucketQueue
        })
        res.set('X-Ratelimit-Remaining', bucketSize - leakingBucketQueue.length);
        next();
    } else {
        res.status(429).set('X-RateLimit-Remaining', 0).set('Retry-After', 2).json({
            success: false,
            message: 'Too many requests'
        });
    }
}

// Sample endpoint for testing rate limiting
export const addRequest = (req, res) => {
    const ROCK_PAPER_SCISSORS = ['rock 🪨', 'paper 📃', 'scissors ✂️'];
    
    const randomIndex = Math.floor(Math.random() * 3);
    const randomChoice = ROCK_PAPER_SCISSORS[randomIndex];
    
    res.json({
        success: true,
        message: `You got ${randomChoice}`
    });
};

setInterval(() => {
    if(leakingBucketQueue.length > 0){
        const currentProcessedRequest = leakingBucketQueue.shift();
        currentLoad--;
        console.log(`Request Processed : ${currentProcessedRequest}, Current Queue Length: ${leakingBucketQueue.length}`);
        
    }
},Math.floor((1000/leakRate)));