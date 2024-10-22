export const fetchData = async (dataUrl: string, token?: string) => {
	const getHeaders = new Headers({ "Content-Type": "application/json" });
	if (token) {
		getHeaders.append("Authorization", token);
	}
	console.log(dataUrl);
	try {
		const response = await fetch(dataUrl, {
			headers: getHeaders,
		});
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return await response.json();
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};
