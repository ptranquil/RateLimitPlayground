# RateLimitPlayground
A collection of various rate-limiting methods implemented in code, serving as a practical guide for traffic management.

## Algorithm

1. [Token Bucket Algorithm](#token-bucket-algorithm)
2. [Leaky Bucket Algorithm](#leaky-bucket-algorithm)

### Token Bucket Algorithm

![Token Bucket Algorithm.](/images/token-bucket.png "Token Bucket Algorithm")

- The Token Bucket algorithm works by maintaining a "bucket" that holds tokens, where each token represents permission to send a certain amount of data or make a request.

- It takes two parameter
    * Bucket Size : The maximum number of tokens allowed in the bucket
    * Refill rate: Number of token put into token every seconds

> _It is used by **`Amazon`** and **`Stripe`**_

**Key Points:**
- **Bucket Capacity**: The bucket has a fixed maximum capacity of tokens.
- **Token Generation**: Tokens are added to the bucket at a steady rate, which controls the allowed rate of requests or data flow.
- **Request Handling**: When a request is made, a token is removed from the bucket. If the bucket has tokens, the request is allowed. If no tokens are available, the request is denied or delayed until more tokens are added.
- **Overflow**: If the bucket is full, additional tokens are discarded, ensuring that the rate limit is strictly enforced.

> _The algorithm is effective in smoothing out bursts of traffic and ensuring that the overall rate of requests or data transmission stays within a defined limit._

### Leaky Bucket Algorithm
Also known as Leaking bucket algorithm
![Leaky Bucket Algorithm.](/images/leaky-bucket.jpg "Leaky Bucket Algorithm")

- The Leaky Bucket algorithm is used to control the data transmission rate in a network by processing requests at a fixed, constant rate, regardless of the incoming burst rate.

- It takes two parameter
    * Bucket Size :  The maximum number of requests that can be held in the bucket at any given time.
    * Refill rate: The fixed rate at which requests are processed or "leaked" from the bucket.

> It is commonly used in **`traffic shaping`** and **`network congestion control`**.

**Key Points:**
- **Bucket Capacity**: The bucket has a fixed size that limits the number of requests it can hold at any time.
- **Request QUeueing**:  Incoming requests are added to the bucket. If the bucket is full, additional requests are discarded or delayed.
- **Fixed Leak Rate**: Requests are processed (or leaked) from the bucket at a steady, fixed rate, ensuring that the system handles the requests at a controlled speed.
- **Smoothing Traffic**:  The algorithm smooths out bursts of traffic by queuing excess requests and processing them at a constant rate.

> _The Leaky Bucket algorithm is effective in controlling traffic by smoothing out bursty traffic patterns and ensuring a constant flow rate, preventing overload and maintaining network stability._
