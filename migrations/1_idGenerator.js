var idGenerator = artifacts.require("idGenerator");

module.exports = function (deployer) {
  deployer.deploy(idGenerator);
};