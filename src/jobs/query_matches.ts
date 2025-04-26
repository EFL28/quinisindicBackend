import { Redis } from 'ioredis';
import { CopaDelReyService } from 'src/modules/spain/copa_del_rey/copadelrey.service';
import { LaLigaService } from '../modules/spain/la_liga/laliga.service';
const redis = new Redis();

const laLigaService = new LaLigaService();
const copaService = new CopaDelReyService();

const liga_data = await laLigaService.getEventsCron();
const copa_data = await copaService.getEventsCron();
liga_data['last_fecthed'] = Date.now();
copa_data['last_fecthed'] = Date.now();
console.log(liga_data);
console.log(copa_data);
await redis.set('la_liga', JSON.stringify(liga_data));
await redis.set('copa_del_rey', JSON.stringify(copa_data));
console.log('Data fetched');
await redis.quit();
