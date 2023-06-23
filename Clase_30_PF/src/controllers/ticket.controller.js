import * as TicketServices from '../services/dao/db/ticket.service.js';

export async function get(req, res) {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await TicketServices.get(ticketId);

    if (ticket) {
      return res.status(200).render('ticket', {ticket});
    } else {
      return res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
