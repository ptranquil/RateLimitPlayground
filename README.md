# RateLimitPlayground
A collection of various rate-limiting methods implemented in code, serving as a practical guide for traffic management.

## Algorithm

1. [Token Bucket Algorithm](#token-bucket-algorithm)

### Token Bucket Algorithm

![Token Bucket Algorithm.](/images/token-bucket.png "Token Bucket Algorithm")

- The Token Bucket algorithm works by maintaining a "bucket" that holds tokens, where each token represents permission to send a certain amount of data or make a request.

- It takes two parameter
    * Bucket Size : The maximum number of tokens allowed in the bucket
    * Refill rate: Number of token put into token every seconds

>> _It is used by **`Amazon`** and **`Stripe`**_

**Key Points:**
- **Bucket Capacity**: The bucket has a fixed maximum capacity of tokens.
- **Token Generation**: Tokens are added to the bucket at a steady rate, which controls the allowed rate of requests or data flow.
- **Request Handling**: When a request is made, a token is removed from the bucket. If the bucket has tokens, the request is allowed. If no tokens are available, the request is denied or delayed until more tokens are added.
- **Overflow**: If the bucket is full, additional tokens are discarded, ensuring that the rate limit is strictly enforced.

>> _The algorithm is effective in smoothing out bursts of traffic and ensuring that the overall rate of requests or data transmission stays within a defined limit._
