import { LaLigaService } from '../modules/la_liga/laliga.service';

const service = new LaLigaService();
console.log(await service.getEventsCron());
