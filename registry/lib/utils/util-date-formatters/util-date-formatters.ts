/**
 * Formats a date for HTML form input fields (type="date").
 * Returns the date in ISO format (YYYY-MM-DD) suitable for date input fields.
 *
 * @param date - Optional Date object to format
 * @returns Formatted date string (YYYY-MM-DD) or "-" if date is not provided
 *
 * @example
 * formatFormDate(new Date(2024, 0, 15)) // Returns "2024-01-15"
 */
export function formatFormDate(date?: Date | undefined): string {
  if (!date) return "-";
  return date.toISOString().split("T")[0];
}

/**
 * Formats a date in Italian format (DD/MM/YYYY).
 * Used for displaying dates in the UI with day/month/year format.
 *
 * @param date - Optional Date object to format (can be null)
 * @returns Formatted date string (DD/MM/YYYY) or "-" if date is not provided
 *
 * @example
 * formatDate(new Date(2024, 0, 15)) // Returns "15/01/2024"
 */
export function formatDate(date?: Date | null | undefined): string {
  if (!date) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Formats a date for filter queries (YYYY-MM-DD).
 * Used when sending date filters to the API or for date range filtering.
 *
 * @param d - Date object to format
 * @returns Formatted date string in ISO date format (YYYY-MM-DD)
 *
 * @example
 * filterFormatDate(new Date(2024, 0, 15)) // Returns "2024-01-15"
 */
export const filterFormatDate = (d: Date) => {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/**
 * Formats a date for API requests in full ISO 8601 format.
 * Returns the complete ISO string including time and timezone information.
 *
 * @param date - Optional Date object to format (can be null)
 * @returns ISO 8601 formatted string (YYYY-MM-DDTHH:mm:ss.sssZ) or empty string if date is not provided
 *
 * @example
 * formatDateForAPI(new Date()) // Returns "2024-01-15T10:30:00.000Z"
 */
export function formatDateForAPI(date?: Date | null | undefined): string {
  if (!date) return "";
  return date.toISOString(); // Restituisce il formato completo ISO 8601
}

/**
 * Formats a timestamp with date and time in Italian locale.
 * Displays both date and time in a readable format (DD/MM/YYYY, HH:mm).
 *
 * @param timestamp - Optional Date object representing the timestamp
 * @returns Formatted string with date and time (DD/MM/YYYY, HH:mm) or "-" if timestamp is not provided
 *
 * @example
 * formatTimestamp(new Date(2024, 0, 15, 14, 30)) // Returns "15/01/2024, 14:30"
 */
export function formatTimestamp(timestamp?: Date | undefined): string {
  if (!timestamp) return "-";
  const formatter = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formatter.format(timestamp);
}

/**
 * Formats a date string with time in a custom Italian format.
 * Displays date with abbreviated month name and time (DD MMM YYYY - HH:mm).
 *
 * @param dateString - Optional date string to parse and format
 * @returns Formatted string (e.g., "15 gen 2024 - 14:30") or "-" if dateString is not provided
 *
 * @example
 * formatDateWithTime("2024-01-15T14:30:00Z") // Returns "15 gen 2024 - 14:30"
 */
export function formatDateWithTime(dateString: string | undefined) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("it-IT", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} - ${hours}:${minutes}`;
}

/**
 * Calculates and formats the time elapsed since a given date.
 * Returns a human-readable Italian string describing how long ago the date was.
 *
 * @param lastUpdate - Date object representing the time to compare against now
 * @returns Italian string describing the time elapsed (e.g., "5 minuti fa", "2 ore fa", "3 giorni fa")
 *          Returns "Ora" for less than 1 minute, "Unknown" for edge cases
 *
 * @example
 * formatTimeSinceLastUpdate(new Date(Date.now() - 5 * 60 * 1000)) // Returns "5 minuti fa"
 * formatTimeSinceLastUpdate(new Date(Date.now() - 2 * 60 * 60 * 1000)) // Returns "2 ore fa"
 */
export function formatTimeSinceLastUpdate(lastUpdate: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - lastUpdate.getTime();
  const minutes = Math.floor(diffInMs / 60000); // Convert milliseconds to minutes

  if (minutes < 1) return "Ora";
  if (minutes < 60) return `${minutes} minuti fa`;
  if (minutes > 60 && minutes < 120)
    return `${Math.floor(minutes / 60)} ora fa`;
  if (minutes > 120 && minutes < 1440)
    return `${Math.floor(minutes / 60)} ore fa`;
  if (minutes > 1440 && minutes < 10080)
    return `${Math.floor(minutes / 1440)} giorni fa`;
  if (minutes > 10080) return `${Math.floor(minutes / 10080)} settimane fa`;

  return "Unknown";
}
