const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const {
	dummyUser,
	dummyWrongPass,
	dummyWrongEmail,
} = require("./dummy-user.json");

beforeAll((done) => {
	User.create({
		email: dummyUser.email,
		password: dummyUser.password,
		role: "customer",
	})
		.then(() => done())
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

describe("POST /login [wrong pass]", () => {
	test("login failed", (done) => {
		request(app)
			.post("/login")
			.set("Accept", "application/json")
			.send(dummyWrongPass)
			.then((response) => {
				expect(response.status).toBe(401);
				expect(response.body).toEqual({
					message: ["invalid username or email password"],
				});
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("POST /login [email has not registered yet]", () => {
	test("login failed", (done) => {
		request(app)
			.post("/login")
			.set("Accept", "application/json")
			.send(dummyWrongEmail)
			.then((response) => {
				expect(response.status).toBe(401);
				expect(response.body).toEqual({
					message: ["invalid username or email password"],
				});
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("POST /login [has email and password]", () => {
	test("login successful", (done) => {
		request(app)
			.post("/login")
			.set("Accept", "application/json")
			.send(dummyUser)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveProperty("email", dummyUser.email);
				expect(response.body).toHaveProperty("role", "customer");
				expect(response.body).toHaveProperty("access_token");
				expect(response.body).not.toHaveProperty("password");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
