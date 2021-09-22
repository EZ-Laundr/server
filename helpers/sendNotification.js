const axios = require("axios");

async function sendNotification(notificationToken, content) {
	const url = "https://exp.host/--/api/v2/push/send";
	const message = {
		to: notificationToken,
		sound: "default",
		title: content.title,
		body: content.body,
	};

	const result = await axios.post(url, JSON.stringify(message), {
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
	});
}

module.exports = sendNotification;
