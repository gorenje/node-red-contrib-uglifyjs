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
      RED.util.evaluateNodeProperty(cfg.property || 'payload', cfg.propertyType || 'msg', node, msg, (err,content) => {
        if ( err ) {
          msg.error = err
          done("Failed finding property", msg)
          return;
        }

        RED.util.evaluateNodeProperty(cfg.config, cfg.configType, node, msg, (err, uggCfg) => {
          if (err) {
            msg.error = err
            done("Failed finding configuration", msg)
            return;
          }

          var result = UglifyJS.minify(content, uggCfg)

          if (result.error) {
            msg.error = result.error
            done("ugly error occurred", msg)
          } else {
            // if result object consists of a single key called 'code' then return its 
            // value as payload, else return the entire result object.
            if (Object.keys(result).length == 1 && result.code) {
              result = result.code
            }

            if (cfg.propertyType === 'flow' || cfg.propertyType === 'global') {
              node.context()[cfg.propertyType].set(cfg.property, result, () => {
                send(msg);
                done();
              })
              return;
            } else {
              RED.util.setMessageProperty(msg, cfg.property || 'payload', result, true);
            }

            send(msg);
            done();
          }
        })
      })
    })
  }
  
  RED.nodes.registerType("UglifyJS", UglifyJSFunctionality);

}
