class AppLogger {
    private static isDevelopment = process.env.NODE_ENV === "development";

    public static log(message: any, ...args: any[]) {
        if (this.isDevelopment) {
            console.log(message, ...args);
		}
	}
}

export default AppLogger;
