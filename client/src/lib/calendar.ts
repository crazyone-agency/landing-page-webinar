import { webinarDate, webinarEndDate } from './utils';

/**
 * Creates a calendar event and triggers download or opens appropriate calendar
 */
export function addEventToCalendar() {
  // ICS file format for calendar events
  const title = "Webinar: Rivoluzione a piccoli passi con Salvatore Garufi";
  const description = "Webinar gratuito su come trasformare la tua routine e i tuoi risultati con piccole azioni quotidiane basate sulla neuroscienza.";
  const location = "Online via Zoom";
  
  const startTime = formatDateForCalendar(webinarDate);
  const endTime = formatDateForCalendar(webinarEndDate);
  
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//SG People Group//Webinar//IT",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DTSTART:${startTime}`,
    `DTEND:${endTime}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");
  
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  
  // Create a link element, set up the calendar file for download, and click it
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "webinar-rivoluzione-piccoli-passi.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Format date for iCalendar format (YYYYMMDDTHHmmssZ)
 */
function formatDateForCalendar(date: Date): string {
  const pad = (num: number) => (num < 10 ? "0" : "") + num;
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}
