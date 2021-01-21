lib/codemirror.js built from tag `5.55.0` using yarn 1.22.10.

This is primarily useful for including CodeMirror >= 5.20 as a git submodule.
Specifically, submodules work on GitHub Pages.

You don't have to trust my build.  I recommend taking upstream CodeMirror,
running `./build-releases.sh` yourself (latest version in my
`build-releases` branch) and pushing the tags it creates to your own fork.

build output:

```bash
$ yarn install
yarn install v1.22.10
info No lockfile found.
[1/4] Resolving packages...
warning blint > nomnom@1.8.1: Package no longer supported. Contact support@npmjs.com for more info.
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
$ npm run-script build
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1611256016584-0.74578664439314/node but npm is using /usr/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> codemirror@5.55.0 build /home/cben/md/mathdown/CodeMirror
> rollup -c


src/codemirror.js → lib/codemirror.js...
(!) Circular dependencies
src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/highlight_worker.js
src/display/line_numbers.js -> src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/line_numbers.js
src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/update_display.js
...and 3 more
created lib/codemirror.js in 2.9s

src/addon/runmode/runmode-standalone.js → addon/runmode/runmode-standalone.js...
created addon/runmode/runmode-standalone.js in 114ms

src/addon/runmode/runmode.node.js → addon/runmode/runmode.node.js...
created addon/runmode/runmode.node.js in 124ms
Done in 44.51s.
$ npm list --depth=0
codemirror@5.55.0 /home/cben/md/mathdown/CodeMirror
├── @rollup/plugin-buble@0.21.3
├── blint@1.1.1
├── node-static@0.7.11
├── puppeteer@1.20.0
└── rollup@1.32.1

$ npm run build

> codemirror@5.55.0 build /home/cben/md/mathdown/CodeMirror
> rollup -c


src/codemirror.js → lib/codemirror.js...
(!) Circular dependencies
src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/highlight_worker.js
src/display/line_numbers.js -> src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/line_numbers.js
src/display/update_display.js -> src/display/highlight_worker.js -> src/display/operations.js -> src/display/scrollbars.js -> src/display/scrolling.js -> src/display/update_display.js
...and 3 more
created lib/codemirror.js in 3.2s

src/addon/runmode/runmode-standalone.js → addon/runmode/runmode-standalone.js...
created addon/runmode/runmode-standalone.js in 125ms

src/addon/runmode/runmode.node.js → addon/runmode/runmode.node.js...
created addon/runmode/runmode.node.js in 121ms
```

----


# CodeMirror

[![Build Status](https://travis-ci.org/codemirror/CodeMirror.svg)](https://travis-ci.org/codemirror/CodeMirror)
[![NPM version](https://img.shields.io/npm/v/codemirror.svg)](https://www.npmjs.org/package/codemirror)
[![Join the chat at https://gitter.im/codemirror/CodeMirror](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/codemirror/CodeMirror)  

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
