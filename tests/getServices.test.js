const app = require("../app");
const request = require("supertest");
const { User, Perfume } = require("../models");
const { dummyUser, dummyUser2 } = require("./dummy-user.json");
const { signToken } = require("../helpers/jwt");
let access_token;
let accessTokenUser;
let testedId;

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
	User.create({
		phoneNumber: dummyUser2.phoneNumber,
		email: dummyUser2.email,
		password: dummyUser2.password,
		role: "customer",
	})
		.then((result) => {
			accessTokenUser = signToken({
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

describe("GET /services", () => {
	test("success", (done) => {
		request(app)
			.get("/services")
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

describe("GET /admin/services", () => {
	test("success", (done) => {
		request(app)
			.get("/admin/services")
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

describe("GET /admin/services", () => {
	test("invalid token", (done) => {
		request(app)
			.get("/admin/services")
			.set("access_token", "wrongaccesstoken")
			.then((response) => {
				expect(response.status).toBe(401);
				expect(response.body).toHaveProperty("msg");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("POST admin/services", () => {
	test("success", (done) => {
		request(app)
			.post("/admin/services")
			.set("Accept", "application/json")
			.set("access_token", access_token)
			.send({
				name: "services baru",
				imageUrl: "image",
				price: 2000,
			})
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty("id");
				expect(response.body).toHaveProperty("price");
				expect(response.body).toHaveProperty("imageUrl");
				testedId = response.body.id;
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /admin/services/:id", () => {
	test("success", (done) => {
		request(app)
			.get(`/admin/services/${testedId}`)
			.set("access_token", access_token)
			.then((response) => {
				expect(response.status).toBe(200);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /admin/services/:id", () => {
	test("not found", (done) => {
		request(app)
			.get(`/admin/services/${testedId + 1}`)
			.set("access_token", access_token)
			.then((response) => {
				expect(response.status).toBe(404);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("POST admin/services", () => {
	test("Unauthorized", (done) => {
		request(app)
			.post("/admin/services")
			.set("Accept", "application/json")
			.set("access_token", accessTokenUser)
			.send({
				name: "services baru",
				imageUrl: "image",
				price: 2000,
			})
			.then((response) => {
				expect(response.status).toBe(403);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PUT admin/services", () => {
	test("success", (done) => {
		request(app)
			.put(`/admin/services/${testedId}`)
			.set("Accept", "application/json")
			.set("access_token", access_token)
			.send({
				name: "edited service",
			})
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveProperty("id");
				expect(response.body).toHaveProperty("name");
				expect(response.body).toHaveProperty("price");
				expect(response.body).toHaveProperty("imageUrl");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PUT admin/services", () => {
	test("wrong input type", (done) => {
		request(app)
			.put(`/admin/services/${testedId}`)
			.set("Accept", "application/json")
			.set("access_token", access_token)
			.send({
				price: "twothousand",
			})
			.then((response) => {
				expect(response.status).toBe(500);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("DELETE admin/services", () => {
	test("success", (done) => {
		request(app)
			.delete(`/admin/services/${testedId}`)
			.set("Accept", "application/json")
			.set("access_token", access_token)
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty("msg");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("DELETE admin/services", () => {
	test("success", (done) => {
		request(app)
			.delete(`/admin/services/${testedId + 1}`)
			.set("Accept", "application/json")
			.set("access_token", access_token)
			.then((response) => {
				expect(response.status).toBe(404);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
