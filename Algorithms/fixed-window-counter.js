export class FixedWindowRateLimiter {
    constructor(limit, windowSize) {
        this.limit = limit; // Max requests per window
        this.windowSize = windowSize; // Window size in milliseconds
        this.requestCounts = {}; // Store request counts and window start time for each IP
    }

    getMiddleware() {
        return (req, res, next) => {
            const ip = req.ip; // Get client IP address
            if (this.isAllowed(ip)) {
                next(); // Allow the request to proceed
            } else {
                res.status(429).json({ message: "Rate limit exceeded. Try again later." }); // Block the request
            }
        };
    }

    // Method to check if the request is allowed or rate-limited
    isAllowed(ip) {
        const currentTime = Date.now(); // Get the current time

        // If there's no record for this IP, initialize it
        if (!this.requestCounts[ip]) {
            this.requestCounts[ip] = {
                count: 1,
                startTime: currentTime
            };
            return true;
        }

        const timeElapsed = currentTime - this.requestCounts[ip].startTime;

        if (timeElapsed < this.windowSize) {
            // Within the same window
            if (this.requestCounts[ip].count < this.limit) {
                // Allow if the limit is not reached
                this.requestCounts[ip].count += 1;
                return true;
            } else {
                // Rate limit exceeded
                return false;
            }
        } else {
            // Window expired, reset the count and start a new window
            this.requestCounts[ip].count = 1;
            this.requestCounts[ip].startTime = currentTime;
            return true;
        }
    }
}