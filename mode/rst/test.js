(function() {
  var mode = CodeMirror.getMode({}, "rst");
  function MT(name) { test.mode(name, mode, Array.prototype.slice.call(arguments, 1)); }

  MT("inline_em",
     "foo [em *word*] bar ([em *in parens*]) baz");

  MT("inline_strong",
     "foo [strong **word**] bar ([strong **in parens**]) baz");

  var modeWithModeClass = CodeMirror.getMode({addModeClass: true}, "rst");
  function CT(name) { test.mode(name, modeWithModeClass, Array.prototype.slice.call(arguments, 1)); }

  CT("doctest",
     "[m-python >>> print('python')]");
  CT("math_role",
     "[m-rst foo ][m-stex :math:`\pi`][m-rst  bar]");
  CT("math_directive",
     "[m-stex .. math::]",
     "[m-stex     `\pi`]");
})();
