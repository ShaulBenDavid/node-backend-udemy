const expect = require("chai").expect;
const { describe } = require("mocha");
const sinon = require("sinon");
const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth controller", () => {
  it("Should throw error if accessing the database fails", function (done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();
    const req = {
      body: {
        email: "testsss@test.com",
        password: "aasdas",
      },
    };
    AuthController.login(req, {}, () => {})
      .then((result) => {
        expect(result).to.have.an("error");
        expect(result).to.have.property("statusCode", 500);
        done();
      })
      .catch((err) => {
        done(err);
      });
    User.findOne.restore();
  });
});
