const app = require("../app");
const request = require("supertest");
const { Perfume } = require("../models");

describe("GET /perfumes", () => {
	test("login failed", (done) => {
		request(app)
			.post("/perfumes")
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body[0]).toHaveProperty("id");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
