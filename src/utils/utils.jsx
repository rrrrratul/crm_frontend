export default function getTicketCount(ticketList, status) {
  return ticketList.filter((ticket) => ticket.status === status).length;
}
