module.exports = function(RED) {
  function UglifyJSFunctionality(config) {
    RED.nodes.createNode(this,config);

    var node = this;
    var cfg = config;

    var UglifyJS = require('uglify-js')

    node.on('close', function () {
      node.status({});
    });

    node.on("input", function (msg, send, done) {
      const uggCfg = RED.util.evaluateNodeProperty(cfg.config, cfg.configType, node, msg)

      var result = UglifyJS.minify(msg.payload, uggCfg)
      
      if ( result.error ) {
        msg.error = result.error
        done("ugly error occurred", msg)
      } else {
        if ( Object.keys(result).length == 1 && result.code ) {
          msg.payload = result.code
        } else {
          msg.payload = result
        }

        send(msg);
        done();
      }
    })
  }
  
  RED.nodes.registerType("UglifyJS", UglifyJSFunctionality);

}
