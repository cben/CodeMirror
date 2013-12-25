CodeMirror.multiplexingMode = function(outer /*, others */) {
  // Others should be {open, close, mode [, delimStyle] [, innerStyle] [, textForOuter]} objects
  var others = Array.prototype.slice.call(arguments, 1);
  var n_others = others.length;

  function indexOf(string, pattern, from) {
    if (typeof pattern == "string") return string.indexOf(pattern, from);
    var m = pattern.exec(from ? string.slice(from) : string);
    return m ? m.index + from : -1;
  }

  return {
    startState: function() {
      return {
        outer: CodeMirror.startState(outer),
        outerStyle: '',
        innerActive: null,
        inner: null
      };
    },

    copyState: function(state) {
      return {
        outer: CodeMirror.copyState(outer, state.outer),
        outerStyle: state.outerStyle,
        innerActive: state.innerActive,
        inner: state.innerActive && CodeMirror.copyState(state.innerActive.mode, state.inner)
      };
    },

    token: function(stream, state) {
      function logtoken(mode, stream, state) {
        var p1 = stream.pos;
        var token = mode.token(stream, state);
        var p2 = stream.pos, s = stream.string;
        console.log(mode.name, s.slice(0, p1) + '[' + s.slice(p1, p2) + ']' + s.slice(p2), '->', token);
        return token;
      }

      if (stream.sol()) console.log('\n' + stream.string);
      console.log(state);
      if (!state.innerActive) {
        var cutOff = Infinity, innerActive = null, oldContent = stream.string;
        for (var i = 0; i < n_others; ++i) {
          var other = others[i];
          var found = indexOf(oldContent, other.open, stream.pos);

          if (found != -1) {
            if (found < cutOff) {
              cutOff = found;
              innerActive = other;
            }
          }
        }
        if (cutOff == Infinity) {
          return logtoken(outer, stream, state.outer); //outer.token(stream, state.outer);
        } else if (stream.pos < cutOff) {
          // Not yet entering inner mode but can't see whole line.
          stream.string = oldContent.slice(0, cutOff);
          var outerToken = logtoken(outer, stream, state.outer); //outer.token(stream, state.outer);
          stream.string = oldContent;
          //state.outerStyle = textForOuter ? ' ' + outerToken : '';
          return outerToken;
        } else {
          // Entering inner mode.
          var textForOuter = innerActive.textForOuter || '';
          if (textForOuter) {
            stream.string = oldContent.slice(0, cutOff) + textForOuter;
            var outerStyle = logtoken(outer, stream, state.outer);
            state.outerStyle = outerStyle == null ? '' : ' ' + outerStyle;
            stream.backUp(stream.current().length);
            stream.string = oldContent;
          } else {
            state.outerStyle = '';
          }
          stream.match(innerActive.open) || console.error("FAIL");
          state.innerActive = innerActive;
          state.inner = CodeMirror.startState(other.mode, outer.indent ? outer.indent(state.outer, "") : 0);
          return innerActive.delimStyle + state.outerStyle;
        }
      } else {
        var curInner = state.innerActive, oldContent = stream.string;
        if (!curInner.close && stream.sol()) {
          state.innerActive = state.inner = null;
          return this.token(stream, state);
        }
        var found = curInner.close ? indexOf(oldContent, curInner.close, stream.pos) : -1;
        if (found == stream.pos) {
          stream.match(curInner.close) || console.error("FAIL");
          state.innerActive = state.inner = null;
          return curInner.delimStyle + state.outerStyle;
        }
        if (found > -1) stream.string = oldContent.slice(0, found);
        var innerToken = logtoken(curInner.mode, stream, state.inner); //curInner.mode.token(stream, state.inner);
        if (found > -1) stream.string = oldContent;

        if (curInner.innerStyle) {
          if (innerToken) innerToken = innerToken + ' ' + curInner.innerStyle;
          else innerToken = curInner.innerStyle;
        }

        return innerToken + state.outerStyle;
      }
    },

    indent: function(state, textAfter) {
      var mode = state.innerActive ? state.innerActive.mode : outer;
      if (!mode.indent) return CodeMirror.Pass;
      return mode.indent(state.innerActive ? state.inner : state.outer, textAfter);
    },

    blankLine: function(state) {
      var mode = state.innerActive ? state.innerActive.mode : outer;
      if (mode.blankLine) {
        mode.blankLine(state.innerActive ? state.inner : state.outer);
      }
      if (!state.innerActive) {
        for (var i = 0; i < n_others; ++i) {
          var other = others[i];
          if (other.open === "\n") {
            state.innerActive = other;
            state.inner = CodeMirror.startState(other.mode, mode.indent ? mode.indent(state.outer, "") : 0);
          }
        }
      } else if (state.innerActive.close === "\n") {
        state.innerActive = state.inner = null;
      }
    },

    electricChars: outer.electricChars,

    innerMode: function(state) {
      return state.inner ? {state: state.inner, mode: state.innerActive.mode} : {state: state.outer, mode: outer};
    }
  };
};
