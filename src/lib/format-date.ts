export function formatDateToYYYYMMDD(dateString: string) {
	// Check if the dateString matches the expected format YYYY-MM-DD
	const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
	if (dateFormatRegex.test(dateString)) {
		return dateString; // Return the string as is if it matches the format
	}

	const date = new Date(dateString);

	// Get year, month, and day
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}
