const app = require("../server.js");
const request = require("supertest");

describe("Vendor location & status validation", function () {
	let token = null;
	it("Register test vendor", function (done) {
		request(app)
			.post("/vendor/register")
			.set("Content-Type", "application/json")
			.send({ name: "Vendor Test", password: "Password" })
			.expect(200)
			.end(done);
	});

	it("Login with test vendor", function (done) {
		request(app)
			.post("/vendor/login")
			.set("Content-Type", "application/json")
			.send({ name: "Vendor Test", password: "Password" })
			.expect(200)
			.end(function (err, res) {
				token = res.body.token;
				done();
			});
	});

	it("Successfully put a valid location & status for test vendor", function (done) {
		request(app)
			.put("/vendor/address")
			.set("Content-Type", "application/json")
			.set("x-access-token", token)
			.send({ status: "open", location: { lst: 0, lng: 0 } })
			.expect(200)
			.end(done);
	});

	it("Delete test vendor", function (done) {
		request(app)
			.delete("/vendor/")
			.set("x-access-token", token)
			.expect(200)
			.end(done);
	});

	it("Fail login with unregistered vendor", function (done) {
		request(app)
			.post("/vendor/login")
			.set("Content-Type", "application/json")
			.send({ name: "fake Vendor", password: "fake password" })
			.expect(404)
			.end(done);
	});
});
