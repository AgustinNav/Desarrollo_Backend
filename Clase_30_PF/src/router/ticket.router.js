import { Router } from 'express';
import * as TicketController from '../controllers/ticket.controller.js';

const router = Router();

// Obtener un ticket por ID
router.get('/:ticketId', TicketController.get);

export default router;
