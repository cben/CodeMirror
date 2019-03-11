lib/codemirror.js built from tag `5.41.0` using yarn 1.12.3.

This is primarily useful for including CodeMirror >= 5.20 as a git submodule.
Specifically, submodules work on GitHub Pages.

You don't have to trust my build.  I recommend taking upstream CodeMirror,
running `./build-releases.sh` yourself (latest version in my
 `build-releases` branch) and pushing the tags it creates to your own fork.

build output:

```bash
$ yarn install
yarn install v1.12.3
info No lockfile found.
[1/4] Resolving packages...
warning blint > nomnom@1.8.1: Package no longer supported. Contact support@npmjs.com for more info.
warning rollup-watch@4.3.1: rollup-watch functionality is now included in Rollup itself
[2/4] Fetching packages...
info fsevents@1.2.7: The platform "linux" is incompatible with this module.
info "fsevents@1.2.7" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
$ npm run-script build
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1552333328640-0.649782099806478/node but npm is using /usr/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> codemirror@5.41.0 build /home/bpaskinc/md/mathdown/CodeMirror
> rollup -c


src/codemirror.js → lib/codemirror.js...
(!) Circular dependency: src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/highlight_worker.js
(!) Circular dependency: src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/line_numbers.js -> src/display/update_display.js
(!) Circular dependency: src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/update_display.js
(!) Circular dependency: src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/update_display.js
(!) Circular dependency: src/edit/CodeMirror.js -> src/model/Doc.js -> src/edit/CodeMirror.js
created lib/codemirror.js in 1.9s
Done in 20.47s.
$ npm list --depth=0
codemirror@5.41.0 /home/bpaskinc/md/mathdown/CodeMirror
├── blint@1.0.3
├── node-static@0.7.11
├── phantomjs-prebuilt@2.1.16
├── rollup@0.66.6
├── rollup-plugin-buble@0.19.6
└── rollup-watch@4.3.1

$ npm run build

> codemirror@5.41.0 build /home/bpaskinc/md/mathdown/CodeMirror
> rollup -c


src/codemirror.js → lib/codemirror.js...
(!) Circular dependency: src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/highlight_worker.js
(!) Circular dependency: src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/line_numbers.js -> src/display/update_display.js
(!) Circular dependency: src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/update_display.js
(!) Circular dependency: src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/update_display.js
(!) Circular dependency: src/edit/CodeMirror.js -> src/model/Doc.js -> src/edit/CodeMirror.js
created lib/codemirror.js in 2.1s
```

----


# CodeMirror

[![Build Status](https://travis-ci.org/codemirror/CodeMirror.svg)](https://travis-ci.org/codemirror/CodeMirror)
[![NPM version](https://img.shields.io/npm/v/codemirror.svg)](https://www.npmjs.org/package/codemirror)
[![Join the chat at https://gitter.im/codemirror/CodeMirror](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/codemirror/CodeMirror)  
[Funding status: ![maintainer happiness](https://marijnhaverbeke.nl/fund/status_s.png?again)](https://marijnhaverbeke.nl/fund/)

CodeMirror is a versatile text editor implemented in JavaScript for
the browser. It is specialized for editing code, and comes with over
100 language modes and various addons that implement more advanced
editing functionality. Every language comes with fully-featured code
and syntax highlighting to help with reading and editing complex code.

A rich programming API and a CSS theming system are available for
customizing CodeMirror to fit your application, and extending it with
new functionality.

You can find more information (and the
[manual](https://codemirror.net/doc/manual.html)) on the [project
page](https://codemirror.net). For questions and discussion, use the
[discussion forum](https://discuss.codemirror.net/).

See
[CONTRIBUTING.md](https://github.com/codemirror/CodeMirror/blob/master/CONTRIBUTING.md)
for contributing guidelines.

The CodeMirror community aims to be welcoming to everybody. We use the
[Contributor Covenant
(1.1)](http://contributor-covenant.org/version/1/1/0/) as our code of
conduct.

### Installation

Either get the [zip file](https://codemirror.net/codemirror.zip) with
the latest version, or make sure you have [Node](https://nodejs.org/)
installed and run:

    npm install codemirror

**NOTE**: This is the source repository for the library, and not the
distribution channel. Cloning it is not the recommended way to install
the library, and will in fact not work unless you also run the build
step.

### Quickstart

To build the project, make sure you have Node.js installed (at least version 6)
and then `npm install`. To run, just open `index.html` in your
browser (you don't need to run a webserver). Run the tests with `npm test`.
