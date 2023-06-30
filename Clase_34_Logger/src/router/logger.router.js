import { Router } from 'express';
import { authenticate } from '../utils.js';

const router = Router();

router.get("/", authenticate('admin'), (req, res) => {
    req.logger.debug('Este es un mensaje de debug');
    req.logger.http('Este es un mensaje de log de nivel http');
    req.logger.info('Este es un mensaje de información');
    req.logger.warning('Este es un mensaje de advertencia');
    req.logger.error('Este es un mensaje de error');
    req.logger.fatal('Este es un mensaje fatal');
    res.send('Logs generados');
});

export default router;