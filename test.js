pm.test("Status test", function () {
    pm.response.to.have.status(200);
});

pm.test("response must be valid and have a body", function () {
    pm.response.to.be.ok;
    pm.response.to.be.withBody;
    pm.response.to.be.json;
});

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Body should be present", function () {
    pm.expect(pm.response.text()).to.not.be.empty;
});

pm.test("Content-Type is application/json", function () {
    pm.response.to.have.header("Content-Type", "application/json; charset=utf-8");
});

pm.test("Response body should contain at least one post", function () {
    const posts = pm.response.json();
    pm.expect(posts.length).to.be.above(0);
});

