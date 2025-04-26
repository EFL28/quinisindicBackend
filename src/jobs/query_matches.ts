import { LaLigaService } from '../modules/la_liga/laliga.service';
import { Redis } from "ioredis"
const redis = new Redis();
const service = new LaLigaService();
const liga_data = await service.getEventsCron();
liga_data['last_fecthed'] = Date.now()
console.log(liga_data)
await redis.set("la_liga", JSON.stringify(liga_data))
console.log("Data fetched")
await redis.quit();
