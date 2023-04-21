const expect = require("chai").expect;
const { describe } = require("mocha");
const sinon = require("sinon");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth controller", () => {
  before(function (done) {
    mongoose
      .connect(process.env.MONGO_DB_TEST_KEY)
      .then(() => {
        const user = new User({
          email: "test@gmail.com",
          password: "tester",
          name: "Test",
          _id: "507f1f77bcf86cd799439011",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
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

  it("should send a response with a valid user status for an existing user", function (done) {
    const req = { userId: "507f1f77bcf86cd799439011" };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };
    AuthController.getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal("I am new");
      done();
    });
  });

  after(function (done) {
    User.deleteMany({}).then(() => {
      mongoose.disconnect().then(() => {
        done();
      });
    });
  });
});
