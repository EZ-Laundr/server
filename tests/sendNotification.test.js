const axios = require("axios");
const sendNotification = require("../helpers/sendNotification");

jest.mock("axios");

describe("mocking push notifications", () => {
	test("should fetch users", () => {
		const result = {
			status: 200,
			statusText: "OK",
		};
		const resp = { data: result };
		axios.post.mockResolvedValue(resp);

		return sendNotification("token", {
			title: "a",
			body: "b",
		}).then((data) => expect(data).toEqual(undefined));
	});
});
