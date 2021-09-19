const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const {
	dummyUser,
	dummyUser2,
	dummyWrongPass,
	dummyWrongEmail,
} = require("./dummy-user.json");

beforeAll((done) => {
	User.create({
		phoneNumber: dummyUser.phoneNumber,
		email: dummyUser.email,
		password: dummyUser.password,
		role: "admin",
	})
		.then((result) => done())
		.catch((err) => done(err));
	User.create({
		phoneNumber: dummyUser2.phoneNumber,
		email: dummyUser2.email,
		password: dummyUser2.password,
		role: "customer",
	})
		.then((result) => done())
		.catch((err) => done(err));
});

// beforeAll((done) => {
//   User.create({
//     phoneNumber: dummyUser.phoneNumber,
//     email: dummyUser.email,
//     password: dummyUser.password,
//     role: "admin",
//   })
//     .then(() => done())
//     .catch((err) => done(err));
// });

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
			.post("/admin/login")
			.set("Accept", "application/json")
			.send(dummyWrongPass)
			.then((response) => {
				expect(response.statusCode).toBe(401);
				expect(response.body).toEqual({
					msg: ["invalid username,email, or password"],
				});
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("POST /login [wrong role]", () => {
	test("login failed", (done) => {
		request(app)
			.post("/admin/login")
			.set("Accept", "application/json")
			.send(dummyUser2)
			.then((response) => {
				expect(response.statusCode).toBe(403);
				// expect(response.body).toEqual({
				// 	msg: ["invalid username,email, or password"],
				// });
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
			.post("/admin/login")
			.set("Accept", "application/json")
			.send(dummyWrongEmail)
			.then((response) => {
				expect(response.statusCode).toBe(401);
				expect(response.body).toEqual({
					msg: ["invalid username or email password"],
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
			.post("/admin/login")
			.set("Accept", "application/json")
			.send(dummyUser)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body).toHaveProperty("email", dummyUser.email);
				expect(response.body).toHaveProperty("access_token");
				expect(response.body).not.toHaveProperty("password");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
