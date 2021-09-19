const app = require("../app");
const request = require("supertest");
const { User, Order } = require("../models");
const { dummyUser } = require("./dummy-user.json");
const { signToken } = require("../helpers/jwt");
let access_token_customer;
let access_token_admin;

beforeAll((done) => {
	User.create({
		email: "admin@mail.com",
		password: "admin",
		role: "admin",
		phoneNumber: 123456789,
	})
		.then((result) => {
			access_token_admin = signToken({
				id: result.id,
				email: result.email,
				role: result.role,
				phoneNumber: result.phoneNumber,
			});
		})
		.then(() =>
			User.create({
				email: dummyUser.email,
				password: dummyUser.password,
				role: "customer",
				phoneNumber: dummyUser.phoneNumber,
			})
		)

		.then((result) => {
			access_token_customer = signToken({
				id: result.id,
				email: result.email,
				role: result.role,
				phoneNumber: result.phoneNumber,
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
		.then(() =>
			Order.destroy({
				truncate: true,
				cascade: true,
				restartIdentity: true,
			})
		)
		.then(() => done())
		.catch((err) => done(err));
});

describe("POST /orders", () => {
	test("success", (done) => {
		request(app)
			.post("/orders")
			.set("Accept", "application/json")
			.set("access_token", access_token_customer)
			.send({
				ServiceId: 1,
				perfume: {
					id: 1,
					price: 2000,
				},
				treatments: [
					{
						id: 2,
						qty: 2,
						price: 2000,
					},
					{
						id: 1,
						qty: 1,
						price: 4000,
					},
				],
				pickup: false,
			})
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty("id");
				expect(response.body).toHaveProperty("status", "pending");
				expect(response.body).toHaveProperty("totalPrice");
				expect(response.body).toHaveProperty("pickup");
				expect(response.body).toHaveProperty("customerAddress");
				expect(response.body).toHaveProperty("rangeAddress");
				expect(response.body).toHaveProperty("UserId");
				expect(response.body).toHaveProperty("ServiceId");
				expect(response.body).toHaveProperty("PerfumeId");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PUT /admin/orders/:id", () => {
	test("success", (done) => {
		request(app)
			.put("/admin/orders/1")
			.set("Accept", "application/json")
			.set("access_token", access_token_admin)
			.send({
				weight: 2,
			})
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveProperty("id");
				expect(response.body).toHaveProperty("status", "On Progress");
				expect(response.body).toHaveProperty("totalPrice");
				expect(response.body).toHaveProperty("pickup");
				expect(response.body).toHaveProperty("customerAddress");
				expect(response.body).toHaveProperty("rangeAddress");
				expect(response.body).toHaveProperty("UserId");
				expect(response.body).toHaveProperty("ServiceId");
				expect(response.body).toHaveProperty("PerfumeId");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PUT /admin/orders/:id", () => {
	test("success", (done) => {
		request(app)
			.put("/admin/orders/99")
			.set("Accept", "application/json")
			.set("access_token", access_token_admin)
			.send({
				weight: 2,
			})
			.then((response) => {
				expect(response.status).toBe(404);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /order", () => {
	test("success", (done) => {
		request(app)
			.get("/orders")
			.set("access_token", access_token_customer)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body[0]).toHaveProperty("id");
				expect(response.body[0]).toHaveProperty("weight");
				expect(response.body[0]).toHaveProperty("status");
				expect(response.body[0]).toHaveProperty("totalPrice");
				expect(response.body[0]).toHaveProperty("pickup");
				expect(response.body[0]).toHaveProperty("customerAddress");
				expect(response.body[0]).toHaveProperty("rangeAddress");
				expect(response.body[0]).toHaveProperty("OrderSpecials");
				expect(response.body[0]).toHaveProperty("ServiceId");
				expect(response.body[0]).toHaveProperty("PerfumeId");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /admin/order", () => {
	test("success", (done) => {
		request(app)
			.get("/admin/orders")
			.set("access_token", access_token_admin)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body[0]).toHaveProperty("id");
				expect(response.body[0]).toHaveProperty("weight");
				expect(response.body[0]).toHaveProperty("status");
				expect(response.body[0]).toHaveProperty("totalPrice");
				expect(response.body[0]).toHaveProperty("pickup");
				expect(response.body[0]).toHaveProperty("customerAddress");
				expect(response.body[0]).toHaveProperty("rangeAddress");
				expect(response.body[0]).toHaveProperty("OrderSpecials");
				expect(response.body[0]).toHaveProperty("ServiceId");
				expect(response.body[0]).toHaveProperty("PerfumeId");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /order/:id", () => {
	test("success", (done) => {
		request(app)
			.get("/orders/1")
			.set("access_token", access_token_customer)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveProperty("id");
				expect(response.body).toHaveProperty("weight");
				expect(response.body).toHaveProperty("status");
				expect(response.body).toHaveProperty("totalPrice");
				expect(response.body).toHaveProperty("pickup");
				expect(response.body).toHaveProperty("customerAddress");
				expect(response.body).toHaveProperty("rangeAddress");
				expect(response.body).toHaveProperty("OrderSpecials");
				expect(response.body).toHaveProperty("ServiceId");
				expect(response.body).toHaveProperty("PerfumeId");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /order/:id", () => {
	test("success", (done) => {
		request(app)
			.get("/orders/99")
			.set("access_token", access_token_customer)
			.then((response) => {
				expect(response.status).toBe(404);

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /admin/order/:id", () => {
	test("success", (done) => {
		request(app)
			.get("/admin/orders/1")
			.set("access_token", access_token_admin)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveProperty("id");
				expect(response.body).toHaveProperty("weight");
				expect(response.body).toHaveProperty("status");
				expect(response.body).toHaveProperty("totalPrice");
				expect(response.body).toHaveProperty("pickup");
				expect(response.body).toHaveProperty("customerAddress");
				expect(response.body).toHaveProperty("rangeAddress");
				expect(response.body).toHaveProperty("OrderSpecials");
				expect(response.body).toHaveProperty("ServiceId");
				expect(response.body).toHaveProperty("PerfumeId");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /admin/order/:id", () => {
	test("fail", (done) => {
		request(app)
			.get("/admin/orders/99")
			.set("access_token", access_token_admin)
			.then((response) => {
				expect(response.status).toBe(404);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PATCH /admin/orders/:id", () => {
	test("fail", (done) => {
		request(app)
			.patch("/admin/orders/99")
			.set("Accept", "application/json")
			.set("access_token", access_token_admin)

			.then((response) => {
				expect(response.status).toBe(404);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PATCH /admin/orders/:id", () => {
	test("success", (done) => {
		request(app)
			.patch("/admin/orders/1")
			.set("Accept", "application/json")
			.set("access_token", access_token_admin)

			.then((response) => {
				expect(response.status).toBe(200);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
