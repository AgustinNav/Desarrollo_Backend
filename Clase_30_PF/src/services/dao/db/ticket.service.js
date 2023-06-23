import TicketModel from "./models/ticket.model.js";

export async function create(data) {
  try {
    const response = await TicketModel.create(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAll() {
  try {
    const tickets = await TicketModel.find();
    return tickets;
  } catch (error) {
    throw new Error(error);
  }
}

export async function get(ticketId) {
  try {
    const ticket = await TicketModel.findOne({code: ticketId});
    console.log(ticket);
    return ticket;
  } catch (error) {
    throw new Error(error);
  }
}

export async function update(ticketId, ticketUpdated) {
  try {
    const response = await TicketModel.findByIdAndUpdate(
      ticketId,
      ticketUpdated,
      { new: true }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteTicket(ticketId) {
  try {
    const response = await TicketModel.findByIdAndDelete(ticketId);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
