module.exports = function(RED) {
  let CleanCSS = require('clean-css');

  function CoreMinifyCSSFunctionality(config) {
    RED.nodes.createNode(this,config);

    var node = this;
    var cfg = config;

    node.on('close', function() {
      node.status({});
    });

    /* msg handler, in this case pass the message on unchanged */
    node.on("input", function(msg, send, done) {
      RED.util.evaluateNodeProperty(cfg.property || 'payload', cfg.propertyType || 'msg', node, msg, (err, content) => {
        if (err) {
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

          let result = new CleanCSS(uggCfg).minify(content);

          if ((result.errors || []).length > 0  ) {
            msg.error = result.errors
            done("ugly error occurred", msg)
          } else {
            result = result.styles

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
    });
  }

  RED.nodes.registerType("MinifyCSS", CoreMinifyCSSFunctionality);

}
