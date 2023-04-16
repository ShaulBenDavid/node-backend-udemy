const expect = require("chai").expect;
const isAuth = require("../middleware/is-auth");

it("it should throw arrow if there is no auth header", function () {
  const req = {
    get: () => null,
  };
  expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not Authenticated");
});
