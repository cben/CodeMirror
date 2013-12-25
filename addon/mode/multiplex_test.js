(function() {
  CodeMirror.defineMode("markdown_with_stex", function(){
    var inner = CodeMirror.getMode({}, "stex");
    var outer = CodeMirror.getMode({}, "markdown");

    // This difference in textForOuter between $$..$$ and $..$ is arbitrary,
    // we simply need to test both behaviors.
    var innerOptions = {
      open: '$$',
      close: '$$',
      mode: inner,
      delimStyle: 'delim',
      innerStyle: 'inner'
    };
    var innerOptionsCombining = {
      open: '$',
      close: '$',
      mode: inner,
      delimStyle: 'delim',
      innerStyle: 'inner',
      textForOuter: '~'
    };

    return CodeMirror.multiplexingMode(outer, innerOptions, innerOptionsCombining);
  });

  var mode = CodeMirror.getMode({}, "markdown_with_stex");

  function MT(name) {
    test.mode(
      name,
      mode,
      Array.prototype.slice.call(arguments, 1),
      'multiplexing');
  }

  MT(
    "stexInsideMarkdown",
    "foo [delim $$][inner&tag \\pi][delim $$] bar [delim $$][inner&tag \\pi][delim $$] baz");
  MT(
    "stexInsideMarkdownNoCombine",
    "[strong **Equation: ][delim $$][inner&tag \\pi][delim $$][strong  is beautiful.**]");
  MT(
    "stexLineInsideMarkdownNoCombine",
    "[strong **Equation:]",
    "[delim $$][inner&tag \\pi][delim $$]",
    "[strong is beautiful.**]");
  MT(
    "stexInsideMarkdownCombine",
    "[strong **Equation: ][strong&delim $][strong&inner&tag \\pi][strong&delim $][strong  is beautiful.**]");
  MT(
    "stexLineInsideMarkdownCombine",
    "[strong **XEquation: ]",
    "[strong&delim $][strong&inner&tag \\pi][strong&delim $]",
    "[strong is beautiful.**]");
  MT(
    "stexLineAfterMarkdownHeaderCombine",
    "[header&header1 # Equation]",
    "[delim $][inner&tag \\pi][delim $]");
})();
