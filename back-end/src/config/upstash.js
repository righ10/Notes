

import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis"

import dotEnv from "dotenv"

dotEnv.config();

const rateLimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"20 s")
})

export default rateLimit