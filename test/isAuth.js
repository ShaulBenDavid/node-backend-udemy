const expect = require("chai").expect;
const { describe } = require("mocha");
const isAuth = require("../middleware/is-auth");

describe("Auth Middleware", () => {
  it("it should throw arrow if there is no auth header", function () {
    const req = {
      get: () => null,
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not Authenticated");
  });

  it("it should throw arrow if there is only one string", function () {
    const req = {
      get: () => "Barer",
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw();
  });

  it("it should throw arrow if the token not verify", function () {
    const req = {
      get: () => "Bearer asdasd",
    };
    expect(isAuth.bind(this, req, {}, () => {})).to.throw();
  });
});
