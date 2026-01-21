export const fakeApiCall = <T>(response: T, fail = false, delay = 800) =>
	new Promise<T>((resolve, reject) => {
		setTimeout(() => {
			if (fail) reject(new Error("Something went wrong"));
			else resolve(response);
		}, delay);
	});
