import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, addDays } from "date-fns";
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
export const webinarDate = new Date(2023, 4, 3, 18, 30); // May 3rd, 2023 at 18:30
export const webinarEndDate = new Date(2023, 4, 3, 20, 0); // May 3rd, 2023 at 20:00

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
  return formatTime(webinarDate);
}

// Helper to validate email format
export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}
