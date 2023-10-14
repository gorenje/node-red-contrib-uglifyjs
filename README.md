# Node-RED node wrapping Uglify-JS

Simple node that using the <a href="https://www.npmjs.com/package/uglify-js">uglify-js</a> package to minify Javascript code.

The node calls `minify` passing the options defined in the nodes configuration.

All this nodes does is:

```
var UglifyJS = require("uglify-js");

const uggCfg = RED.util.evaluateNodeProperty(cfg.config, cfg.configType, node, msg)

msg.payload = UglifyJS.minify(msg.payload, uggCfg);

send(msg)
```

Configuration provided in the nodes property panel is passed directly to the Uglify-JS `minify` method.

One could say this is a wrapper node around the <a href="https://www.npmjs.com/package/uglify-js">uglify-js</a> package and one would be quite correct.

The [usage example](https://flowhub.org/f/ca78ac1011bd3194) is also included in the package, Node-RED --> Import --> Examples:

![img](https://cdn.openmindmap.org/content/1697273742712_Screen_Shot_2023-10-14_at_10.55.06.png)

### Artifacts

- [Flow maintaining this code](https://flowhub.org/f/1cb1d34936a3b179)
- [GitHub repo](https://github.com/gorenje/node-red-contrib-uglifyjs)
- [NPMjs package](https://www.npmjs.com/package/@gregoriusrippenstein/node-red-contrib-uglifyjs)
- [Node-RED package page](https://flows.nodered.org/node/@gregoriusrippenstein/node-red-contrib-uglifyjs)

