lib/codemirror.js built from tag `5.25.0` using yarn 1.9.4.

This is primarily useful for including CodeMirror >= 5.20 as a git submodule.
Specifically, submodules work on GitHub Pages.

You don't have to trust my build.  I recommend taking upstream CodeMirror,
running `./build-releases.sh` yourself (latest version in my
 `build-releases` branch) and pushing the tags it creates to your own fork.

build output:

```bash
$ yarn install
yarn install v1.9.4
info No lockfile found.
[1/4] Resolving packages...
warning blint > nomnom@1.8.1: Package no longer supported. Contact support@npmjs.com for more info.
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
$ npm run-script build

> codemirror@5.25.0 build /home/bpaskinc/md/mathdown/CodeMirror
> rollup -c

Done in 11.42s.
$ npm list --depth=0
codemirror@5.25.0 /home/bpaskinc/md/mathdown/CodeMirror
├── blint@0.5.1
├── node-static@0.6.0
├── phantomjs-prebuilt@2.1.16
├── rollup@0.41.6
├── rollup-plugin-buble@0.15.0
└── rollup-watch@3.2.2

$ npm run build

> codemirror@5.25.0 build /home/bpaskinc/md/mathdown/CodeMirror
> rollup -c

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
editing functionality.

A rich programming API and a CSS theming system are available for
customizing CodeMirror to fit your application, and extending it with
new functionality.

You can find more information (and the
[manual](http://codemirror.net/doc/manual.html)) on the [project
page](http://codemirror.net). For questions and discussion, use the
[discussion forum](https://discuss.codemirror.net/).

See
[CONTRIBUTING.md](https://github.com/codemirror/CodeMirror/blob/master/CONTRIBUTING.md)
for contributing guidelines.

The CodeMirror community aims to be welcoming to everybody. We use the
[Contributor Covenant
(1.1)](http://contributor-covenant.org/version/1/1/0/) as our code of
conduct.

### Quickstart

To build the project, make sure you have Node.js installed (at least version 6)
and then `npm install`. To run, just open `index.html` in your
browser (you don't need to run a webserver). Run the tests with `npm test`.
