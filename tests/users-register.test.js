const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const {
    dummyUser,
    dummyNoEmail,
    dummyNoPass,
    dummyUserPhoneString,
    dummyEmailEmptyStr,
    dummyPassEmptyStr,
    dummyWrongEmailFormat,
} = require("./dummy-user.json");

afterAll((done) => {
    User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
        .then(() => done())
        .catch((err) => done(err));
});

describe("POST /register [no email]", () => {
    test("register failed", (done) => {
        request(app)
            .post("/register")
            .set("Accept", "application/json")
            .send(dummyNoEmail)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    msg: ["email cannot be empty"],
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /register [no pass]", () => {
    test("register failed", (done) => {
        request(app)
            .post("/register")
            .set("Accept", "application/json")
            .send(dummyNoPass)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    msg: ["password cannot be empty"],
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /register [email empty string]", () => {
    test("register failed", (done) => {
        request(app)
            .post("/register")
            .set("Accept", "application/json")
            .send(dummyEmailEmptyStr)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    msg: [
                        "email cannot be empty",
                        "email must be in email format",
                    ],
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /register [password empty string]", () => {
    test("register failed", (done) => {
        request(app)
            .post("/register")
            .set("Accept", "application/json")
            .send(dummyPassEmptyStr)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    msg: ["password cannot be empty"],
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /register [wrong email format]", () => {
    test("register failed", (done) => {
        request(app)
            .post("/register")
            .set("Accept", "application/json")
            .send(dummyWrongEmailFormat)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    msg: ["email must be in email format"],
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /register [has email and password]", () => {
    test("register successful", (done) => {
        request(app)
            .post("/register")
            .set("Accept", "application/json")
            .send(dummyUser)
            .then((response) => {
                expect(response.status).toBe(201);
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

describe("POST /register [email already in use]", () => {
    test("register failed", (done) => {
        request(app)
            .post("/register")
            .set("Accept", "application/json")
            .send(dummyUser)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    msg: ["email address already exist"],
                });
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});
