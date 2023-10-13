# UglifyJS

Simple node that using the <a href="https://www.npmjs.com/package/uglify-js">ugilify-js</a> package to minify Javascript code.

The node calls `minify` passing the options defined in the nodes configuration.

All this nodes does is:

```
var UglifyJS = require("uglify-js");

const uggCfg = RED.util.evaluateNodeProperty(cfg.config, cfg.configType, node, msg)
msg.payload = UglifyJS.minify(code, uggCfg);
```

Configuration provided in the property panel is passed to the `minify` method.

### Artifacts

- [Flow maintaining this code](https://flowhub.org/f/1cb1d34936a3b179)
- [GitHub repo](https://github.com/gorenje/node-red-contrib-uglifyjs)
- [NPMjs package]()
- [Node-RED package page]()


