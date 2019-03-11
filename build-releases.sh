#!/bin/bash

set -euo pipefail  # "bash strict mode", abort on any errors

cd "$(dirname "$0")"

# This script and adds *itself* to git, which makes it disappear on 2nd git
# checkout (as it's now "tracked").  To avoid bash crashing, and to be able to
# add itself to git again and again, let's run from a copy.
if [ "$(basename "$0")" != build-releases.tmp.sh ]; then
  cp "$0" build-releases.tmp.sh
  exec ./build-releases.tmp.sh
fi

# Building only became necessary >= 5.20, can safely skip versions <5.0.
for tag in $(git tag --list | egrep -v '^v?[234]\.' | (sort --version-sort || cat) | grep -v -e '-build$'); do
  echo

  # Skip already built tags, so I can re-run after `git fetch`ing new upstream releases.
  newtag="$tag-build"
  if git tag --list "$newtag" | grep "$newtag"; then
     echo "-- $tag -- Skipping existing tag (\`git tag --delete $newtag\` to force rebuild) --"
     continue
  fi

  git checkout --quiet "$tag"

  if git ls-files lib/codemirror.js | grep lib/codemirror.js; then
    echo "-- $tag -- Skipping, at this version building was unnecessary --"
    continue
  fi

  echo "== $tag =="

  git reset --hard
  git clean -x -d --force --exclude=build-releases.tmp.sh
  cp build-releases.tmp.sh build-releases.sh
  chmod 755 build-releases.sh

  git status --ignored

  echo "lib/codemirror.js built from tag \`$tag\` using yarn $(yarn --version).

This is primarily useful for including CodeMirror >= 5.20 as a git submodule.
Specifically, submodules work on GitHub Pages.

You don't have to trust my build.  I recommend taking upstream CodeMirror,
running \`./build-releases.sh\` yourself (latest version in my
 \`build-releases\` branch) and pushing the tags it creates to your own fork.

build output:
" > build.md
  (
    echo '```bash'
    # Using yarn so pristine installs after `git clean` are fast.
    echo '$ yarn install'
    yarn install

    # yarn lists on top level tons of indirect dependencies.
    # npm lists (even after yarn install) only direct package.json dependencies.
    echo '$ npm list --depth=0'
    npm list --depth=0

    # `install` probably already built it - CodeMirror arranges that via `prepare` script
    # but let's be explicit in case this changes in future.
    echo '$ npm run build'
    npm run build
    echo '```

----

'
  ) 2>&1 | tee -a build.md

  mv README.md README.md~
  cat build.md README.md~ > README.md
  sed -i -e '/lib\/codemirror\.js/d' .gitignore
  git add README.md build-releases.sh yarn.lock .gitignore lib/codemirror.js
  git commit --file=build.md
  git tag $newtag
done
