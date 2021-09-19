const app = require("../app");
const request = require("supertest");
const { User, Perfume } = require("../models");
const { dummyUser } = require("./dummy-user.json");
const { signToken } = require("../helpers/jwt");
let access_token;

beforeAll((done) => {
	User.create({
		phoneNumber: dummyUser.phoneNumber,
		email: dummyUser.email,
		password: dummyUser.password,
		role: "admin",
	})
		.then((result) => {
			access_token = signToken({
				id: result.id,
				email: result.email,
				phoneNumber: result.phoneNumber,
				role: result.role,
			});
			done();
		})
		.catch((err) => done(err));
});

afterAll((done) => {
	User.destroy({
		truncate: true,
		cascade: true,
		restartIdentity: true,
	})
		.then(() => done())
		.catch((err) => done(err));
});

describe("POST admin/perfumes", () => {
	test("success", (done) => {
		request(app)
			.post("/admin/perfumes")
			.set("Accept", "application/json")
			.set("access_token", access_token)
			.send({
				name: "bunga",
				price: 2000,
				imageUrl: "thisIsImageUrl",
			})
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty("name");
				expect(response.body).toHaveProperty("price");
				expect(response.body).toHaveProperty("imageUrl");
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /perfumes", () => {
	test("success", (done) => {
		request(app)
			.get("/perfumes")
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body[0]).toHaveProperty("id");
				expect(response.body[0]).toHaveProperty("name");
				expect(response.body[0]).toHaveProperty("price");
				expect(response.body[0]).toHaveProperty("imageUrl");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /admin/perfumes", () => {
	test("success", (done) => {
		request(app)
			.get("/admin/perfumes")
			.set("access_token", access_token)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body[0]).toHaveProperty("id");
				expect(response.body[0]).toHaveProperty("name");
				expect(response.body[0]).toHaveProperty("price");
				expect(response.body[0]).toHaveProperty("imageUrl");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
