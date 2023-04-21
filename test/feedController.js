const expect = require("chai").expect;
const { describe } = require("mocha");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/user");
const FeedController = require("../controllers/feed");

describe("Feed controller", () => {
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
  it("Should add a created post to the posts of the creator", function (done) {
    const req = {
      body: {
        title: "adsdasd",
        content: "aasdas",
      },
      file: {
        path: "asdas",
      },
      userId: "507f1f77bcf86cd799439011",
    };
    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    FeedController.createPost(req, res, () => {})
      .then((result) => {
        expect(result).to.have.property("posts");
        expect(result.posts).to.have.length(1);
        done();
      })
      .catch((err) => {
        done(err);
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
