var fs = require("fs");
var path = require("path");
var utils = require("../utils");
var chai = require("chai");
var expect = chai.expect;
var exec = utils.exec;

var simpleAddonPath = path.join(__dirname, "..", "addons", "simple-addon");

describe("jpm xpi", function () {
  beforeEach(utils.setup);
  afterEach(utils.tearDown);

  it("creates a xpi of the cwd", function (done) {
    process.chdir(simpleAddonPath);
    var proc = exec("xpi", { cwd: simpleAddonPath });
    proc.on("close", function () {
      var xpiPath = path.join(simpleAddonPath, "@simple-addon.xpi");
      utils.unzipTo(xpiPath, utils.tmpOutputDir, function () {
        utils.compareDirs(simpleAddonPath, utils.tmpOutputDir, done);
      });
    });
  });
});
