const assert = require("assert");
const { describe } = require("mocha");
const supertest = require("supertest");
const app = require("../server"); // import the main application file

describe("GET /getall/getemotions", function () {
  it("responds with status 200", function (done) {
    supertest(app)
      .get("/getall/getemotions")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done;
      });
  });
});
