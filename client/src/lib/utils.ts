import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, addDays, addHours } from "date-fns";
import { it } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return format(date, "d MMMM yyyy", { locale: it });
}

export function formatTime(date: Date): string {
  return format(date, "HH:mm", { locale: it });
}

// Brand colors
export const brandColors = {
  blue: "#010133",
  yellow: "#F8C112"
};

// Webinar details
export const webinarDate = new Date(2025, 4, 10, 10, 0); // May 10th, 2025 at 10:00
export const webinarEndDate = new Date(2025, 4, 10, 11, 30); // May 10th, 2025 at 11:30

// Offerta speciale: 1 ora dopo la fine del webinar
export const offerEndDate = addHours(webinarEndDate, 1); // 1 ora dopo la fine del webinar (11:30 + 1h)

// Corso special offer: 48 ore dopo la fine del webinar
export const courseOfferEndDate = addHours(webinarEndDate, 48); // 48 ore dopo la fine del webinar (11:30 + 48h)

// Social media links
export const socialLinks = {
  facebook: "https://facebook.com/sgpeople",
  linkedin: "https://linkedin.com/in/salvatoregarufi",
  instagram: "https://instagram.com/sgpeople",
  youtube: "https://youtube.com/sgpeople"
};

// Helper to get webinar date formatted for display
export function getWebinarDateFormatted(): string {
  return formatDate(webinarDate);
}

// Helper to get webinar time formatted for display
export function getWebinarTimeFormatted(): string {
  return `${formatTime(webinarDate)} - ${formatTime(webinarEndDate)}`;
}

export function getWebinarDuration(): string {
  const durationMs = webinarEndDate.getTime() - webinarDate.getTime();
  const durationMinutes = Math.floor(durationMs / (1000 * 60));
  return `${durationMinutes} minuti`;
}

// Verifica se l'offerta speciale è scaduta
export function isSpecialOfferExpired(): boolean {
  return new Date() > offerEndDate;
}

// Verifica se l'offerta del corso è scaduta
export function isCourseOfferExpired(): boolean {
  return new Date() > courseOfferEndDate;
}

// Helper to validate email format
export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}
