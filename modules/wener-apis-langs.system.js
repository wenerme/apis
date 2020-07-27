System.register(['react', 'antd', '@wener/utils', 'he', '@wener/ui'], function (exports) {
	'use strict';
	var React, useCallback, useState, useEffect, Row, Col, Card, message, Button, Alert, Input, Checkbox, isEmptyObject, encode, decode, createSubscriptionContainer;
	return {
		setters: [function (module) {
			React = module.default;
			useCallback = module.useCallback;
			useState = module.useState;
			useEffect = module.useEffect;
		}, function (module) {
			Row = module.Row;
			Col = module.Col;
			Card = module.Card;
			message = module.message;
			Button = module.Button;
			Alert = module.Alert;
			Input = module.Input;
			Checkbox = module.Checkbox;
		}, function (module) {
			isEmptyObject = module.isEmptyObject;
		}, function (module) {
			encode = module.encode;
			decode = module.decode;
		}, function (module) {
			createSubscriptionContainer = module.createSubscriptionContainer;
		}],
		execute: function () {

			var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

			function createCommonjsModule(fn, basedir, module) {
				return module = {
				  path: basedir,
				  exports: {},
				  require: function (path, base) {
			      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			    }
				}, fn(module, module.exports), module.exports;
			}

			function commonjsRequire () {
				throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
			}

			var lib = createCommonjsModule(function (module, exports) {

			  Object.defineProperty(exports, "__esModule", {
			    value: true
			  });

			  var _extends = Object.assign || function (target) {
			    for (var i = 1; i < arguments.length; i++) {
			      var source = arguments[i];

			      for (var key in source) {
			        if (Object.prototype.hasOwnProperty.call(source, key)) {
			          target[key] = source[key];
			        }
			      }
			    }

			    return target;
			  };

			  var _createClass = function () {
			    function defineProperties(target, props) {
			      for (var i = 0; i < props.length; i++) {
			        var descriptor = props[i];
			        descriptor.enumerable = descriptor.enumerable || false;
			        descriptor.configurable = true;
			        if ("value" in descriptor) descriptor.writable = true;
			        Object.defineProperty(target, descriptor.key, descriptor);
			      }
			    }

			    return function (Constructor, protoProps, staticProps) {
			      if (protoProps) defineProperties(Constructor.prototype, protoProps);
			      if (staticProps) defineProperties(Constructor, staticProps);
			      return Constructor;
			    };
			  }();

			  var React$1 = _interopRequireWildcard(React);

			  function _interopRequireWildcard(obj) {
			    if (obj && obj.__esModule) {
			      return obj;
			    } else {
			      var newObj = {};

			      if (obj != null) {
			        for (var key in obj) {
			          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			        }
			      }

			      newObj.default = obj;
			      return newObj;
			    }
			  }

			  function _objectWithoutProperties(obj, keys) {
			    var target = {};

			    for (var i in obj) {
			      if (keys.indexOf(i) >= 0) continue;
			      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			      target[i] = obj[i];
			    }

			    return target;
			  }

			  function _classCallCheck(instance, Constructor) {
			    if (!(instance instanceof Constructor)) {
			      throw new TypeError("Cannot call a class as a function");
			    }
			  }

			  function _possibleConstructorReturn(self, call) {
			    if (!self) {
			      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			    }

			    return call && (typeof call === "object" || typeof call === "function") ? call : self;
			  }

			  function _inherits(subClass, superClass) {
			    if (typeof superClass !== "function" && superClass !== null) {
			      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
			    }

			    subClass.prototype = Object.create(superClass && superClass.prototype, {
			      constructor: {
			        value: subClass,
			        enumerable: false,
			        writable: true,
			        configurable: true
			      }
			    });
			    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
			  }
			  /* global global */


			  var KEYCODE_ENTER = 13;
			  var KEYCODE_TAB = 9;
			  var KEYCODE_BACKSPACE = 8;
			  var KEYCODE_Y = 89;
			  var KEYCODE_Z = 90;
			  var KEYCODE_M = 77;
			  var KEYCODE_PARENS = 57;
			  var KEYCODE_BRACKETS = 219;
			  var KEYCODE_QUOTE = 222;
			  var KEYCODE_BACK_QUOTE = 192;
			  var KEYCODE_ESCAPE = 27;
			  var HISTORY_LIMIT = 100;
			  var HISTORY_TIME_GAP = 3000;
			  var isWindows = 'navigator' in commonjsGlobal && /Win/i.test(navigator.platform);
			  var isMacLike = 'navigator' in commonjsGlobal && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
			  var className = 'npm__react-simple-code-editor__textarea';
			  var cssText =
			  /* CSS */
			  '\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.' + className + ':empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn\'t support \'-webkit-text-fill-color\'\n    * So we use \'color: transparent\' to make the text transparent on IE\n    * Unlike other browsers, it doesn\'t affect caret color in IE\n    */\n  .' + className + ' {\n    color: transparent !important;\n  }\n\n  .' + className + '::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n';

			  var Editor = function (_React$Component) {
			    _inherits(Editor, _React$Component);

			    function Editor() {
			      var _ref;

			      var _temp, _this, _ret;

			      _classCallCheck(this, Editor);

			      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			        args[_key] = arguments[_key];
			      }

			      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			        capture: true
			      }, _this._recordCurrentState = function () {
			        var input = _this._input;
			        if (!input) return; // Save current state of the input

			        var value = input.value,
			            selectionStart = input.selectionStart,
			            selectionEnd = input.selectionEnd;

			        _this._recordChange({
			          value: value,
			          selectionStart: selectionStart,
			          selectionEnd: selectionEnd
			        });
			      }, _this._getLines = function (text, position) {
			        return text.substring(0, position).split('\n');
			      }, _this._recordChange = function (record) {
			        var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			        var _this$_history = _this._history,
			            stack = _this$_history.stack,
			            offset = _this$_history.offset;

			        if (stack.length && offset > -1) {
			          // When something updates, drop the redo operations
			          _this._history.stack = stack.slice(0, offset + 1); // Limit the number of operations to 100

			          var count = _this._history.stack.length;

			          if (count > HISTORY_LIMIT) {
			            var extras = count - HISTORY_LIMIT;
			            _this._history.stack = stack.slice(extras, count);
			            _this._history.offset = Math.max(_this._history.offset - extras, 0);
			          }
			        }

			        var timestamp = Date.now();

			        if (overwrite) {
			          var last = _this._history.stack[_this._history.offset];

			          if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
			            // A previous entry exists and was in short interval
			            // Match the last word in the line
			            var re = /[^a-z0-9]([a-z0-9]+)$/i; // Get the previous line

			            var previous = _this._getLines(last.value, last.selectionStart).pop().match(re); // Get the current line


			            var current = _this._getLines(record.value, record.selectionStart).pop().match(re);

			            if (previous && current && current[1].startsWith(previous[1])) {
			              // The last word of the previous line and current line match
			              // Overwrite previous entry so that undo will remove whole word
			              _this._history.stack[_this._history.offset] = _extends({}, record, {
			                timestamp: timestamp
			              });
			              return;
			            }
			          }
			        } // Add the new operation to the stack


			        _this._history.stack.push(_extends({}, record, {
			          timestamp: timestamp
			        }));

			        _this._history.offset++;
			      }, _this._updateInput = function (record) {
			        var input = _this._input;
			        if (!input) return; // Update values and selection state

			        input.value = record.value;
			        input.selectionStart = record.selectionStart;
			        input.selectionEnd = record.selectionEnd;

			        _this.props.onValueChange(record.value);
			      }, _this._applyEdits = function (record) {
			        // Save last selection state
			        var input = _this._input;
			        var last = _this._history.stack[_this._history.offset];

			        if (last && input) {
			          _this._history.stack[_this._history.offset] = _extends({}, last, {
			            selectionStart: input.selectionStart,
			            selectionEnd: input.selectionEnd
			          });
			        } // Save the changes


			        _this._recordChange(record);

			        _this._updateInput(record);
			      }, _this._undoEdit = function () {
			        var _this$_history2 = _this._history,
			            stack = _this$_history2.stack,
			            offset = _this$_history2.offset; // Get the previous edit

			        var record = stack[offset - 1];

			        if (record) {
			          // Apply the changes and update the offset
			          _this._updateInput(record);

			          _this._history.offset = Math.max(offset - 1, 0);
			        }
			      }, _this._redoEdit = function () {
			        var _this$_history3 = _this._history,
			            stack = _this$_history3.stack,
			            offset = _this$_history3.offset; // Get the next edit

			        var record = stack[offset + 1];

			        if (record) {
			          // Apply the changes and update the offset
			          _this._updateInput(record);

			          _this._history.offset = Math.min(offset + 1, stack.length - 1);
			        }
			      }, _this._handleKeyDown = function (e) {
			        var _this$props = _this.props,
			            tabSize = _this$props.tabSize,
			            insertSpaces = _this$props.insertSpaces,
			            ignoreTabKey = _this$props.ignoreTabKey,
			            onKeyDown = _this$props.onKeyDown;

			        if (onKeyDown) {
			          onKeyDown(e);

			          if (e.defaultPrevented) {
			            return;
			          }
			        }

			        if (e.keyCode === KEYCODE_ESCAPE) {
			          e.target.blur();
			        }

			        var _e$target = e.target,
			            value = _e$target.value,
			            selectionStart = _e$target.selectionStart,
			            selectionEnd = _e$target.selectionEnd;
			        var tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize);

			        if (e.keyCode === KEYCODE_TAB && !ignoreTabKey && _this.state.capture) {
			          // Prevent focus change
			          e.preventDefault();

			          if (e.shiftKey) {
			            // Unindent selected lines
			            var linesBeforeCaret = _this._getLines(value, selectionStart);

			            var startLine = linesBeforeCaret.length - 1;
			            var endLine = _this._getLines(value, selectionEnd).length - 1;
			            var nextValue = value.split('\n').map(function (line, i) {
			              if (i >= startLine && i <= endLine && line.startsWith(tabCharacter)) {
			                return line.substring(tabCharacter.length);
			              }

			              return line;
			            }).join('\n');

			            if (value !== nextValue) {
			              var startLineText = linesBeforeCaret[startLine];

			              _this._applyEdits({
			                value: nextValue,
			                // Move the start cursor if first line in selection was modified
			                // It was modified only if it started with a tab
			                selectionStart: startLineText.startsWith(tabCharacter) ? selectionStart - tabCharacter.length : selectionStart,
			                // Move the end cursor by total number of characters removed
			                selectionEnd: selectionEnd - (value.length - nextValue.length)
			              });
			            }
			          } else if (selectionStart !== selectionEnd) {
			            // Indent selected lines
			            var _linesBeforeCaret = _this._getLines(value, selectionStart);

			            var _startLine = _linesBeforeCaret.length - 1;

			            var _endLine = _this._getLines(value, selectionEnd).length - 1;

			            var _startLineText = _linesBeforeCaret[_startLine];

			            _this._applyEdits({
			              value: value.split('\n').map(function (line, i) {
			                if (i >= _startLine && i <= _endLine) {
			                  return tabCharacter + line;
			                }

			                return line;
			              }).join('\n'),
			              // Move the start cursor by number of characters added in first line of selection
			              // Don't move it if it there was no text before cursor
			              selectionStart: /\S/.test(_startLineText) ? selectionStart + tabCharacter.length : selectionStart,
			              // Move the end cursor by total number of characters added
			              selectionEnd: selectionEnd + tabCharacter.length * (_endLine - _startLine + 1)
			            });
			          } else {
			            var updatedSelection = selectionStart + tabCharacter.length;

			            _this._applyEdits({
			              // Insert tab character at caret
			              value: value.substring(0, selectionStart) + tabCharacter + value.substring(selectionEnd),
			              // Update caret position
			              selectionStart: updatedSelection,
			              selectionEnd: updatedSelection
			            });
			          }
			        } else if (e.keyCode === KEYCODE_BACKSPACE) {
			          var hasSelection = selectionStart !== selectionEnd;
			          var textBeforeCaret = value.substring(0, selectionStart);

			          if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
			            // Prevent default delete behaviour
			            e.preventDefault();

			            var _updatedSelection = selectionStart - tabCharacter.length;

			            _this._applyEdits({
			              // Remove tab character at caret
			              value: value.substring(0, selectionStart - tabCharacter.length) + value.substring(selectionEnd),
			              // Update caret position
			              selectionStart: _updatedSelection,
			              selectionEnd: _updatedSelection
			            });
			          }
			        } else if (e.keyCode === KEYCODE_ENTER) {
			          // Ignore selections
			          if (selectionStart === selectionEnd) {
			            // Get the current line
			            var line = _this._getLines(value, selectionStart).pop();

			            var matches = line.match(/^\s+/);

			            if (matches && matches[0]) {
			              e.preventDefault(); // Preserve indentation on inserting a new line

			              var indent = '\n' + matches[0];

			              var _updatedSelection2 = selectionStart + indent.length;

			              _this._applyEdits({
			                // Insert indentation character at caret
			                value: value.substring(0, selectionStart) + indent + value.substring(selectionEnd),
			                // Update caret position
			                selectionStart: _updatedSelection2,
			                selectionEnd: _updatedSelection2
			              });
			            }
			          }
			        } else if (e.keyCode === KEYCODE_PARENS || e.keyCode === KEYCODE_BRACKETS || e.keyCode === KEYCODE_QUOTE || e.keyCode === KEYCODE_BACK_QUOTE) {
			          var chars = void 0;

			          if (e.keyCode === KEYCODE_PARENS && e.shiftKey) {
			            chars = ['(', ')'];
			          } else if (e.keyCode === KEYCODE_BRACKETS) {
			            if (e.shiftKey) {
			              chars = ['{', '}'];
			            } else {
			              chars = ['[', ']'];
			            }
			          } else if (e.keyCode === KEYCODE_QUOTE) {
			            if (e.shiftKey) {
			              chars = ['"', '"'];
			            } else {
			              chars = ["'", "'"];
			            }
			          } else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) {
			            chars = ['`', '`'];
			          } // If text is selected, wrap them in the characters


			          if (selectionStart !== selectionEnd && chars) {
			            e.preventDefault();

			            _this._applyEdits({
			              value: value.substring(0, selectionStart) + chars[0] + value.substring(selectionStart, selectionEnd) + chars[1] + value.substring(selectionEnd),
			              // Update caret position
			              selectionStart: selectionStart,
			              selectionEnd: selectionEnd + 2
			            });
			          }
			        } else if ((isMacLike ? // Trigger undo with ⌘+Z on Mac
			        e.metaKey && e.keyCode === KEYCODE_Z : // Trigger undo with Ctrl+Z on other platforms
			        e.ctrlKey && e.keyCode === KEYCODE_Z) && !e.shiftKey && !e.altKey) {
			          e.preventDefault();

			          _this._undoEdit();
			        } else if ((isMacLike ? // Trigger redo with ⌘+Shift+Z on Mac
			        e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey : isWindows ? // Trigger redo with Ctrl+Y on Windows
			        e.ctrlKey && e.keyCode === KEYCODE_Y : // Trigger redo with Ctrl+Shift+Z on other platforms
			        e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey) && !e.altKey) {
			          e.preventDefault();

			          _this._redoEdit();
			        } else if (e.keyCode === KEYCODE_M && e.ctrlKey && (isMacLike ? e.shiftKey : true)) {
			          e.preventDefault(); // Toggle capturing tab key so users can focus away

			          _this.setState(function (state) {
			            return {
			              capture: !state.capture
			            };
			          });
			        }
			      }, _this._handleChange = function (e) {
			        var _e$target2 = e.target,
			            value = _e$target2.value,
			            selectionStart = _e$target2.selectionStart,
			            selectionEnd = _e$target2.selectionEnd;

			        _this._recordChange({
			          value: value,
			          selectionStart: selectionStart,
			          selectionEnd: selectionEnd
			        }, true);

			        _this.props.onValueChange(value);
			      }, _this._history = {
			        stack: [],
			        offset: -1
			      }, _temp), _possibleConstructorReturn(_this, _ret);
			    }

			    _createClass(Editor, [{
			      key: 'componentDidMount',
			      value: function componentDidMount() {
			        this._recordCurrentState();
			      }
			    }, {
			      key: 'render',
			      value: function render() {
			        var _this2 = this;

			        var _props = this.props,
			            value = _props.value,
			            style = _props.style,
			            padding = _props.padding,
			            highlight = _props.highlight,
			            textareaId = _props.textareaId,
			            textareaClassName = _props.textareaClassName,
			            autoFocus = _props.autoFocus,
			            disabled = _props.disabled,
			            form = _props.form,
			            maxLength = _props.maxLength,
			            minLength = _props.minLength,
			            name = _props.name,
			            placeholder = _props.placeholder,
			            readOnly = _props.readOnly,
			            required = _props.required,
			            onClick = _props.onClick,
			            onFocus = _props.onFocus,
			            onBlur = _props.onBlur,
			            onKeyUp = _props.onKeyUp,
			            onKeyDown = _props.onKeyDown,
			            onValueChange = _props.onValueChange,
			            tabSize = _props.tabSize,
			            insertSpaces = _props.insertSpaces,
			            ignoreTabKey = _props.ignoreTabKey,
			            preClassName = _props.preClassName,
			            rest = _objectWithoutProperties(_props, ['value', 'style', 'padding', 'highlight', 'textareaId', 'textareaClassName', 'autoFocus', 'disabled', 'form', 'maxLength', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'onClick', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onValueChange', 'tabSize', 'insertSpaces', 'ignoreTabKey', 'preClassName']);

			        var contentStyle = {
			          paddingTop: padding,
			          paddingRight: padding,
			          paddingBottom: padding,
			          paddingLeft: padding
			        };
			        var highlighted = highlight(value);
			        return React$1.createElement('div', _extends({}, rest, {
			          style: _extends({}, styles.container, style)
			        }), React$1.createElement('textarea', {
			          ref: function ref(c) {
			            return _this2._input = c;
			          },
			          style: _extends({}, styles.editor, styles.textarea, contentStyle),
			          className: className + (textareaClassName ? ' ' + textareaClassName : ''),
			          id: textareaId,
			          value: value,
			          onChange: this._handleChange,
			          onKeyDown: this._handleKeyDown,
			          onClick: onClick,
			          onKeyUp: onKeyUp,
			          onFocus: onFocus,
			          onBlur: onBlur,
			          disabled: disabled,
			          form: form,
			          maxLength: maxLength,
			          minLength: minLength,
			          name: name,
			          placeholder: placeholder,
			          readOnly: readOnly,
			          required: required,
			          autoFocus: autoFocus,
			          autoCapitalize: 'off',
			          autoComplete: 'off',
			          autoCorrect: 'off',
			          spellCheck: false,
			          'data-gramm': false
			        }), React$1.createElement('pre', _extends({
			          className: preClassName,
			          'aria-hidden': 'true',
			          style: _extends({}, styles.editor, styles.highlight, contentStyle)
			        }, typeof highlighted === 'string' ? {
			          dangerouslySetInnerHTML: {
			            __html: highlighted + '<br />'
			          }
			        } : {
			          children: highlighted
			        })), React$1.createElement('style', {
			          type: 'text/css',
			          dangerouslySetInnerHTML: {
			            __html: cssText
			          }
			        }));
			      }
			    }, {
			      key: 'session',
			      get: function get() {
			        return {
			          history: this._history
			        };
			      },
			      set: function set(session) {
			        this._history = session.history;
			      }
			    }]);

			    return Editor;
			  }(React$1.Component);

			  Editor.defaultProps = {
			    tabSize: 2,
			    insertSpaces: true,
			    ignoreTabKey: false,
			    padding: 0
			  };
			  exports.default = Editor;
			  var styles = {
			    container: {
			      position: 'relative',
			      textAlign: 'left',
			      boxSizing: 'border-box',
			      padding: 0,
			      overflow: 'hidden'
			    },
			    textarea: {
			      position: 'absolute',
			      top: 0,
			      left: 0,
			      height: '100%',
			      width: '100%',
			      resize: 'none',
			      color: 'inherit',
			      overflow: 'hidden',
			      MozOsxFontSmoothing: 'grayscale',
			      WebkitFontSmoothing: 'antialiased',
			      WebkitTextFillColor: 'transparent'
			    },
			    highlight: {
			      position: 'relative',
			      pointerEvents: 'none'
			    },
			    editor: {
			      margin: 0,
			      border: 0,
			      background: 'none',
			      boxSizing: 'inherit',
			      display: 'inherit',
			      fontFamily: 'inherit',
			      fontSize: 'inherit',
			      fontStyle: 'inherit',
			      fontVariantLigatures: 'inherit',
			      fontWeight: 'inherit',
			      letterSpacing: 'inherit',
			      lineHeight: 'inherit',
			      tabSize: 'inherit',
			      textIndent: 'inherit',
			      textRendering: 'inherit',
			      textTransform: 'inherit',
			      whiteSpace: 'pre-wrap',
			      wordBreak: 'keep-all',
			      overflowWrap: 'break-word'
			    }
			  };
			  module.exports = exports.default;
			  module.exports.default = exports.default;
			});

			function n(n) {
			  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) r[e - 1] = arguments[e];

			  if ("production" !== process.env.NODE_ENV) {
			    var i = L[n],
			        o = i ? "function" == typeof i ? i.apply(null, r) : i : "unknown error nr: " + n;
			    throw Error("[Immer] " + o);
			  }

			  throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
			}

			function t(n) {
			  return !!n && !!n[G];
			}

			function r(n) {
			  return !!n && (function (n) {
			    if (!n || "object" != typeof n) return !1;
			    var t = Object.getPrototypeOf(n);
			    return !t || t === Object.prototype;
			  }(n) || Array.isArray(n) || !!n[B] || !!n.constructor[B] || c(n) || s(n));
			}

			function i(n, t, r) {
			  void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : Q)(n).forEach(function (r) {
			    return t(r, n[r], n);
			  }) : n.forEach(function (r, e) {
			    return t(e, r, n);
			  });
			}

			function o(n) {
			  var t = n[G];
			  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : c(n) ? 2 : s(n) ? 3 : 0;
			}

			function u(n, t) {
			  return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
			}

			function a(n, t) {
			  return 2 === o(n) ? n.get(t) : n[t];
			}

			function f(n, t) {
			  return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
			}

			function c(n) {
			  return U && n instanceof Map;
			}

			function s(n) {
			  return W && n instanceof Set;
			}

			function v(n) {
			  return n.o || n.t;
			}

			function p(t, r) {
			  if (void 0 === r && (r = !1), Array.isArray(t)) return t.slice();
			  var e = Object.create(Object.getPrototypeOf(t));
			  return i(t, function (i) {
			    if (i !== G) {
			      var o = Object.getOwnPropertyDescriptor(t, i),
			          u = o.value;
			      o.get && (r || n(1), u = o.get.call(t)), o.enumerable ? e[i] = u : Object.defineProperty(e, i, {
			        value: u,
			        writable: !0,
			        configurable: !0
			      });
			    }
			  }), e;
			}

			function d(n, e) {
			  t(n) || h(n) || !r(n) || (o(n) > 1 && (n.set = n.add = n.clear = n.delete = l), Object.freeze(n), e && i(n, function (n, t) {
			    return d(t, !0);
			  }, !0));
			}

			function l() {
			  n(2);
			}

			function h(n) {
			  return null == n || "object" != typeof n || Object.isFrozen(n);
			}

			function y(t) {
			  var r = V[t];
			  return r || n("production" !== process.env.NODE_ENV ? 18 : 19, t), r;
			}

			function m() {
			  return "production" === process.env.NODE_ENV || K || n(0), K;
			}

			function _(n, t) {
			  t && (y("Patches"), n.u = [], n.s = [], n.v = t);
			}

			function j(n) {
			  O(n), n.p.forEach(w), n.p = null;
			}

			function O(n) {
			  n === K && (K = n.l);
			}

			function g(n) {
			  return K = {
			    p: [],
			    l: K,
			    h: n,
			    m: !0,
			    _: 0
			  };
			}

			function w(n) {
			  var t = n[G];
			  0 === t.i || 1 === t.i ? t.j() : t.O = !0;
			}

			function S(t, e) {
			  e._ = e.p.length;
			  var i = e.p[0],
			      o = void 0 !== t && t !== i;
			  return e.h.g || y("ES5").S(e, t, o), o ? (i[G].P && (j(e), n(4)), r(t) && (t = P(e, t), e.l || A(e, t)), e.u && y("Patches").M(i[G], t, e.u, e.s)) : t = P(e, i, []), j(e), e.u && e.v(e.u, e.s), t !== q ? t : void 0;
			}

			function P(n, t, r) {
			  if (h(t)) return t;
			  var e = t[G];
			  if (!e) return i(t, function (i, o) {
			    return M(n, e, t, i, o, r);
			  }, !0), t;
			  if (e.A !== n) return t;
			  if (!e.P) return A(n, e.t, !0), e.t;

			  if (!e.I) {
			    e.I = !0, e.A._--;
			    var o = 4 === e.i || 5 === e.i ? e.o = p(e.k, !0) : e.o;
			    i(o, function (t, i) {
			      return M(n, e, o, t, i, r);
			    }), A(n, o, !1), r && n.u && y("Patches").R(e, r, n.u, n.s);
			  }

			  return e.o;
			}

			function M(e, i, c, s, v, p) {
			  if ("production" !== process.env.NODE_ENV && v === c && n(5), t(v)) {
			    var d = P(e, v, p && i && 3 !== i.i && !u(i.D, s) ? p.concat(s) : void 0);
			    if (h = s, y = d, 2 === (b = o(l = c)) ? l.set(h, y) : 3 === b ? (l.delete(h), l.add(y)) : l[h] = y, !t(d)) return;
			    e.m = !1;
			  }

			  var l, h, y, b;

			  if ((!i || !f(v, a(i.t, s))) && r(v)) {
			    if (!e.h.N && e._ < 1) return;
			    P(e, v), i && i.A.l || A(e, v);
			  }
			}

			function A(n, t, r) {
			  void 0 === r && (r = !1), n.h.N && n.m && d(t, r);
			}

			function x(n, t) {
			  var r = n[G],
			      e = Reflect.getOwnPropertyDescriptor(r ? v(r) : n, t);
			  return e && e.value;
			}

			function z(n) {
			  if (!n.P) {
			    if (n.P = !0, 0 === n.i || 1 === n.i) {
			      var t = n.o = p(n.t);
			      i(n.p, function (n, r) {
			        t[n] = r;
			      }), n.p = void 0;
			    }

			    n.l && z(n.l);
			  }
			}

			function I(n) {
			  n.o || (n.o = p(n.t));
			}

			function E(n, t, r) {
			  var e = c(t) ? y("MapSet").T(t, r) : s(t) ? y("MapSet").F(t, r) : n.g ? function (n, t) {
			    var r = Array.isArray(n),
			        e = {
			      i: r ? 1 : 0,
			      A: t ? t.A : m(),
			      P: !1,
			      I: !1,
			      D: {},
			      l: t,
			      t: n,
			      k: null,
			      p: {},
			      o: null,
			      j: null,
			      C: !1
			    },
			        i = e,
			        o = Y;
			    r && (i = [e], o = Z);
			    var u = Proxy.revocable(i, o),
			        a = u.revoke,
			        f = u.proxy;
			    return e.k = f, e.j = a, f;
			  }(t, r) : y("ES5").J(t, r);
			  return (r ? r.A : m()).p.push(e), e;
			}

			var J,
			    K,
			    $ = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
			    U = "undefined" != typeof Map,
			    W = "undefined" != typeof Set,
			    X = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
			    q = $ ? Symbol("immer-nothing") : ((J = {})["immer-nothing"] = !0, J),
			    B = $ ? Symbol("immer-draftable") : "__$immer_draftable",
			    G = $ ? Symbol("immer-state") : "__$immer_state",
			    L = {
			  0: "Illegal state",
			  1: "Immer drafts cannot have computed properties",
			  2: "This object has been frozen and should not be mutated",
			  3: function (n) {
			    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
			  },
			  4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
			  5: "Immer forbids circular references",
			  6: "The first or second argument to `produce` must be a function",
			  7: "The third argument to `produce` must be a function or undefined",
			  8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
			  9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
			  10: "The given draft is already finalized",
			  11: "Object.defineProperty() cannot be used on an Immer draft",
			  12: "Object.setPrototypeOf() cannot be used on an Immer draft",
			  13: "Immer only supports deleting array indices",
			  14: "Immer only supports setting array indices and the 'length' property",
			  15: function (n) {
			    return "Cannot apply patch, path doesn't resolve: " + n;
			  },
			  16: 'Sets cannot have "replace" patches.',
			  17: function (n) {
			    return "Unsupported patch operation: " + n;
			  },
			  18: function (n) {
			    return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
			  },
			  19: function (n) {
			    return "plugin not loaded: " + n;
			  },
			  20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available"
			},
			    Q = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
			  return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
			} : Object.getOwnPropertyNames,
			    V = {},
			    Y = {
			  get: function (n, t) {
			    if (t === G) return n;
			    var e = n.p;
			    if (!n.P && u(e, t)) return e[t];
			    var i = v(n)[t];
			    if (n.I || !r(i)) return i;

			    if (n.P) {
			      if (i !== x(n.t, t)) return i;
			      e = n.o;
			    }

			    return e[t] = E(n.A.h, i, n);
			  },
			  has: function (n, t) {
			    return t in v(n);
			  },
			  ownKeys: function (n) {
			    return Reflect.ownKeys(v(n));
			  },
			  set: function (n, t, r) {
			    if (!n.P) {
			      var e = x(n.t, t);
			      if (r ? f(e, r) || r === n.p[t] : f(e, r) && t in n.t) return !0;
			      I(n), z(n);
			    }

			    return n.D[t] = !0, n.o[t] = r, !0;
			  },
			  deleteProperty: function (n, t) {
			    return void 0 !== x(n.t, t) || t in n.t ? (n.D[t] = !1, I(n), z(n)) : n.D[t] && delete n.D[t], n.o && delete n.o[t], !0;
			  },
			  getOwnPropertyDescriptor: function (n, t) {
			    var r = v(n),
			        e = Reflect.getOwnPropertyDescriptor(r, t);
			    return e && (e.writable = !0, e.configurable = 1 !== n.i || "length" !== t), e;
			  },
			  defineProperty: function () {
			    n(11);
			  },
			  getPrototypeOf: function (n) {
			    return Object.getPrototypeOf(n.t);
			  },
			  setPrototypeOf: function () {
			    n(12);
			  }
			},
			    Z = {};
			i(Y, function (n, t) {
			  Z[n] = function () {
			    return arguments[0] = arguments[0][0], t.apply(this, arguments);
			  };
			}), Z.deleteProperty = function (t, r) {
			  return "production" !== process.env.NODE_ENV && isNaN(parseInt(r)) && n(13), Y.deleteProperty.call(this, t[0], r);
			}, Z.set = function (t, r, e) {
			  return "production" !== process.env.NODE_ENV && "length" !== r && isNaN(parseInt(r)) && n(14), Y.set.call(this, t[0], r, e, t[0]);
			};

			var nn = function () {
			  function e(n) {
			    this.g = X, this.N = "production" !== process.env.NODE_ENV, "boolean" == typeof (null == n ? void 0 : n.useProxies) && this.setUseProxies(n.useProxies), "boolean" == typeof (null == n ? void 0 : n.autoFreeze) && this.setAutoFreeze(n.autoFreeze), this.produce = this.produce.bind(this), this.produceWithPatches = this.produceWithPatches.bind(this);
			  }

			  var i = e.prototype;
			  return i.produce = function (t, e, i) {
			    if ("function" == typeof t && "function" != typeof e) {
			      var o = e;
			      e = t;
			      var u = this;
			      return function (n) {
			        var t = this;
			        void 0 === n && (n = o);

			        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];

			        return u.produce(n, function (n) {
			          var r;
			          return (r = e).call.apply(r, [t, n].concat(i));
			        });
			      };
			    }

			    var a;

			    if ("function" != typeof e && n(6), void 0 !== i && "function" != typeof i && n(7), r(t)) {
			      var f = g(this),
			          c = E(this, t, void 0),
			          s = !0;

			      try {
			        a = e(c), s = !1;
			      } finally {
			        s ? j(f) : O(f);
			      }

			      return "undefined" != typeof Promise && a instanceof Promise ? a.then(function (n) {
			        return _(f, i), S(n, f);
			      }, function (n) {
			        throw j(f), n;
			      }) : (_(f, i), S(a, f));
			    }

			    if ((a = e(t)) !== q) return void 0 === a && (a = t), this.N && d(a, !0), a;
			  }, i.produceWithPatches = function (n, t) {
			    var r,
			        e,
			        i = this;
			    return "function" == typeof n ? function (t) {
			      for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) e[o - 1] = arguments[o];

			      return i.produceWithPatches(t, function (t) {
			        return n.apply(void 0, [t].concat(e));
			      });
			    } : [this.produce(n, t, function (n, t) {
			      r = n, e = t;
			    }), r, e];
			  }, i.createDraft = function (t) {
			    r(t) || n(8);
			    var e = g(this),
			        i = E(this, t, void 0);
			    return i[G].C = !0, O(e), i;
			  }, i.finishDraft = function (t, r) {
			    var e = t && t[G];
			    "production" !== process.env.NODE_ENV && (e && e.C || n(9), e.I && n(10));
			    var i = e.A;
			    return _(i, r), S(void 0, i);
			  }, i.setAutoFreeze = function (n) {
			    this.N = n;
			  }, i.setUseProxies = function (t) {
			    X || n(20), this.g = t;
			  }, i.applyPatches = function (n, r) {
			    var e;

			    for (e = r.length - 1; e >= 0; e--) {
			      var i = r[e];

			      if (0 === i.path.length && "replace" === i.op) {
			        n = i.value;
			        break;
			      }
			    }

			    var o = y("Patches").U;
			    return t(n) ? o(n, r) : this.produce(n, function (n) {
			      return o(n, r.slice(e + 1));
			    });
			  }, e;
			}(),
			    tn = new nn(),
			    rn = tn.produce,
			    en = tn.produceWithPatches.bind(tn),
			    on = tn.setAutoFreeze.bind(tn),
			    un = tn.setUseProxies.bind(tn),
			    an = tn.applyPatches.bind(tn),
			    fn = tn.createDraft.bind(tn),
			    cn = tn.finishDraft.bind(tn);

			function u$1(t) {
			  var i = useState(t),
			      u = i[1];
			  return [i[0], useCallback(function (n) {
			    u(rn(n));
			  }, [])];
			}

			var components_1 = createCommonjsModule(function (module) {
			  var components = {
			    "core": {
			      "meta": {
			        "path": "components/prism-core.js",
			        "option": "mandatory"
			      },
			      "core": "Core"
			    },
			    "themes": {
			      "meta": {
			        "path": "themes/{id}.css",
			        "link": "index.html?theme={id}",
			        "exclusive": true
			      },
			      "prism": {
			        "title": "Default",
			        "option": "default"
			      },
			      "prism-dark": "Dark",
			      "prism-funky": "Funky",
			      "prism-okaidia": {
			        "title": "Okaidia",
			        "owner": "ocodia"
			      },
			      "prism-twilight": {
			        "title": "Twilight",
			        "owner": "remybach"
			      },
			      "prism-coy": {
			        "title": "Coy",
			        "owner": "tshedor"
			      },
			      "prism-solarizedlight": {
			        "title": "Solarized Light",
			        "owner": "hectormatos2011 "
			      },
			      "prism-tomorrow": {
			        "title": "Tomorrow Night",
			        "owner": "Rosey"
			      }
			    },
			    "languages": {
			      "meta": {
			        "path": "components/prism-{id}",
			        "noCSS": true,
			        "examplesPath": "examples/prism-{id}",
			        "addCheckAll": true
			      },
			      "markup": {
			        "title": "Markup",
			        "alias": ["html", "xml", "svg", "mathml"],
			        "aliasTitles": {
			          "html": "HTML",
			          "xml": "XML",
			          "svg": "SVG",
			          "mathml": "MathML"
			        },
			        "option": "default"
			      },
			      "css": {
			        "title": "CSS",
			        "option": "default",
			        "modify": "markup"
			      },
			      "clike": {
			        "title": "C-like",
			        "option": "default"
			      },
			      "javascript": {
			        "title": "JavaScript",
			        "require": "clike",
			        "modify": "markup",
			        "alias": "js",
			        "option": "default"
			      },
			      "abap": {
			        "title": "ABAP",
			        "owner": "dellagustin"
			      },
			      "abnf": {
			        "title": "Augmented Backus–Naur form",
			        "owner": "RunDevelopment"
			      },
			      "actionscript": {
			        "title": "ActionScript",
			        "require": "javascript",
			        "modify": "markup",
			        "owner": "Golmote"
			      },
			      "ada": {
			        "title": "Ada",
			        "owner": "Lucretia"
			      },
			      "antlr4": {
			        "title": "ANTLR4",
			        "alias": "g4",
			        "owner": "RunDevelopment"
			      },
			      "apacheconf": {
			        "title": "Apache Configuration",
			        "owner": "GuiTeK"
			      },
			      "apl": {
			        "title": "APL",
			        "owner": "ngn"
			      },
			      "applescript": {
			        "title": "AppleScript",
			        "owner": "Golmote"
			      },
			      "aql": {
			        "title": "AQL",
			        "owner": "RunDevelopment"
			      },
			      "arduino": {
			        "title": "Arduino",
			        "require": "cpp",
			        "owner": "eisbehr-"
			      },
			      "arff": {
			        "title": "ARFF",
			        "owner": "Golmote"
			      },
			      "asciidoc": {
			        "alias": "adoc",
			        "title": "AsciiDoc",
			        "owner": "Golmote"
			      },
			      "asm6502": {
			        "title": "6502 Assembly",
			        "owner": "kzurawel"
			      },
			      "aspnet": {
			        "title": "ASP.NET (C#)",
			        "require": ["markup", "csharp"],
			        "owner": "nauzilus"
			      },
			      "autohotkey": {
			        "title": "AutoHotkey",
			        "owner": "aviaryan"
			      },
			      "autoit": {
			        "title": "AutoIt",
			        "owner": "Golmote"
			      },
			      "bash": {
			        "title": "Bash",
			        "alias": "shell",
			        "aliasTitles": {
			          "shell": "Shell"
			        },
			        "owner": "zeitgeist87"
			      },
			      "basic": {
			        "title": "BASIC",
			        "owner": "Golmote"
			      },
			      "batch": {
			        "title": "Batch",
			        "owner": "Golmote"
			      },
			      "bbcode": {
			        "title": "BBcode",
			        "alias": "shortcode",
			        "aliasTitles": {
			          "shortcode": "Shortcode"
			        },
			        "owner": "RunDevelopment"
			      },
			      "bison": {
			        "title": "Bison",
			        "require": "c",
			        "owner": "Golmote"
			      },
			      "bnf": {
			        "title": "Backus–Naur form",
			        "alias": "rbnf",
			        "aliasTitles": {
			          "rbnf": "Routing Backus–Naur form"
			        },
			        "owner": "RunDevelopment"
			      },
			      "brainfuck": {
			        "title": "Brainfuck",
			        "owner": "Golmote"
			      },
			      "brightscript": {
			        "title": "BrightScript",
			        "owner": "RunDevelopment"
			      },
			      "bro": {
			        "title": "Bro",
			        "owner": "wayward710"
			      },
			      "c": {
			        "title": "C",
			        "require": "clike",
			        "owner": "zeitgeist87"
			      },
			      "concurnas": {
			        "title": "Concurnas",
			        "alias": "conc",
			        "owner": "jasontatton"
			      },
			      "csharp": {
			        "title": "C#",
			        "require": "clike",
			        "alias": ["cs", "dotnet"],
			        "owner": "mvalipour"
			      },
			      "cpp": {
			        "title": "C++",
			        "require": "c",
			        "owner": "zeitgeist87"
			      },
			      "cil": {
			        "title": "CIL",
			        "owner": "sbrl"
			      },
			      "coffeescript": {
			        "title": "CoffeeScript",
			        "require": "javascript",
			        "alias": "coffee",
			        "owner": "R-osey"
			      },
			      "cmake": {
			        "title": "CMake",
			        "owner": "mjrogozinski"
			      },
			      "clojure": {
			        "title": "Clojure",
			        "owner": "troglotit"
			      },
			      "crystal": {
			        "title": "Crystal",
			        "require": "ruby",
			        "owner": "MakeNowJust"
			      },
			      "csp": {
			        "title": "Content-Security-Policy",
			        "owner": "ScottHelme"
			      },
			      "css-extras": {
			        "title": "CSS Extras",
			        "require": "css",
			        "modify": "css",
			        "owner": "milesj"
			      },
			      "d": {
			        "title": "D",
			        "require": "clike",
			        "owner": "Golmote"
			      },
			      "dart": {
			        "title": "Dart",
			        "require": "clike",
			        "owner": "Golmote"
			      },
			      "dax": {
			        "title": "DAX",
			        "owner": "peterbud"
			      },
			      "diff": {
			        "title": "Diff",
			        "owner": "uranusjr"
			      },
			      "django": {
			        "title": "Django/Jinja2",
			        "require": "markup-templating",
			        "alias": "jinja2",
			        "owner": "romanvm"
			      },
			      "dns-zone-file": {
			        "title": "DNS zone file",
			        "owner": "RunDevelopment",
			        "alias": "dns-zone"
			      },
			      "docker": {
			        "title": "Docker",
			        "alias": "dockerfile",
			        "owner": "JustinBeckwith"
			      },
			      "ebnf": {
			        "title": "Extended Backus–Naur form",
			        "owner": "RunDevelopment"
			      },
			      "eiffel": {
			        "title": "Eiffel",
			        "owner": "Conaclos"
			      },
			      "ejs": {
			        "title": "EJS",
			        "require": ["javascript", "markup-templating"],
			        "owner": "RunDevelopment"
			      },
			      "elixir": {
			        "title": "Elixir",
			        "owner": "Golmote"
			      },
			      "elm": {
			        "title": "Elm",
			        "owner": "zwilias"
			      },
			      "etlua": {
			        "title": "Embedded Lua templating",
			        "require": ["lua", "markup-templating"],
			        "owner": "RunDevelopment"
			      },
			      "erb": {
			        "title": "ERB",
			        "require": ["ruby", "markup-templating"],
			        "owner": "Golmote"
			      },
			      "erlang": {
			        "title": "Erlang",
			        "owner": "Golmote"
			      },
			      "excel-formula": {
			        "title": "Excel Formula",
			        "alias": ["xlsx", "xls"],
			        "owner": "RunDevelopment"
			      },
			      "fsharp": {
			        "title": "F#",
			        "require": "clike",
			        "owner": "simonreynolds7"
			      },
			      "factor": {
			        "title": "Factor",
			        "owner": "catb0t"
			      },
			      "firestore-security-rules": {
			        "title": "Firestore security rules",
			        "require": "clike",
			        "owner": "RunDevelopment"
			      },
			      "flow": {
			        "title": "Flow",
			        "require": "javascript",
			        "owner": "Golmote"
			      },
			      "fortran": {
			        "title": "Fortran",
			        "owner": "Golmote"
			      },
			      "ftl": {
			        "title": "FreeMarker Template Language",
			        "require": "markup-templating",
			        "owner": "RunDevelopment"
			      },
			      "gcode": {
			        "title": "G-code",
			        "owner": "RunDevelopment"
			      },
			      "gdscript": {
			        "title": "GDScript",
			        "owner": "RunDevelopment"
			      },
			      "gedcom": {
			        "title": "GEDCOM",
			        "owner": "Golmote"
			      },
			      "gherkin": {
			        "title": "Gherkin",
			        "owner": "hason"
			      },
			      "git": {
			        "title": "Git",
			        "owner": "lgiraudel"
			      },
			      "glsl": {
			        "title": "GLSL",
			        "require": "clike",
			        "owner": "Golmote"
			      },
			      "gml": {
			        "title": "GameMaker Language",
			        "alias": "gamemakerlanguage",
			        "require": "clike",
			        "owner": "LiarOnce"
			      },
			      "go": {
			        "title": "Go",
			        "require": "clike",
			        "owner": "arnehormann"
			      },
			      "graphql": {
			        "title": "GraphQL",
			        "owner": "Golmote"
			      },
			      "groovy": {
			        "title": "Groovy",
			        "require": "clike",
			        "owner": "robfletcher"
			      },
			      "haml": {
			        "title": "Haml",
			        "require": "ruby",
			        "optional": ["css", "css-extras", "coffeescript", "erb", "javascript", "less", "markdown", "scss", "textile"],
			        "owner": "Golmote"
			      },
			      "handlebars": {
			        "title": "Handlebars",
			        "require": "markup-templating",
			        "owner": "Golmote"
			      },
			      "haskell": {
			        "title": "Haskell",
			        "alias": "hs",
			        "owner": "bholst"
			      },
			      "haxe": {
			        "title": "Haxe",
			        "require": "clike",
			        "owner": "Golmote"
			      },
			      "hcl": {
			        "title": "HCL",
			        "owner": "outsideris"
			      },
			      "http": {
			        "title": "HTTP",
			        "optional": ["css", "javascript", "json", "markup"],
			        "owner": "danielgtaylor"
			      },
			      "hpkp": {
			        "title": "HTTP Public-Key-Pins",
			        "owner": "ScottHelme"
			      },
			      "hsts": {
			        "title": "HTTP Strict-Transport-Security",
			        "owner": "ScottHelme"
			      },
			      "ichigojam": {
			        "title": "IchigoJam",
			        "owner": "BlueCocoa"
			      },
			      "icon": {
			        "title": "Icon",
			        "owner": "Golmote"
			      },
			      "inform7": {
			        "title": "Inform 7",
			        "owner": "Golmote"
			      },
			      "ini": {
			        "title": "Ini",
			        "owner": "aviaryan"
			      },
			      "io": {
			        "title": "Io",
			        "owner": "AlesTsurko"
			      },
			      "j": {
			        "title": "J",
			        "owner": "Golmote"
			      },
			      "java": {
			        "title": "Java",
			        "require": "clike",
			        "owner": "sherblot"
			      },
			      "javadoc": {
			        "title": "JavaDoc",
			        "require": ["markup", "java", "javadoclike"],
			        "modify": "java",
			        "optional": "scala",
			        "owner": "RunDevelopment"
			      },
			      "javadoclike": {
			        "title": "JavaDoc-like",
			        "modify": ["java", "javascript", "php"],
			        "owner": "RunDevelopment"
			      },
			      "javastacktrace": {
			        "title": "Java stack trace",
			        "owner": "RunDevelopment"
			      },
			      "jolie": {
			        "title": "Jolie",
			        "require": "clike",
			        "owner": "thesave"
			      },
			      "jq": {
			        "title": "JQ",
			        "owner": "RunDevelopment"
			      },
			      "jsdoc": {
			        "title": "JSDoc",
			        "require": ["javascript", "javadoclike"],
			        "modify": "javascript",
			        "optional": ["actionscript", "coffeescript"],
			        "owner": "RunDevelopment"
			      },
			      "js-extras": {
			        "title": "JS Extras",
			        "require": "javascript",
			        "modify": "javascript",
			        "optional": ["actionscript", "coffeescript", "flow", "n4js", "typescript"],
			        "owner": "RunDevelopment"
			      },
			      "js-templates": {
			        "title": "JS Templates",
			        "require": "javascript",
			        "modify": "javascript",
			        "optional": ["css", "css-extras", "graphql", "markdown", "markup"],
			        "owner": "RunDevelopment"
			      },
			      "json": {
			        "title": "JSON",
			        "owner": "CupOfTea696"
			      },
			      "jsonp": {
			        "title": "JSONP",
			        "require": "json",
			        "owner": "RunDevelopment"
			      },
			      "json5": {
			        "title": "JSON5",
			        "require": "json",
			        "owner": "RunDevelopment"
			      },
			      "julia": {
			        "title": "Julia",
			        "owner": "cdagnino"
			      },
			      "keyman": {
			        "title": "Keyman",
			        "owner": "mcdurdin"
			      },
			      "kotlin": {
			        "title": "Kotlin",
			        "require": "clike",
			        "owner": "Golmote"
			      },
			      "latex": {
			        "title": "LaTeX",
			        "alias": ["tex", "context"],
			        "aliasTitles": {
			          "tex": "TeX",
			          "context": "ConTeXt"
			        },
			        "owner": "japborst"
			      },
			      "latte": {
			        "title": "Latte",
			        "require": ["clike", "markup-templating", "php"],
			        "owner": "nette"
			      },
			      "less": {
			        "title": "Less",
			        "require": "css",
			        "optional": "css-extras",
			        "owner": "Golmote"
			      },
			      "lilypond": {
			        "title": "LilyPond",
			        "require": "scheme",
			        "alias": "ly",
			        "owner": "RunDevelopment"
			      },
			      "liquid": {
			        "title": "Liquid",
			        "owner": "cinhtau"
			      },
			      "lisp": {
			        "title": "Lisp",
			        "alias": ["emacs", "elisp", "emacs-lisp"],
			        "owner": "JuanCaicedo"
			      },
			      "livescript": {
			        "title": "LiveScript",
			        "owner": "Golmote"
			      },
			      "llvm": {
			        "title": "LLVM IR",
			        "owner": "porglezomp"
			      },
			      "lolcode": {
			        "title": "LOLCODE",
			        "owner": "Golmote"
			      },
			      "lua": {
			        "title": "Lua",
			        "owner": "Golmote"
			      },
			      "makefile": {
			        "title": "Makefile",
			        "owner": "Golmote"
			      },
			      "markdown": {
			        "title": "Markdown",
			        "require": "markup",
			        "alias": "md",
			        "owner": "Golmote"
			      },
			      "markup-templating": {
			        "title": "Markup templating",
			        "require": "markup",
			        "owner": "Golmote"
			      },
			      "matlab": {
			        "title": "MATLAB",
			        "owner": "Golmote"
			      },
			      "mel": {
			        "title": "MEL",
			        "owner": "Golmote"
			      },
			      "mizar": {
			        "title": "Mizar",
			        "owner": "Golmote"
			      },
			      "monkey": {
			        "title": "Monkey",
			        "owner": "Golmote"
			      },
			      "moonscript": {
			        "title": "MoonScript",
			        "alias": "moon",
			        "owner": "RunDevelopment"
			      },
			      "n1ql": {
			        "title": "N1QL",
			        "owner": "TMWilds"
			      },
			      "n4js": {
			        "title": "N4JS",
			        "require": "javascript",
			        "optional": "jsdoc",
			        "alias": "n4jsd",
			        "owner": "bsmith-n4"
			      },
			      "nand2tetris-hdl": {
			        "title": "Nand To Tetris HDL",
			        "owner": "stephanmax"
			      },
			      "nasm": {
			        "title": "NASM",
			        "owner": "rbmj"
			      },
			      "neon": {
			        "title": "NEON",
			        "owner": "nette"
			      },
			      "nginx": {
			        "title": "nginx",
			        "owner": "westonganger",
			        "require": "clike"
			      },
			      "nim": {
			        "title": "Nim",
			        "owner": "Golmote"
			      },
			      "nix": {
			        "title": "Nix",
			        "owner": "Golmote"
			      },
			      "nsis": {
			        "title": "NSIS",
			        "owner": "idleberg"
			      },
			      "objectivec": {
			        "title": "Objective-C",
			        "require": "c",
			        "owner": "uranusjr"
			      },
			      "ocaml": {
			        "title": "OCaml",
			        "owner": "Golmote"
			      },
			      "opencl": {
			        "title": "OpenCL",
			        "require": "c",
			        "modify": ["c", "cpp"],
			        "owner": "Milania1"
			      },
			      "oz": {
			        "title": "Oz",
			        "owner": "Golmote"
			      },
			      "parigp": {
			        "title": "PARI/GP",
			        "owner": "Golmote"
			      },
			      "parser": {
			        "title": "Parser",
			        "require": "markup",
			        "owner": "Golmote"
			      },
			      "pascal": {
			        "title": "Pascal",
			        "alias": "objectpascal",
			        "aliasTitles": {
			          "objectpascal": "Object Pascal"
			        },
			        "owner": "Golmote"
			      },
			      "pascaligo": {
			        "title": "Pascaligo",
			        "owner": "DefinitelyNotAGoat"
			      },
			      "pcaxis": {
			        "title": "PC-Axis",
			        "alias": "px",
			        "owner": "RunDevelopment"
			      },
			      "perl": {
			        "title": "Perl",
			        "owner": "Golmote"
			      },
			      "php": {
			        "title": "PHP",
			        "require": ["clike", "markup-templating"],
			        "owner": "milesj"
			      },
			      "phpdoc": {
			        "title": "PHPDoc",
			        "require": ["php", "javadoclike"],
			        "modify": "php",
			        "owner": "RunDevelopment"
			      },
			      "php-extras": {
			        "title": "PHP Extras",
			        "require": "php",
			        "modify": "php",
			        "owner": "milesj"
			      },
			      "plsql": {
			        "title": "PL/SQL",
			        "require": "sql",
			        "owner": "Golmote"
			      },
			      "powerquery": {
			        "title": "PowerQuery",
			        "alias": ["pq", "mscript"],
			        "owner": "peterbud"
			      },
			      "powershell": {
			        "title": "PowerShell",
			        "owner": "nauzilus"
			      },
			      "processing": {
			        "title": "Processing",
			        "require": "clike",
			        "owner": "Golmote"
			      },
			      "prolog": {
			        "title": "Prolog",
			        "owner": "Golmote"
			      },
			      "properties": {
			        "title": ".properties",
			        "owner": "Golmote"
			      },
			      "protobuf": {
			        "title": "Protocol Buffers",
			        "require": "clike",
			        "owner": "just-boris"
			      },
			      "pug": {
			        "title": "Pug",
			        "require": ["markup", "javascript"],
			        "optional": ["coffeescript", "ejs", "handlebars", "less", "livescript", "markdown", "scss", "stylus", "twig"],
			        "owner": "Golmote"
			      },
			      "puppet": {
			        "title": "Puppet",
			        "owner": "Golmote"
			      },
			      "pure": {
			        "title": "Pure",
			        "optional": ["c", "cpp", "fortran"],
			        "owner": "Golmote"
			      },
			      "python": {
			        "title": "Python",
			        "alias": "py",
			        "owner": "multipetros"
			      },
			      "q": {
			        "title": "Q (kdb+ database)",
			        "owner": "Golmote"
			      },
			      "qml": {
			        "title": "QML",
			        "require": "javascript",
			        "owner": "RunDevelopment"
			      },
			      "qore": {
			        "title": "Qore",
			        "require": "clike",
			        "owner": "temnroegg"
			      },
			      "r": {
			        "title": "R",
			        "owner": "Golmote"
			      },
			      "jsx": {
			        "title": "React JSX",
			        "require": ["markup", "javascript"],
			        "optional": ["jsdoc", "js-extras", "js-templates"],
			        "owner": "vkbansal"
			      },
			      "tsx": {
			        "title": "React TSX",
			        "require": ["jsx", "typescript"]
			      },
			      "renpy": {
			        "title": "Ren'py",
			        "owner": "HyuchiaDiego"
			      },
			      "reason": {
			        "title": "Reason",
			        "require": "clike",
			        "owner": "Golmote"
			      },
			      "regex": {
			        "title": "Regex",
			        "modify": ["actionscript", "coffeescript", "flow", "javascript", "typescript", "vala"],
			        "owner": "RunDevelopment"
			      },
			      "rest": {
			        "title": "reST (reStructuredText)",
			        "owner": "Golmote"
			      },
			      "rip": {
			        "title": "Rip",
			        "owner": "ravinggenius"
			      },
			      "roboconf": {
			        "title": "Roboconf",
			        "owner": "Golmote"
			      },
			      "robotframework": {
			        "title": "Robot Framework",
			        "alias": "robot",
			        "owner": "RunDevelopment"
			      },
			      "ruby": {
			        "title": "Ruby",
			        "require": "clike",
			        "alias": "rb",
			        "owner": "samflores"
			      },
			      "rust": {
			        "title": "Rust",
			        "owner": "Golmote"
			      },
			      "sas": {
			        "title": "SAS",
			        "optional": ["groovy", "lua", "sql"],
			        "owner": "Golmote"
			      },
			      "sass": {
			        "title": "Sass (Sass)",
			        "require": "css",
			        "owner": "Golmote"
			      },
			      "scss": {
			        "title": "Sass (Scss)",
			        "require": "css",
			        "optional": "css-extras",
			        "owner": "MoOx"
			      },
			      "scala": {
			        "title": "Scala",
			        "require": "java",
			        "owner": "jozic"
			      },
			      "scheme": {
			        "title": "Scheme",
			        "owner": "bacchus123"
			      },
			      "shell-session": {
			        "title": "Shell session",
			        "require": "bash",
			        "owner": "RunDevelopment"
			      },
			      "smalltalk": {
			        "title": "Smalltalk",
			        "owner": "Golmote"
			      },
			      "smarty": {
			        "title": "Smarty",
			        "require": "markup-templating",
			        "owner": "Golmote"
			      },
			      "solidity": {
			        "title": "Solidity (Ethereum)",
			        "require": "clike",
			        "owner": "glachaud"
			      },
			      "solution-file": {
			        "title": "Solution file",
			        "alias": "sln",
			        "owner": "RunDevelopment"
			      },
			      "soy": {
			        "title": "Soy (Closure Template)",
			        "require": "markup-templating",
			        "owner": "Golmote"
			      },
			      "sparql": {
			        "title": "SPARQL",
			        "require": "turtle",
			        "owner": "Triply-Dev",
			        "alias": "rq"
			      },
			      "splunk-spl": {
			        "title": "Splunk SPL",
			        "owner": "RunDevelopment"
			      },
			      "sqf": {
			        "title": "SQF: Status Quo Function (Arma 3)",
			        "require": "clike",
			        "owner": "RunDevelopment"
			      },
			      "sql": {
			        "title": "SQL",
			        "owner": "multipetros"
			      },
			      "stylus": {
			        "title": "Stylus",
			        "owner": "vkbansal"
			      },
			      "swift": {
			        "title": "Swift",
			        "require": "clike",
			        "owner": "chrischares"
			      },
			      "tap": {
			        "title": "TAP",
			        "owner": "isaacs",
			        "require": "yaml"
			      },
			      "tcl": {
			        "title": "Tcl",
			        "owner": "PeterChaplin"
			      },
			      "textile": {
			        "title": "Textile",
			        "require": "markup",
			        "optional": "css",
			        "owner": "Golmote"
			      },
			      "toml": {
			        "title": "TOML",
			        "owner": "RunDevelopment"
			      },
			      "tt2": {
			        "title": "Template Toolkit 2",
			        "require": ["clike", "markup-templating"],
			        "owner": "gflohr"
			      },
			      "turtle": {
			        "title": "Turtle",
			        "alias": "trig",
			        "aliasTitles": {
			          "trig": "TriG"
			        },
			        "owner": "jakubklimek"
			      },
			      "twig": {
			        "title": "Twig",
			        "require": "markup",
			        "owner": "brandonkelly"
			      },
			      "typescript": {
			        "title": "TypeScript",
			        "require": "javascript",
			        "optional": "js-templates",
			        "alias": "ts",
			        "owner": "vkbansal"
			      },
			      "t4-cs": {
			        "title": "T4 Text Templates (C#)",
			        "require": ["t4-templating", "csharp"],
			        "alias": "t4",
			        "owner": "RunDevelopment"
			      },
			      "t4-vb": {
			        "title": "T4 Text Templates (VB)",
			        "require": ["t4-templating", "visual-basic"],
			        "owner": "RunDevelopment"
			      },
			      "t4-templating": {
			        "title": "T4 templating",
			        "owner": "RunDevelopment"
			      },
			      "vala": {
			        "title": "Vala",
			        "require": "clike",
			        "owner": "TemplarVolk"
			      },
			      "vbnet": {
			        "title": "VB.Net",
			        "require": "basic",
			        "owner": "Bigsby"
			      },
			      "velocity": {
			        "title": "Velocity",
			        "require": "markup",
			        "owner": "Golmote"
			      },
			      "verilog": {
			        "title": "Verilog",
			        "owner": "a-rey"
			      },
			      "vhdl": {
			        "title": "VHDL",
			        "owner": "a-rey"
			      },
			      "vim": {
			        "title": "vim",
			        "owner": "westonganger"
			      },
			      "visual-basic": {
			        "title": "Visual Basic",
			        "alias": "vb",
			        "owner": "Golmote"
			      },
			      "wasm": {
			        "title": "WebAssembly",
			        "owner": "Golmote"
			      },
			      "wiki": {
			        "title": "Wiki markup",
			        "require": "markup",
			        "owner": "Golmote"
			      },
			      "xeora": {
			        "title": "Xeora",
			        "require": "markup",
			        "alias": "xeoracube",
			        "aliasTitles": {
			          "xeoracube": "XeoraCube"
			        },
			        "owner": "freakmaxi"
			      },
			      "xojo": {
			        "title": "Xojo (REALbasic)",
			        "owner": "Golmote"
			      },
			      "xquery": {
			        "title": "XQuery",
			        "require": "markup",
			        "owner": "Golmote"
			      },
			      "yaml": {
			        "title": "YAML",
			        "alias": "yml",
			        "owner": "hason"
			      },
			      "zig": {
			        "title": "Zig",
			        "owner": "RunDevelopment"
			      }
			    },
			    "plugins": {
			      "meta": {
			        "path": "plugins/{id}/prism-{id}",
			        "link": "plugins/{id}/"
			      },
			      "line-highlight": {
			        "title": "Line Highlight",
			        "description": "Highlights specific lines and/or line ranges."
			      },
			      "line-numbers": {
			        "title": "Line Numbers",
			        "description": "Line number at the beginning of code lines.",
			        "owner": "kuba-kubula"
			      },
			      "show-invisibles": {
			        "title": "Show Invisibles",
			        "description": "Show hidden characters such as tabs and line breaks.",
			        "optional": ["autolinker", "data-uri-highlight"]
			      },
			      "autolinker": {
			        "title": "Autolinker",
			        "description": "Converts URLs and emails in code to clickable links. Parses Markdown links in comments."
			      },
			      "wpd": {
			        "title": "WebPlatform Docs",
			        "description": "Makes tokens link to <a href=\"https://webplatform.github.io/docs/\">WebPlatform.org documentation</a>. The links open in a new tab."
			      },
			      "custom-class": {
			        "title": "Custom Class",
			        "description": "This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.",
			        "owner": "dvkndn",
			        "noCSS": true
			      },
			      "file-highlight": {
			        "title": "File Highlight",
			        "description": "Fetch external files and highlight them with Prism. Used on the Prism website itself.",
			        "noCSS": true
			      },
			      "show-language": {
			        "title": "Show Language",
			        "description": "Display the highlighted language in code blocks (inline code does not show the label).",
			        "owner": "nauzilus",
			        "noCSS": true,
			        "require": "toolbar"
			      },
			      "jsonp-highlight": {
			        "title": "JSONP Highlight",
			        "description": "Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).",
			        "noCSS": true,
			        "owner": "nauzilus"
			      },
			      "highlight-keywords": {
			        "title": "Highlight Keywords",
			        "description": "Adds special CSS classes for each keyword matched in the code. For example, the keyword <code>if</code> will have the class <code>keyword-if</code> as well. You can have fine grained control over the appearance of each keyword by providing your own CSS rules.",
			        "owner": "vkbansal",
			        "noCSS": true
			      },
			      "remove-initial-line-feed": {
			        "title": "Remove initial line feed",
			        "description": "Removes the initial line feed in code blocks.",
			        "owner": "Golmote",
			        "noCSS": true
			      },
			      "inline-color": {
			        "title": "Inline color",
			        "description": "Adds a small inline preview for colors in style sheets.",
			        "require": "css-extras",
			        "owner": "RunDevelopment"
			      },
			      "previewers": {
			        "title": "Previewers",
			        "description": "Previewers for angles, colors, gradients, easing and time.",
			        "require": "css-extras",
			        "owner": "Golmote"
			      },
			      "autoloader": {
			        "title": "Autoloader",
			        "description": "Automatically loads the needed languages to highlight the code blocks.",
			        "owner": "Golmote",
			        "noCSS": true
			      },
			      "keep-markup": {
			        "title": "Keep Markup",
			        "description": "Prevents custom markup from being dropped out during highlighting.",
			        "owner": "Golmote",
			        "optional": "normalize-whitespace",
			        "noCSS": true
			      },
			      "command-line": {
			        "title": "Command Line",
			        "description": "Display a command line with a prompt and, optionally, the output/response from the commands.",
			        "owner": "chriswells0"
			      },
			      "unescaped-markup": {
			        "title": "Unescaped Markup",
			        "description": "Write markup without having to escape anything."
			      },
			      "normalize-whitespace": {
			        "title": "Normalize Whitespace",
			        "description": "Supports multiple operations to normalize whitespace in code blocks.",
			        "owner": "zeitgeist87",
			        "optional": "unescaped-markup",
			        "noCSS": true
			      },
			      "data-uri-highlight": {
			        "title": "Data-URI Highlight",
			        "description": "Highlights data-URI contents.",
			        "owner": "Golmote",
			        "noCSS": true
			      },
			      "toolbar": {
			        "title": "Toolbar",
			        "description": "Attach a toolbar for plugins to easily register buttons on the top of a code block.",
			        "owner": "mAAdhaTTah"
			      },
			      "copy-to-clipboard": {
			        "title": "Copy to Clipboard Button",
			        "description": "Add a button that copies the code block to the clipboard when clicked.",
			        "owner": "mAAdhaTTah",
			        "require": "toolbar",
			        "noCSS": true
			      },
			      "download-button": {
			        "title": "Download Button",
			        "description": "A button in the toolbar of a code block adding a convenient way to download a code file.",
			        "owner": "Golmote",
			        "require": "toolbar",
			        "noCSS": true
			      },
			      "match-braces": {
			        "title": "Match braces",
			        "description": "Highlights matching braces.",
			        "owner": "RunDevelopment"
			      },
			      "diff-highlight": {
			        "title": "Diff Highlight",
			        "description": "Highlights the code inside diff blocks.",
			        "owner": "RunDevelopment",
			        "require": "diff"
			      },
			      "filter-highlight-all": {
			        "title": "Filter highlightAll",
			        "description": "Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.",
			        "owner": "RunDevelopment",
			        "noCSS": true
			      },
			      "treeview": {
			        "title": "Treeview",
			        "description": "A language with special styles to highlight file system tree structures.",
			        "owner": "Golmote"
			      }
			    }
			  };

			  if ( module.exports) {
			    module.exports = components;
			  }
			});

			var dependencies = createCommonjsModule(function (module) {
			  /**
			   * @typedef {Object<string, ComponentCategory>} Components
			   * @typedef {Object<string, ComponentEntry | string>} ComponentCategory
			   *
			   * @typedef ComponentEntry
			   * @property {string} [title] The title of the component.
			   * @property {string} [owner] The GitHub user name of the owner.
			   * @property {boolean} [noCSS=false] Whether the component doesn't have style sheets which should also be loaded.
			   * @property {string | string[]} [alias] An optional list of aliases for the id of the component.
			   * @property {Object<string, string>} [aliasTitles] An optional map from an alias to its title.
			   *
			   * Aliases which are not in this map will the get title of the component.
			   * @property {string | string[]} [optional]
			   * @property {string | string[]} [require]
			   * @property {string | string[]} [modify]
			   */

			  var getLoader = function () {
			    /**
			     * A function which does absolutely nothing.
			     *
			     * @type {any}
			     */
			    var noop = function () {};
			    /**
			     * Invokes the given callback for all elements of the given value.
			     *
			     * If the given value is an array, the callback will be invokes for all elements. If the given value is `null` or
			     * `undefined`, the callback will not be invoked. In all other cases, the callback will be invoked with the given
			     * value as parameter.
			     *
			     * @param {null | undefined | T | T[]} value
			     * @param {(value: T, index: number) => void} callbackFn
			     * @returns {void}
			     * @template T
			     */


			    function forEach(value, callbackFn) {
			      if (Array.isArray(value)) {
			        value.forEach(callbackFn);
			      } else if (value != null) {
			        callbackFn(value, 0);
			      }
			    }
			    /**
			     * Returns a new set for the given string array.
			     *
			     * @param {string[]} array
			     * @returns {StringSet}
			     *
			     * @typedef {Object<string, true>} StringSet
			     */


			    function toSet(array) {
			      /** @type {StringSet} */
			      var set = {};

			      for (var i = 0, l = array.length; i < l; i++) {
			        set[array[i]] = true;
			      }

			      return set;
			    }
			    /**
			     * Creates a map of every components id to its entry.
			     *
			     * @param {Components} components
			     * @returns {EntryMap}
			     *
			     * @typedef {{ readonly [id: string]: Readonly<ComponentEntry> | undefined }} EntryMap
			     */


			    function createEntryMap(components) {
			      /** @type {Object<string, Readonly<ComponentEntry>>} */
			      var map = {};

			      for (var categoryName in components) {
			        var category = components[categoryName];

			        for (var id in category) {
			          if (id != 'meta') {
			            /** @type {ComponentEntry | string} */
			            var entry = category[id];
			            map[id] = typeof entry == 'string' ? {
			              title: entry
			            } : entry;
			          }
			        }
			      }

			      return map;
			    }
			    /**
			     * Creates a full dependencies map which includes all types of dependencies and their transitive dependencies.
			     *
			     * @param {EntryMap} entryMap
			     * @returns {DependencyResolver}
			     *
			     * @typedef {(id: string) => StringSet} DependencyResolver
			     */


			    function createDependencyResolver(entryMap) {
			      /** @type {Object<string, StringSet>} */
			      var map = {};
			      var _stackArray = [];
			      /**
			       * Adds the dependencies of the given component to the dependency map.
			       *
			       * @param {string} id
			       * @param {string[]} stack
			       */

			      function addToMap(id, stack) {
			        if (id in map) {
			          return;
			        }

			        stack.push(id); // check for circular dependencies

			        var firstIndex = stack.indexOf(id);

			        if (firstIndex < stack.length - 1) {
			          throw new Error('Circular dependency: ' + stack.slice(firstIndex).join(' -> '));
			        }
			        /** @type {StringSet} */


			        var dependencies = {};
			        var entry = entryMap[id];

			        if (entry) {
			          /**
			           * This will add the direct dependency and all of its transitive dependencies to the set of
			           * dependencies of `entry`.
			           *
			           * @param {string} depId
			           * @returns {void}
			           */
			          function handleDirectDependency(depId) {
			            if (!(depId in entryMap)) {
			              throw new Error(id + ' depends on an unknown component ' + depId);
			            }

			            if (depId in dependencies) {
			              // if the given dependency is already in the set of deps, then so are its transitive deps
			              return;
			            }

			            addToMap(depId, stack);
			            dependencies[depId] = true;

			            for (var transitiveDepId in map[depId]) {
			              dependencies[transitiveDepId] = true;
			            }
			          }

			          forEach(entry.require, handleDirectDependency);
			          forEach(entry.optional, handleDirectDependency);
			          forEach(entry.modify, handleDirectDependency);
			        }

			        map[id] = dependencies;
			        stack.pop();
			      }

			      return function (id) {
			        var deps = map[id];

			        if (!deps) {
			          addToMap(id, _stackArray);
			          deps = map[id];
			        }

			        return deps;
			      };
			    }
			    /**
			     * Returns a function which resolves the aliases of its given id of alias.
			     *
			     * @param {EntryMap} entryMap
			     * @returns {(idOrAlias: string) => string}
			     */


			    function createAliasResolver(entryMap) {
			      /** @type {Object<string, string> | undefined} */
			      var map;
			      return function (idOrAlias) {
			        if (idOrAlias in entryMap) {
			          return idOrAlias;
			        } else {
			          // only create the alias map if necessary
			          if (!map) {
			            map = {};

			            for (var id in entryMap) {
			              var entry = entryMap[id];
			              forEach(entry && entry.alias, function (alias) {
			                if (alias in map) {
			                  throw new Error(alias + ' cannot be alias for both ' + id + ' and ' + map[alias]);
			                }

			                if (alias in entryMap) {
			                  throw new Error(alias + ' cannot be alias of ' + id + ' because it is a component.');
			                }

			                map[alias] = id;
			              });
			            }
			          }

			          return map[idOrAlias] || idOrAlias;
			        }
			      };
			    }
			    /**
			     * @typedef LoadChainer
			     * @property {(before: T, after: () => T) => T} series
			     * @property {(values: T[]) => T} parallel
			     * @template T
			     */

			    /**
			     * Creates an implicit DAG from the given components and dependencies and call the given `loadComponent` for each
			     * component in topological order.
			     *
			     * @param {DependencyResolver} dependencyResolver
			     * @param {StringSet} ids
			     * @param {(id: string) => T} loadComponent
			     * @param {LoadChainer<T>} [chainer]
			     * @returns {T}
			     * @template T
			     */


			    function loadComponentsInOrder(dependencyResolver, ids, loadComponent, chainer) {
			      const series = chainer ? chainer.series : undefined;
			      const parallel = chainer ? chainer.parallel : noop;
			      /** @type {Object<string, T>} */

			      var cache = {};
			      /**
			       * A set of ids of nodes which are not depended upon by any other node in the graph.
			       * @type {StringSet}
			       */

			      var ends = {};
			      /**
			       * Loads the given component and its dependencies or returns the cached value.
			       *
			       * @param {string} id
			       * @returns {T}
			       */

			      function handleId(id) {
			        if (id in cache) {
			          return cache[id];
			        } // assume that it's an end
			        // if it isn't, it will be removed later


			        ends[id] = true; // all dependencies of the component in the given ids

			        var dependsOn = [];

			        for (var depId in dependencyResolver(id)) {
			          if (depId in ids) {
			            dependsOn.push(depId);
			          }
			        }
			        /**
			         * The value to be returned.
			         * @type {T}
			         */


			        var value;

			        if (dependsOn.length === 0) {
			          value = loadComponent(id);
			        } else {
			          var depsValue = parallel(dependsOn.map(function (depId) {
			            var value = handleId(depId); // none of the dependencies can be ends

			            delete ends[depId];
			            return value;
			          }));

			          if (series) {
			            // the chainer will be responsibly for calling the function calling loadComponent
			            value = series(depsValue, function () {
			              return loadComponent(id);
			            });
			          } else {
			            // we don't have a chainer, so we call loadComponent ourselves
			            loadComponent(id);
			          }
			        } // cache and return


			        return cache[id] = value;
			      }

			      for (var id in ids) {
			        handleId(id);
			      }
			      /** @type {T[]} */


			      var endValues = [];

			      for (var endId in ends) {
			        endValues.push(cache[endId]);
			      }

			      return parallel(endValues);
			    }
			    /**
			     * Returns whether the given object has any keys.
			     *
			     * @param {object} obj
			     */


			    function hasKeys(obj) {
			      for (var key in obj) {
			        return true;
			      }

			      return false;
			    }
			    /**
			     * Returns an object which provides methods to get the ids of the components which have to be loaded (`getIds`) and
			     * a way to efficiently load them in synchronously and asynchronous contexts (`load`).
			     *
			     * The set of ids to be loaded is a superset of `load`. If some of these ids are in `loaded`, the corresponding
			     * components will have to reloaded.
			     *
			     * The ids in `load` and `loaded` may be in any order and can contain duplicates.
			     *
			     * @param {Components} components
			     * @param {string[]} load
			     * @param {string[]} [loaded=[]] A list of already loaded components.
			     *
			     * If a component is in this list, then all of its requirements will also be assumed to be in the list.
			     * @returns {Loader}
			     *
			     * @typedef Loader
			     * @property {() => string[]} getIds A function to get all ids of the components to load.
			     *
			     * The returned ids will be duplicate-free, alias-free and in load order.
			     * @property {LoadFunction} load A functional interface to load components.
			     *
			     * @typedef {<T> (loadComponent: (id: string) => T, chainer?: LoadChainer<T>) => T} LoadFunction
			     * A functional interface to load components.
			     *
			     * The `loadComponent` function will be called for every component in the order in which they have to be loaded.
			     *
			     * The `chainer` is useful for asynchronous loading and its `series` and `parallel` functions can be thought of as
			     * `Promise#then` and `Promise.all`.
			     *
			     * @example
			     * load(id => { loadComponent(id); }); // returns undefined
			     *
			     * await load(
			     *     id => loadComponentAsync(id), // returns a Promise for each id
			     *     {
			     *         series: async (before, after) => {
			     *             await before;
			     *             await after();
			     *         },
			     *         parallel: async (values) => {
			     *             await Promise.all(values);
			     *         }
			     *     }
			     * );
			     */


			    function getLoader(components, load, loaded) {
			      var entryMap = createEntryMap(components);
			      var resolveAlias = createAliasResolver(entryMap);
			      load = load.map(resolveAlias);
			      loaded = (loaded || []).map(resolveAlias);
			      var loadSet = toSet(load);
			      var loadedSet = toSet(loaded); // add requirements

			      load.forEach(addRequirements);

			      function addRequirements(id) {
			        var entry = entryMap[id];
			        forEach(entry && entry.require, function (reqId) {
			          if (!(reqId in loadedSet)) {
			            loadSet[reqId] = true;
			            addRequirements(reqId);
			          }
			        });
			      } // add components to reload
			      // A component x in `loaded` has to be reloaded if
			      //  1) a component in `load` modifies x.
			      //  2) x depends on a component in `load`.
			      // The above two condition have to be applied until nothing changes anymore.


			      var dependencyResolver = createDependencyResolver(entryMap);
			      /** @type {StringSet} */

			      var loadAdditions = loadSet;
			      /** @type {StringSet} */

			      var newIds;

			      while (hasKeys(loadAdditions)) {
			        newIds = {}; // condition 1)

			        for (var loadId in loadAdditions) {
			          var entry = entryMap[loadId];
			          forEach(entry && entry.modify, function (modId) {
			            if (modId in loadedSet) {
			              newIds[modId] = true;
			            }
			          });
			        } // condition 2)


			        for (var loadedId in loadedSet) {
			          if (!(loadedId in loadSet)) {
			            for (var depId in dependencyResolver(loadedId)) {
			              if (depId in loadSet) {
			                newIds[loadedId] = true;
			                break;
			              }
			            }
			          }
			        }

			        loadAdditions = newIds;

			        for (var newId in loadAdditions) {
			          loadSet[newId] = true;
			        }
			      }
			      /** @type {Loader} */


			      var loader = {
			        getIds: function () {
			          var ids = [];
			          loader.load(function (id) {
			            ids.push(id);
			          });
			          return ids;
			        },
			        load: function (loadComponent, chainer) {
			          return loadComponentsInOrder(dependencyResolver, loadSet, loadComponent, chainer);
			        }
			      };
			      return loader;
			    }

			    return getLoader;
			  }();

			  {
			    module.exports = getLoader;
			  }
			});

			var prismCore = createCommonjsModule(function (module) {
			  var _self = typeof window !== 'undefined' ? window // if in browser
			  : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
			  : {} // if in node js
			  ;
			  /**
			   * Prism: Lightweight, robust, elegant syntax highlighting
			   * MIT license http://www.opensource.org/licenses/mit-license.php/
			   * @author Lea Verou http://lea.verou.me
			   */


			  var Prism = function (_self) {
			    // Private helper vars
			    var lang = /\blang(?:uage)?-([\w-]+)\b/i;
			    var uniqueId = 0;
			    var _ = {
			      manual: _self.Prism && _self.Prism.manual,
			      disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
			      util: {
			        encode: function encode(tokens) {
			          if (tokens instanceof Token) {
			            return new Token(tokens.type, encode(tokens.content), tokens.alias);
			          } else if (Array.isArray(tokens)) {
			            return tokens.map(encode);
			          } else {
			            return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			          }
			        },
			        type: function (o) {
			          return Object.prototype.toString.call(o).slice(8, -1);
			        },
			        objId: function (obj) {
			          if (!obj['__id']) {
			            Object.defineProperty(obj, '__id', {
			              value: ++uniqueId
			            });
			          }

			          return obj['__id'];
			        },
			        // Deep clone a language definition (e.g. to extend it)
			        clone: function deepClone(o, visited) {
			          var clone,
			              id,
			              type = _.util.type(o);

			          visited = visited || {};

			          switch (type) {
			            case 'Object':
			              id = _.util.objId(o);

			              if (visited[id]) {
			                return visited[id];
			              }

			              clone = {};
			              visited[id] = clone;

			              for (var key in o) {
			                if (o.hasOwnProperty(key)) {
			                  clone[key] = deepClone(o[key], visited);
			                }
			              }

			              return clone;

			            case 'Array':
			              id = _.util.objId(o);

			              if (visited[id]) {
			                return visited[id];
			              }

			              clone = [];
			              visited[id] = clone;
			              o.forEach(function (v, i) {
			                clone[i] = deepClone(v, visited);
			              });
			              return clone;

			            default:
			              return o;
			          }
			        },

			        /**
			         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			         *
			         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			         *
			         * @param {Element} element
			         * @returns {string}
			         */
			        getLanguage: function (element) {
			          while (element && !lang.test(element.className)) {
			            element = element.parentElement;
			          }

			          if (element) {
			            return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
			          }

			          return 'none';
			        },

			        /**
			         * Returns the script element that is currently executing.
			         *
			         * This does __not__ work for line script element.
			         *
			         * @returns {HTMLScriptElement | null}
			         */
			        currentScript: function () {
			          if (typeof document === 'undefined') {
			            return null;
			          }

			          if ('currentScript' in document) {
			            return document.currentScript;
			          } // IE11 workaround
			          // we'll get the src of the current script by parsing IE11's error stack trace
			          // this will not work for inline scripts


			          try {
			            throw new Error();
			          } catch (err) {
			            // Get file src url from stack. Specifically works with the format of stack traces in IE.
			            // A stack will look like this:
			            //
			            // Error
			            //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
			            //    at Global code (http://localhost/components/prism-core.js:606:1)
			            var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];

			            if (src) {
			              var scripts = document.getElementsByTagName('script');

			              for (var i in scripts) {
			                if (scripts[i].src == src) {
			                  return scripts[i];
			                }
			              }
			            }

			            return null;
			          }
			        }
			      },
			      languages: {
			        extend: function (id, redef) {
			          var lang = _.util.clone(_.languages[id]);

			          for (var key in redef) {
			            lang[key] = redef[key];
			          }

			          return lang;
			        },

			        /**
			         * Insert a token before another token in a language literal
			         * As this needs to recreate the object (we cannot actually insert before keys in object literals),
			         * we cannot just provide an object, we need an object and a key.
			         * @param inside The key (or language id) of the parent
			         * @param before The key to insert before.
			         * @param insert Object with the key/value pairs to insert
			         * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
			         */
			        insertBefore: function (inside, before, insert, root) {
			          root = root || _.languages;
			          var grammar = root[inside];
			          var ret = {};

			          for (var token in grammar) {
			            if (grammar.hasOwnProperty(token)) {
			              if (token == before) {
			                for (var newToken in insert) {
			                  if (insert.hasOwnProperty(newToken)) {
			                    ret[newToken] = insert[newToken];
			                  }
			                }
			              } // Do not insert token which also occur in insert. See #1525


			              if (!insert.hasOwnProperty(token)) {
			                ret[token] = grammar[token];
			              }
			            }
			          }

			          var old = root[inside];
			          root[inside] = ret; // Update references in other language definitions

			          _.languages.DFS(_.languages, function (key, value) {
			            if (value === old && key != inside) {
			              this[key] = ret;
			            }
			          });

			          return ret;
			        },
			        // Traverse a language definition with Depth First Search
			        DFS: function DFS(o, callback, type, visited) {
			          visited = visited || {};
			          var objId = _.util.objId;

			          for (var i in o) {
			            if (o.hasOwnProperty(i)) {
			              callback.call(o, i, o[i], type || i);

			              var property = o[i],
			                  propertyType = _.util.type(property);

			              if (propertyType === 'Object' && !visited[objId(property)]) {
			                visited[objId(property)] = true;
			                DFS(property, callback, null, visited);
			              } else if (propertyType === 'Array' && !visited[objId(property)]) {
			                visited[objId(property)] = true;
			                DFS(property, callback, i, visited);
			              }
			            }
			          }
			        }
			      },
			      plugins: {},
			      highlightAll: function (async, callback) {
			        _.highlightAllUnder(document, async, callback);
			      },
			      highlightAllUnder: function (container, async, callback) {
			        var env = {
			          callback: callback,
			          container: container,
			          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			        };

			        _.hooks.run('before-highlightall', env);

			        env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			        _.hooks.run('before-all-elements-highlight', env);

			        for (var i = 0, element; element = env.elements[i++];) {
			          _.highlightElement(element, async === true, env.callback);
			        }
			      },
			      highlightElement: function (element, async, callback) {
			        // Find language
			        var language = _.util.getLanguage(element);

			        var grammar = _.languages[language]; // Set language on the element, if not present

			        element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language; // Set language on the parent, for styling

			        var parent = element.parentNode;

			        if (parent && parent.nodeName.toLowerCase() === 'pre') {
			          parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			        }

			        var code = element.textContent;
			        var env = {
			          element: element,
			          language: language,
			          grammar: grammar,
			          code: code
			        };

			        function insertHighlightedCode(highlightedCode) {
			          env.highlightedCode = highlightedCode;

			          _.hooks.run('before-insert', env);

			          env.element.innerHTML = env.highlightedCode;

			          _.hooks.run('after-highlight', env);

			          _.hooks.run('complete', env);

			          callback && callback.call(env.element);
			        }

			        _.hooks.run('before-sanity-check', env);

			        if (!env.code) {
			          _.hooks.run('complete', env);

			          callback && callback.call(env.element);
			          return;
			        }

			        _.hooks.run('before-highlight', env);

			        if (!env.grammar) {
			          insertHighlightedCode(_.util.encode(env.code));
			          return;
			        }

			        if (async && _self.Worker) {
			          var worker = new Worker(_.filename);

			          worker.onmessage = function (evt) {
			            insertHighlightedCode(evt.data);
			          };

			          worker.postMessage(JSON.stringify({
			            language: env.language,
			            code: env.code,
			            immediateClose: true
			          }));
			        } else {
			          insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			        }
			      },
			      highlight: function (text, grammar, language) {
			        var env = {
			          code: text,
			          grammar: grammar,
			          language: language
			        };

			        _.hooks.run('before-tokenize', env);

			        env.tokens = _.tokenize(env.code, env.grammar);

			        _.hooks.run('after-tokenize', env);

			        return Token.stringify(_.util.encode(env.tokens), env.language);
			      },
			      tokenize: function (text, grammar) {
			        var rest = grammar.rest;

			        if (rest) {
			          for (var token in rest) {
			            grammar[token] = rest[token];
			          }

			          delete grammar.rest;
			        }

			        var tokenList = new LinkedList();
			        addAfter(tokenList, tokenList.head, text);
			        matchGrammar(text, tokenList, grammar, tokenList.head, 0);
			        return toArray(tokenList);
			      },
			      hooks: {
			        all: {},
			        add: function (name, callback) {
			          var hooks = _.hooks.all;
			          hooks[name] = hooks[name] || [];
			          hooks[name].push(callback);
			        },
			        run: function (name, env) {
			          var callbacks = _.hooks.all[name];

			          if (!callbacks || !callbacks.length) {
			            return;
			          }

			          for (var i = 0, callback; callback = callbacks[i++];) {
			            callback(env);
			          }
			        }
			      },
			      Token: Token
			    };
			    _self.Prism = _;

			    function Token(type, content, alias, matchedStr, greedy) {
			      this.type = type;
			      this.content = content;
			      this.alias = alias; // Copy of the full string this token was created from

			      this.length = (matchedStr || '').length | 0;
			      this.greedy = !!greedy;
			    }

			    Token.stringify = function stringify(o, language) {
			      if (typeof o == 'string') {
			        return o;
			      }

			      if (Array.isArray(o)) {
			        var s = '';
			        o.forEach(function (e) {
			          s += stringify(e, language);
			        });
			        return s;
			      }

			      var env = {
			        type: o.type,
			        content: stringify(o.content, language),
			        tag: 'span',
			        classes: ['token', o.type],
			        attributes: {},
			        language: language
			      };
			      var aliases = o.alias;

			      if (aliases) {
			        if (Array.isArray(aliases)) {
			          Array.prototype.push.apply(env.classes, aliases);
			        } else {
			          env.classes.push(aliases);
			        }
			      }

			      _.hooks.run('wrap', env);

			      var attributes = '';

			      for (var name in env.attributes) {
			        attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
			      }

			      return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
			    };
			    /**
			     * @param {string} text
			     * @param {LinkedList<string | Token>} tokenList
			     * @param {any} grammar
			     * @param {LinkedListNode<string | Token>} startNode
			     * @param {number} startPos
			     * @param {boolean} [oneshot=false]
			     * @param {string} [target]
			     */


			    function matchGrammar(text, tokenList, grammar, startNode, startPos, oneshot, target) {
			      for (var token in grammar) {
			        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
			          continue;
			        }

			        var patterns = grammar[token];
			        patterns = Array.isArray(patterns) ? patterns : [patterns];

			        for (var j = 0; j < patterns.length; ++j) {
			          if (target && target == token + ',' + j) {
			            return;
			          }

			          var pattern = patterns[j],
			              inside = pattern.inside,
			              lookbehind = !!pattern.lookbehind,
			              greedy = !!pattern.greedy,
			              lookbehindLength = 0,
			              alias = pattern.alias;

			          if (greedy && !pattern.pattern.global) {
			            // Without the global flag, lastIndex won't work
			            var flags = pattern.pattern.toString().match(/[imsuy]*$/)[0];
			            pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
			          }

			          pattern = pattern.pattern || pattern;

			          for ( // iterate the token list and keep track of the current token/string position
			          var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
			            var str = currentNode.value;

			            if (tokenList.length > text.length) {
			              // Something went terribly wrong, ABORT, ABORT!
			              return;
			            }

			            if (str instanceof Token) {
			              continue;
			            }

			            var removeCount = 1; // this is the to parameter of removeBetween

			            if (greedy && currentNode != tokenList.tail.prev) {
			              pattern.lastIndex = pos;
			              var match = pattern.exec(text);

			              if (!match) {
			                break;
			              }

			              var from = match.index + (lookbehind && match[1] ? match[1].length : 0);
			              var to = match.index + match[0].length;
			              var p = pos; // find the node that contains the match

			              p += currentNode.value.length;

			              while (from >= p) {
			                currentNode = currentNode.next;
			                p += currentNode.value.length;
			              } // adjust pos (and p)


			              p -= currentNode.value.length;
			              pos = p; // the current node is a Token, then the match starts inside another Token, which is invalid

			              if (currentNode.value instanceof Token) {
			                continue;
			              } // find the last node which is affected by this match


			              for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string' && !k.prev.value.greedy); k = k.next) {
			                removeCount++;
			                p += k.value.length;
			              }

			              removeCount--; // replace with the new match

			              str = text.slice(pos, p);
			              match.index -= pos;
			            } else {
			              pattern.lastIndex = 0;
			              var match = pattern.exec(str);
			            }

			            if (!match) {
			              if (oneshot) {
			                break;
			              }

			              continue;
			            }

			            if (lookbehind) {
			              lookbehindLength = match[1] ? match[1].length : 0;
			            }

			            var from = match.index + lookbehindLength,
			                match = match[0].slice(lookbehindLength),
			                to = from + match.length,
			                before = str.slice(0, from),
			                after = str.slice(to);
			            var removeFrom = currentNode.prev;

			            if (before) {
			              removeFrom = addAfter(tokenList, removeFrom, before);
			              pos += before.length;
			            }

			            removeRange(tokenList, removeFrom, removeCount);
			            var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
			            currentNode = addAfter(tokenList, removeFrom, wrapped);

			            if (after) {
			              addAfter(tokenList, currentNode, after);
			            }

			            if (removeCount > 1) matchGrammar(text, tokenList, grammar, currentNode.prev, pos, true, token + ',' + j);
			            if (oneshot) break;
			          }
			        }
			      }
			    }
			    /**
			     * @typedef LinkedListNode
			     * @property {T} value
			     * @property {LinkedListNode<T> | null} prev The previous node.
			     * @property {LinkedListNode<T> | null} next The next node.
			     * @template T
			     */

			    /**
			     * @template T
			     */


			    function LinkedList() {
			      /** @type {LinkedListNode<T>} */
			      var head = {
			        value: null,
			        prev: null,
			        next: null
			      };
			      /** @type {LinkedListNode<T>} */

			      var tail = {
			        value: null,
			        prev: head,
			        next: null
			      };
			      head.next = tail;
			      /** @type {LinkedListNode<T>} */

			      this.head = head;
			      /** @type {LinkedListNode<T>} */

			      this.tail = tail;
			      this.length = 0;
			    }
			    /**
			     * Adds a new node with the given value to the list.
			     * @param {LinkedList<T>} list
			     * @param {LinkedListNode<T>} node
			     * @param {T} value
			     * @returns {LinkedListNode<T>} The added node.
			     * @template T
			     */


			    function addAfter(list, node, value) {
			      // assumes that node != list.tail && values.length >= 0
			      var next = node.next;
			      var newNode = {
			        value: value,
			        prev: node,
			        next: next
			      };
			      node.next = newNode;
			      next.prev = newNode;
			      list.length++;
			      return newNode;
			    }
			    /**
			     * Removes `count` nodes after the given node. The given node will not be removed.
			     * @param {LinkedList<T>} list
			     * @param {LinkedListNode<T>} node
			     * @param {number} count
			     * @template T
			     */


			    function removeRange(list, node, count) {
			      var next = node.next;

			      for (var i = 0; i < count && next !== list.tail; i++) {
			        next = next.next;
			      }

			      node.next = next;
			      next.prev = node;
			      list.length -= i;
			    }
			    /**
			     * @param {LinkedList<T>} list
			     * @returns {T[]}
			     * @template T
			     */


			    function toArray(list) {
			      var array = [];
			      var node = list.head.next;

			      while (node !== list.tail) {
			        array.push(node.value);
			        node = node.next;
			      }

			      return array;
			    }

			    if (!_self.document) {
			      if (!_self.addEventListener) {
			        // in Node.js
			        return _;
			      }

			      if (!_.disableWorkerMessageHandler) {
			        // In worker
			        _self.addEventListener('message', function (evt) {
			          var message = JSON.parse(evt.data),
			              lang = message.language,
			              code = message.code,
			              immediateClose = message.immediateClose;

			          _self.postMessage(_.highlight(code, _.languages[lang], lang));

			          if (immediateClose) {
			            _self.close();
			          }
			        }, false);
			      }

			      return _;
			    } //Get current script and highlight


			    var script = _.util.currentScript();

			    if (script) {
			      _.filename = script.src;

			      if (script.hasAttribute('data-manual')) {
			        _.manual = true;
			      }
			    }

			    function highlightAutomaticallyCallback() {
			      if (!_.manual) {
			        _.highlightAll();
			      }
			    }

			    if (!_.manual) {
			      // If the document state is "loading", then we'll use DOMContentLoaded.
			      // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
			      // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
			      // might take longer one animation frame to execute which can create a race condition where only some plugins have
			      // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
			      // See https://github.com/PrismJS/prism/issues/2102
			      var readyState = document.readyState;

			      if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			        document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
			      } else {
			        if (window.requestAnimationFrame) {
			          window.requestAnimationFrame(highlightAutomaticallyCallback);
			        } else {
			          window.setTimeout(highlightAutomaticallyCallback, 16);
			        }
			      }
			    }

			    return _;
			  }(_self);

			  if ( module.exports) {
			    module.exports = Prism;
			  } // hack for components to work correctly in node.js


			  if (typeof commonjsGlobal !== 'undefined') {
			    commonjsGlobal.Prism = Prism;
			  }
			});

			let version = `1.19.0`;

			function _prism() {
			  return `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}`;
			}

			function selectTheme(theme) {
			  const cur = document.querySelector(`link.prism-theme-hook[data-theme=${theme}]`);

			  if (!cur) {
			    return false;
			  }

			  cur.disabled = false;
			  const themes = document.querySelectorAll(`link.prism-theme-hook:not([data-theme=${theme}])`);
			  themes.forEach(v => v.disabled = true);
			  return true;
			}

			function usePrismTheme(theme = 'prism') {
			  const [state, updateState] = u$1({
			    loading: false,
			    error: undefined
			  });
			  useEffect(() => {
			    if (selectTheme(theme)) {
			      return;
			    }

			    updateState(s => {
			      s.loading = true;
			      s.error = undefined;
			    });
			    const link = document.createElement('link');
			    link.rel = 'stylesheet';
			    link.href = `${_prism()}/themes/${theme}.min.css`;
			    link.className = 'prism-theme-hook';
			    link.setAttribute('data-theme', theme);

			    link.onload = () => {
			      selectTheme(theme);
			      updateState(s => {
			        s.loading = false;
			      });
			    };

			    link.onerror = e => {
			      const err = typeof e === 'string' ? e : e === null || e === void 0 ? void 0 : e['error'];
			      updateState(s => {
			        s.loading = false;
			        s.error = err;
			      });
			    };

			    document.head.appendChild(link);
			  }, [theme]);
			  const {
			    loading,
			    error
			  } = state;
			  return {
			    loading,
			    error
			  };
			}
			const loaded = [];
			const immer = new nn();
			immer.setAutoFreeze(false);
			const {
			  produce
			} = immer;
			function usePrismLanguage(language) {
			  const [state, setState] = useState({
			    loading: !(loaded.includes(language) || prismCore.languages[language]),
			    grammar: prismCore.languages[language],
			    error: undefined
			  });
			  useEffect(() => {
			    var _window$Prism;

			    window['Prism'] = (_window$Prism = window['Prism']) !== null && _window$Prism !== void 0 ? _window$Prism : prismCore;

			    if (loaded.includes(language) || prismCore.languages[language]) {
			      setState(produce(s => {
			        s.loading = false;
			        s.grammar = prismCore.languages[language];
			        s.error = undefined;
			      }));
			      return;
			    }

			    setState(produce(s => {
			      s.loading = true;
			      s.error = undefined;
			    }));
			    dependencies(components_1, [language], loaded).load(id => {
			      return new Promise((resolve, reject) => {
			        const script = document.createElement('script');
			        script.src = `${_prism()}/components/prism-${id}.min.js`; // script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-${id}.js`;

			        script.onload = () => {
			          if (!loaded.includes(id)) {
			            loaded.push(id);
			          }

			          resolve();
			        };

			        script.onerror = reject;
			        document.head.appendChild(script);
			      });
			    }, {
			      series: async (before, after) => {
			        await before;
			        await after();
			      },
			      parallel: async values => {
			        await Promise.all(values);
			      }
			    }).then(() => {
			      setState(produce(s => {
			        s.loading = false;
			        s.grammar = prismCore.languages[language];
			        s.error = undefined;
			      }));
			    }).catch(e => {
			      setState(produce(s => {
			        s.loading = false;
			        s.error = e;
			      }));
			    });
			  }, [language]);
			  const {
			    loading,
			    error,
			    grammar
			  } = state;
			  return {
			    loading,
			    error,
			    grammar,
			    Prism: prismCore
			  };
			}

			const SimpleCodeEditor = ({
			  value,
			  onChange,
			  language,
			  theme = 'prism'
			}) => {
			  const [highlight, setHighlight] = useState(null);
			  const {
			    grammar,
			    Prism
			  } = usePrismLanguage(language);
			  useEffect(() => {
			    if (grammar) {
			      setHighlight(() => {
			        return v => Prism.highlight(v, grammar);
			      });
			    }
			  }, [grammar]);
			  return /*#__PURE__*/React.createElement(lib, {
			    value: value,
			    onValueChange: onChange,
			    highlight: highlight !== null && highlight !== void 0 ? highlight : code => code,
			    padding: 10,
			    style: {
			      fontFamily: '"Fira code", "Fira Mono", monospace',
			      fontSize: 12
			    }
			  });
			};

			// Generated by PEG.js v. 0.10.0 (ts-pegjs plugin v. 0.2.6 )
			/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */

			class SyntaxError extends Error {
			  constructor(message, expected, found, location) {
			    super();
			    this.message = void 0;
			    this.expected = void 0;
			    this.found = void 0;
			    this.location = void 0;
			    this.name = void 0;
			    this.message = message;
			    this.expected = expected;
			    this.found = found;
			    this.location = location;
			    this.name = 'SyntaxError';

			    if (typeof Error.captureStackTrace === 'function') {
			      Error.captureStackTrace(this, SyntaxError);
			    }
			  }

			  static buildMessage(expected, found) {
			    function hex(ch) {
			      return ch.charCodeAt(0).toString(16).toUpperCase();
			    }

			    function literalEscape(s) {
			      return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, ch => '\\x0' + hex(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, ch => '\\x' + hex(ch));
			    }

			    function classEscape(s) {
			      return s.replace(/\\/g, '\\\\').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/-/g, '\\-').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, ch => '\\x0' + hex(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, ch => '\\x' + hex(ch));
			    }

			    function describeExpectation(expectation) {
			      switch (expectation.type) {
			        case 'literal':
			          return '"' + literalEscape(expectation.text) + '"';

			        case 'class':
			          const escapedParts = expectation.parts.map(part => {
			            return Array.isArray(part) ? classEscape(part[0]) + '-' + classEscape(part[1]) : classEscape(part);
			          });
			          return '[' + (expectation.inverted ? '^' : '') + escapedParts + ']';

			        case 'any':
			          return 'any character';

			        case 'end':
			          return 'end of input';

			        case 'other':
			          return expectation.description;
			      }
			    }

			    function describeExpected(expected1) {
			      const descriptions = expected1.map(describeExpectation);
			      let i;
			      let j;
			      descriptions.sort();

			      if (descriptions.length > 0) {
			        for (i = 1, j = 1; i < descriptions.length; i++) {
			          if (descriptions[i - 1] !== descriptions[i]) {
			            descriptions[j] = descriptions[i];
			            j++;
			          }
			        }

			        descriptions.length = j;
			      }

			      switch (descriptions.length) {
			        case 1:
			          return descriptions[0];

			        case 2:
			          return descriptions[0] + ' or ' + descriptions[1];

			        default:
			          return descriptions.slice(0, -1).join(', ') + ', or ' + descriptions[descriptions.length - 1];
			      }
			    }

			    function describeFound(found1) {
			      return found1 ? '"' + literalEscape(found1) + '"' : 'end of input';
			    }

			    return 'Expected ' + describeExpected(expected) + ' but ' + describeFound(found) + ' found.';
			  }

			}

			function peg$parse(input, options) {
			  options = options !== undefined ? options : {};
			  const peg$FAILED = {};
			  const peg$startRuleFunctions = {
			    Conf: peg$parseConf
			  };
			  let peg$startRuleFunction = peg$parseConf;
			  const peg$c0 = /^[\n]/;
			  const peg$c1 = peg$classExpectation(['\n'], false, false);

			  const peg$c2 = function (first, line) {
			    return line;
			  };

			  const peg$c3 = function (first, tail) {
			    return [first, ...(tail || [])].filter(v => v.type);
			  };

			  const peg$c4 = function () {
			    return {};
			  };

			  const peg$c5 = function (e, c) {
			    return { ...c,
			      ...e,
			      location: location()
			    };
			  };

			  const peg$c6 = '[';
			  const peg$c7 = peg$literalExpectation('[', false);
			  const peg$c8 = /^[^\n\]]/;
			  const peg$c9 = peg$classExpectation(['\n', ']'], true, false);
			  const peg$c10 = ']';
			  const peg$c11 = peg$literalExpectation(']', false);

			  const peg$c12 = function (name) {
			    return {
			      type: 'section',
			      name: name.join('').trim()
			    };
			  };

			  const peg$c13 = /^[#;]/;
			  const peg$c14 = peg$classExpectation(['#', ';'], false, false);
			  const peg$c15 = /^[^\n]/;
			  const peg$c16 = peg$classExpectation(['\n'], true, false);

			  const peg$c17 = function (comment) {
			    return {
			      type: 'comment',
			      comment: comment.join('').trim()
			    };
			  };

			  const peg$c18 = /^[^ \t\r\n#;=]/;
			  const peg$c19 = peg$classExpectation([' ', '\t', '\r', '\n', '#', ';', '='], true, false);
			  const peg$c20 = '=';
			  const peg$c21 = peg$literalExpectation('=', false);
			  const peg$c22 = /^[^\n#;]/;
			  const peg$c23 = peg$classExpectation(['\n', '#', ';'], true, false);

			  const peg$c24 = function (key, v) {
			    return v;
			  };

			  const peg$c25 = function (key, value) {
			    return {
			      type: 'entry',
			      key: key.join('').trim(),
			      value: value === null || value === void 0 ? void 0 : value.join('').trim()
			    };
			  };

			  const peg$c26 = peg$otherExpectation('whitespacing');
			  const peg$c27 = /^[ \t\r]/;
			  const peg$c28 = peg$classExpectation([' ', '\t', '\r'], false, false);
			  let peg$currPos = 0;
			  let peg$savedPos = 0;
			  const peg$posDetailsCache = [{
			    line: 1,
			    column: 1
			  }];
			  let peg$maxFailPos = 0;
			  let peg$maxFailExpected = [];
			  let peg$silentFails = 0;
			  const peg$resultsCache = {};
			  let peg$result;

			  if (options.startRule !== undefined) {
			    if (!(options.startRule in peg$startRuleFunctions)) {
			      throw new Error('Can\'t start parsing from rule "' + options.startRule + '".');
			    }

			    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
			  }

			  function location() {
			    return peg$computeLocation(peg$savedPos, peg$currPos);
			  }

			  function peg$literalExpectation(text1, ignoreCase) {
			    return {
			      type: 'literal',
			      text: text1,
			      ignoreCase: ignoreCase
			    };
			  }

			  function peg$classExpectation(parts, inverted, ignoreCase) {
			    return {
			      type: 'class',
			      parts: parts,
			      inverted: inverted,
			      ignoreCase: ignoreCase
			    };
			  }

			  function peg$endExpectation() {
			    return {
			      type: 'end'
			    };
			  }

			  function peg$otherExpectation(description) {
			    return {
			      type: 'other',
			      description: description
			    };
			  }

			  function peg$computePosDetails(pos) {
			    let details = peg$posDetailsCache[pos];
			    let p;

			    if (details) {
			      return details;
			    } else {
			      p = pos - 1;

			      while (!peg$posDetailsCache[p]) {
			        p--;
			      }

			      details = peg$posDetailsCache[p];
			      details = {
			        line: details.line,
			        column: details.column
			      };

			      while (p < pos) {
			        if (input.charCodeAt(p) === 10) {
			          details.line++;
			          details.column = 1;
			        } else {
			          details.column++;
			        }

			        p++;
			      }

			      peg$posDetailsCache[pos] = details;
			      return details;
			    }
			  }

			  function peg$computeLocation(startPos, endPos) {
			    const startPosDetails = peg$computePosDetails(startPos);
			    const endPosDetails = peg$computePosDetails(endPos);
			    return {
			      start: {
			        offset: startPos,
			        line: startPosDetails.line,
			        column: startPosDetails.column
			      },
			      end: {
			        offset: endPos,
			        line: endPosDetails.line,
			        column: endPosDetails.column
			      }
			    };
			  }

			  function peg$fail(expected1) {
			    if (peg$currPos < peg$maxFailPos) {
			      return;
			    }

			    if (peg$currPos > peg$maxFailPos) {
			      peg$maxFailPos = peg$currPos;
			      peg$maxFailExpected = [];
			    }

			    peg$maxFailExpected.push(expected1);
			  }

			  function peg$buildStructuredError(expected1, found, location1) {
			    return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
			  }

			  function peg$parseConf() {
			    let s0, s1, s2, s3, s4, s5;
			    const key = peg$currPos * 7 + 0;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parseLine();

			    if (s1 !== peg$FAILED) {
			      s2 = [];
			      s3 = peg$currPos;
			      s4 = [];

			      if (peg$c0.test(input.charAt(peg$currPos))) {
			        s5 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s5 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c1);
			        }
			      }

			      if (s5 !== peg$FAILED) {
			        while (s5 !== peg$FAILED) {
			          s4.push(s5);

			          if (peg$c0.test(input.charAt(peg$currPos))) {
			            s5 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s5 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c1);
			            }
			          }
			        }
			      } else {
			        s4 = peg$FAILED;
			      }

			      if (s4 !== peg$FAILED) {
			        s5 = peg$parseLine();

			        if (s5 !== peg$FAILED) {
			          peg$savedPos = s3;
			          s4 = peg$c2(s1, s5);
			          s3 = s4;
			        } else {
			          peg$currPos = s3;
			          s3 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s3;
			        s3 = peg$FAILED;
			      }

			      while (s3 !== peg$FAILED) {
			        s2.push(s3);
			        s3 = peg$currPos;
			        s4 = [];

			        if (peg$c0.test(input.charAt(peg$currPos))) {
			          s5 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s5 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c1);
			          }
			        }

			        if (s5 !== peg$FAILED) {
			          while (s5 !== peg$FAILED) {
			            s4.push(s5);

			            if (peg$c0.test(input.charAt(peg$currPos))) {
			              s5 = input.charAt(peg$currPos);
			              peg$currPos++;
			            } else {
			              s5 = peg$FAILED;

			              if (peg$silentFails === 0) {
			                peg$fail(peg$c1);
			              }
			            }
			          }
			        } else {
			          s4 = peg$FAILED;
			        }

			        if (s4 !== peg$FAILED) {
			          s5 = peg$parseLine();

			          if (s5 !== peg$FAILED) {
			            peg$savedPos = s3;
			            s4 = peg$c2(s1, s5);
			            s3 = s4;
			          } else {
			            peg$currPos = s3;
			            s3 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s3;
			          s3 = peg$FAILED;
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c0.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c1);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c0.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c1);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          peg$savedPos = s0;
			          s1 = peg$c3(s1, s2);
			          s0 = s1;
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    if (s0 === peg$FAILED) {
			      s0 = null;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseLine() {
			    let s0, s1, s2;
			    const key = peg$currPos * 7 + 1;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parseSection();

			    if (s1 === peg$FAILED) {
			      s1 = peg$parseEntry();

			      if (s1 === peg$FAILED) {
			        s1 = peg$currPos;
			        s2 = peg$parse_();

			        if (s2 !== peg$FAILED) {
			          peg$savedPos = s1;
			          s2 = peg$c4();
			        }

			        s1 = s2;
			      }
			    }

			    if (s1 !== peg$FAILED) {
			      s2 = peg$parseComment();

			      if (s2 === peg$FAILED) {
			        s2 = null;
			      }

			      if (s2 !== peg$FAILED) {
			        peg$savedPos = s0;
			        s1 = peg$c5(s1, s2);
			        s0 = s1;
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseSection() {
			    let s0, s1, s2, s3, s4, s5;
			    const key = peg$currPos * 7 + 2;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      if (input.charCodeAt(peg$currPos) === 91) {
			        s2 = peg$c6;
			        peg$currPos++;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c7);
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c8.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c9);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c8.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c9);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          if (input.charCodeAt(peg$currPos) === 93) {
			            s4 = peg$c10;
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c11);
			            }
			          }

			          if (s4 !== peg$FAILED) {
			            s5 = peg$parse_();

			            if (s5 !== peg$FAILED) {
			              peg$savedPos = s0;
			              s1 = peg$c12(s3);
			              s0 = s1;
			            } else {
			              peg$currPos = s0;
			              s0 = peg$FAILED;
			            }
			          } else {
			            peg$currPos = s0;
			            s0 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseComment() {
			    let s0, s1, s2, s3, s4;
			    const key = peg$currPos * 7 + 3;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      if (peg$c13.test(input.charAt(peg$currPos))) {
			        s2 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c14);
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c15.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c16);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c15.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c16);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          peg$savedPos = s0;
			          s1 = peg$c17(s3);
			          s0 = s1;
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseEntry() {
			    let s0, s1, s2, s3, s4, s5, s6, s7, s8;
			    const key = peg$currPos * 7 + 4;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      s2 = [];

			      if (peg$c18.test(input.charAt(peg$currPos))) {
			        s3 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s3 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c19);
			        }
			      }

			      if (s3 !== peg$FAILED) {
			        while (s3 !== peg$FAILED) {
			          s2.push(s3);

			          if (peg$c18.test(input.charAt(peg$currPos))) {
			            s3 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s3 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c19);
			            }
			          }
			        }
			      } else {
			        s2 = peg$FAILED;
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = peg$parse_();

			        if (s3 !== peg$FAILED) {
			          s4 = peg$currPos;

			          if (input.charCodeAt(peg$currPos) === 61) {
			            s5 = peg$c20;
			            peg$currPos++;
			          } else {
			            s5 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c21);
			            }
			          }

			          if (s5 !== peg$FAILED) {
			            s6 = peg$parse_();

			            if (s6 !== peg$FAILED) {
			              s7 = [];

			              if (peg$c22.test(input.charAt(peg$currPos))) {
			                s8 = input.charAt(peg$currPos);
			                peg$currPos++;
			              } else {
			                s8 = peg$FAILED;

			                if (peg$silentFails === 0) {
			                  peg$fail(peg$c23);
			                }
			              }

			              while (s8 !== peg$FAILED) {
			                s7.push(s8);

			                if (peg$c22.test(input.charAt(peg$currPos))) {
			                  s8 = input.charAt(peg$currPos);
			                  peg$currPos++;
			                } else {
			                  s8 = peg$FAILED;

			                  if (peg$silentFails === 0) {
			                    peg$fail(peg$c23);
			                  }
			                }
			              }

			              if (s7 !== peg$FAILED) {
			                peg$savedPos = s4;
			                s5 = peg$c24(s2, s7);
			                s4 = s5;
			              } else {
			                peg$currPos = s4;
			                s4 = peg$FAILED;
			              }
			            } else {
			              peg$currPos = s4;
			              s4 = peg$FAILED;
			            }
			          } else {
			            peg$currPos = s4;
			            s4 = peg$FAILED;
			          }

			          if (s4 === peg$FAILED) {
			            s4 = null;
			          }

			          if (s4 !== peg$FAILED) {
			            peg$savedPos = s0;
			            s1 = peg$c25(s2, s4);
			            s0 = s1;
			          } else {
			            peg$currPos = s0;
			            s0 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parse_() {
			    let s0, s1;
			    const key = peg$currPos * 7 + 5;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    peg$silentFails++;
			    s0 = [];

			    if (peg$c27.test(input.charAt(peg$currPos))) {
			      s1 = input.charAt(peg$currPos);
			      peg$currPos++;
			    } else {
			      s1 = peg$FAILED;

			      if (peg$silentFails === 0) {
			        peg$fail(peg$c28);
			      }
			    }

			    while (s1 !== peg$FAILED) {
			      s0.push(s1);

			      if (peg$c27.test(input.charAt(peg$currPos))) {
			        s1 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s1 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c28);
			        }
			      }
			    }

			    peg$silentFails--;

			    if (s0 === peg$FAILED) {
			      s1 = peg$FAILED;

			      if (peg$silentFails === 0) {
			        peg$fail(peg$c26);
			      }
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  peg$result = peg$startRuleFunction();

			  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
			    return peg$result;
			  } else {
			    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
			      peg$fail(peg$endExpectation());
			    }

			    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
			  }
			}

			const parse = peg$parse;

			function buildIniObject(lines) {
			  const context = {
			    global: {},
			    section: {}
			  };
			  context.global[''] = context.section;

			  for (const line of lines) {
			    if (!buildIniLine(line, context)) {
			      throw new Error(`unknown line: ${line.type}`);
			    }
			  }

			  if (!Object.keys(context.global['']).length) {
			    delete context.global[''];
			  }

			  return context.global;
			}
			function buildIniLine(line, context) {
			  const {
			    section,
			    global
			  } = context;

			  switch (line.type) {
			    case 'section':
			      {
			        var _global$name;

			        const {
			          name
			        } = line;
			        context.section = global[name] = (_global$name = global[name]) !== null && _global$name !== void 0 ? _global$name : {};
			      }
			      break;

			    case 'comment':
			      break;

			    case 'entry':
			      {
			        const {
			          key,
			          value
			        } = line;
			        section[key] = section[key] ? [].concat(section[key], value) : value;
			        break;
			      }

			    default:
			      return false;
			  }

			  return true;
			}

			function stringifyIni(o) {
			  const s = [];

			  if (o['']) {
			    s.push(stringifyIniObject(o['']));
			  }

			  for (const [section, kv] of Object.entries(o)) {
			    if (section) {
			      s.push(`[${section}]`);
			      s.push(stringifyIniObject(kv));
			    }
			  }

			  return s.join('\n');
			}

			function stringifyIniObject(o) {
			  const s = [];

			  for (const [k, v] of Object.entries(o)) {
			    if (Array.isArray(v)) {
			      v.forEach(i => s.push(`${k}=${i}`));
			    } else {
			      s.push(`${k}=${v !== null && v !== void 0 ? v : ''}`);
			    }
			  }

			  return s.join('\n');
			}

			class Ini {
			  stringify(s) {
			    return stringifyIni(s);
			  }

			  parse(s) {
			    return buildIniObject(parse(s));
			  }

			}

			const INI = new Ini();

			const IniPlayground = exports('IniPlayground', () => {
			  const [theme, setTheme] = useState('prism-solarizedlight');
			  usePrismTheme(theme);
			  const [ini, setIni] = React.useState(() => `
# Demo Init content

name=wener

[site]
url=https://apis.wener.me

[db]
  host=localhost
  port=5432
`);
			  const [json, setJson] = React.useState(() => JSON.stringify(INI.parse(ini), null, 2));
			  const [generated, setGenerated] = React.useState(() => INI.stringify(INI.parse(ini)));
			  return /*#__PURE__*/React.createElement(Row, {
			    gutter: 16,
			    style: {}
			  }, /*#__PURE__*/React.createElement(Col, {
			    span: 12
			  }, /*#__PURE__*/React.createElement(Row, {
			    gutter: [0, 12]
			  }, /*#__PURE__*/React.createElement(Col, {
			    span: 24
			  }, /*#__PURE__*/React.createElement(Card, {
			    title: 'INI'
			  }, /*#__PURE__*/React.createElement(SimpleCodeEditor, {
			    value: ini,
			    onChange: v => {
			      try {
			        setIni(v);
			        const o = INI.parse(v);
			        setJson(JSON.stringify(o, null, 2));
			        setGenerated(INI.stringify(o));
			      } catch (e) {
			        message.error(`ERROR: ${e}`);
			      }
			    },
			    language: 'ini'
			  }))), /*#__PURE__*/React.createElement(Col, {
			    span: 24
			  }, /*#__PURE__*/React.createElement(Card, {
			    title: 'Generated'
			  }, /*#__PURE__*/React.createElement(SimpleCodeEditor, {
			    value: generated,
			    onChange: setGenerated,
			    language: 'ini'
			  }))))), /*#__PURE__*/React.createElement(Col, {
			    span: 12
			  }, /*#__PURE__*/React.createElement(Card, {
			    title: "JSON",
			    extra: /*#__PURE__*/React.createElement(Button, {
			      type: "primary",
			      ghost: true,
			      onClick: () => {
			        try {
			          setGenerated(INI.stringify(JSON.parse(json)));
			        } catch (e) {
			          message.error(`ERROR: ${e}`);
			        }
			      }
			    }, "Generated")
			  }, /*#__PURE__*/React.createElement(SimpleCodeEditor, {
			    value: json,
			    onChange: setJson,
			    language: 'json'
			  }))));
			});

			// Generated by PEG.js v. 0.10.0 (ts-pegjs plugin v. 0.2.6 )
			/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */

			class SyntaxError$1 extends Error {
			  constructor(message, expected, found, location) {
			    super();
			    this.message = void 0;
			    this.expected = void 0;
			    this.found = void 0;
			    this.location = void 0;
			    this.name = void 0;
			    this.message = message;
			    this.expected = expected;
			    this.found = found;
			    this.location = location;
			    this.name = 'SyntaxError';

			    if (typeof Error.captureStackTrace === 'function') {
			      Error.captureStackTrace(this, SyntaxError$1);
			    }
			  }

			  static buildMessage(expected, found) {
			    function hex(ch) {
			      return ch.charCodeAt(0).toString(16).toUpperCase();
			    }

			    function literalEscape(s) {
			      return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, ch => '\\x0' + hex(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, ch => '\\x' + hex(ch));
			    }

			    function classEscape(s) {
			      return s.replace(/\\/g, '\\\\').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/-/g, '\\-').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, ch => '\\x0' + hex(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, ch => '\\x' + hex(ch));
			    }

			    function describeExpectation(expectation) {
			      switch (expectation.type) {
			        case 'literal':
			          return '"' + literalEscape(expectation.text) + '"';

			        case 'class':
			          const escapedParts = expectation.parts.map(part => {
			            return Array.isArray(part) ? classEscape(part[0]) + '-' + classEscape(part[1]) : classEscape(part);
			          });
			          return '[' + (expectation.inverted ? '^' : '') + escapedParts + ']';

			        case 'any':
			          return 'any character';

			        case 'end':
			          return 'end of input';

			        case 'other':
			          return expectation.description;
			      }
			    }

			    function describeExpected(expected1) {
			      const descriptions = expected1.map(describeExpectation);
			      let i;
			      let j;
			      descriptions.sort();

			      if (descriptions.length > 0) {
			        for (i = 1, j = 1; i < descriptions.length; i++) {
			          if (descriptions[i - 1] !== descriptions[i]) {
			            descriptions[j] = descriptions[i];
			            j++;
			          }
			        }

			        descriptions.length = j;
			      }

			      switch (descriptions.length) {
			        case 1:
			          return descriptions[0];

			        case 2:
			          return descriptions[0] + ' or ' + descriptions[1];

			        default:
			          return descriptions.slice(0, -1).join(', ') + ', or ' + descriptions[descriptions.length - 1];
			      }
			    }

			    function describeFound(found1) {
			      return found1 ? '"' + literalEscape(found1) + '"' : 'end of input';
			    }

			    return 'Expected ' + describeExpected(expected) + ' but ' + describeFound(found) + ' found.';
			  }

			}

			function peg$parse$1(input, options) {
			  options = options !== undefined ? options : {};
			  const peg$FAILED = {};
			  const peg$startRuleFunctions = {
			    Ini: peg$parseIni
			  };
			  let peg$startRuleFunction = peg$parseIni;
			  const peg$c0 = /^[\n]/;
			  const peg$c1 = peg$classExpectation(['\n'], false, false);

			  const peg$c2 = function (first, line) {
			    return line;
			  };

			  const peg$c3 = function (first, tail) {
			    return [first, ...(tail || [])].filter(v => v.type);
			  };

			  const peg$c4 = function () {
			    return {};
			  };

			  const peg$c5 = function (e, c) {
			    return { ...c,
			      ...e,
			      location: location()
			    };
			  };

			  const peg$c6 = '[';
			  const peg$c7 = peg$literalExpectation('[', false);
			  const peg$c8 = /^[^\n\]]/;
			  const peg$c9 = peg$classExpectation(['\n', ']'], true, false);
			  const peg$c10 = ']';
			  const peg$c11 = peg$literalExpectation(']', false);

			  const peg$c12 = function (name) {
			    return {
			      type: 'section',
			      name: name.join('').trim()
			    };
			  };

			  const peg$c13 = /^[#;]/;
			  const peg$c14 = peg$classExpectation(['#', ';'], false, false);
			  const peg$c15 = /^[^\n]/;
			  const peg$c16 = peg$classExpectation(['\n'], true, false);

			  const peg$c17 = function (comment) {
			    return {
			      type: 'comment',
			      comment: comment.join('').trim()
			    };
			  };

			  const peg$c18 = /^[^ \t\r\n#;=]/;
			  const peg$c19 = peg$classExpectation([' ', '\t', '\r', '\n', '#', ';', '='], true, false);
			  const peg$c20 = '=';
			  const peg$c21 = peg$literalExpectation('=', false);
			  const peg$c22 = /^[^\n#;]/;
			  const peg$c23 = peg$classExpectation(['\n', '#', ';'], true, false);

			  const peg$c24 = function (key, v) {
			    return v;
			  };

			  const peg$c25 = function (key, value) {
			    return {
			      type: 'entry',
			      key: key.join('').trim(),
			      value: value === null || value === void 0 ? void 0 : value.join('').trim()
			    };
			  };

			  const peg$c26 = '(';
			  const peg$c27 = peg$literalExpectation('(', false);
			  const peg$c28 = ',';
			  const peg$c29 = peg$literalExpectation(',', false);

			  const peg$c30 = function (name, first, v) {
			    return v;
			  };

			  const peg$c31 = ')';
			  const peg$c32 = peg$literalExpectation(')', false);

			  const peg$c33 = function (name, first, trail) {
			    return [].concat(first, trail || []);
			  };

			  const peg$c34 = function (name, names) {
			    return {
			      type: 'template-section',
			      name: name.join('').trim(),
			      templateOnly: names.includes('!'),
			      extends: names.filter(v => v !== '!')
			    };
			  };

			  const peg$c35 = '!';
			  const peg$c36 = peg$literalExpectation('!', false);
			  const peg$c37 = /^[-a-z0-9A-Z]/;
			  const peg$c38 = peg$classExpectation(['-', ['a', 'z'], ['0', '9'], ['A', 'Z']], false, false);

			  const peg$c39 = function () {
			    return text();
			  };

			  const peg$c40 = '=>';
			  const peg$c41 = peg$literalExpectation('=>', false);
			  const peg$c42 = '+';
			  const peg$c43 = peg$literalExpectation('+', false);

			  const peg$c44 = function (name, conditions) {
			    return {
			      type: 'append-section',
			      name: name.join('').trim(),
			      conditions
			    };
			  };

			  const peg$c45 = function (first, v) {
			    return v;
			  };

			  const peg$c46 = function (first, trail) {
			    return [].concat(first, trail || []);
			  };

			  const peg$c47 = /^[^=\n]/;
			  const peg$c48 = peg$classExpectation(['=', '\n'], true, false);
			  const peg$c49 = /^[^\n#;,)]/;
			  const peg$c50 = peg$classExpectation(['\n', '#', ';', ',', ')'], true, false);

			  const peg$c51 = function (k, v) {
			    return {
			      key: k.join('').trim(),
			      value: v.join('').trim()
			    };
			  };

			  const peg$c52 = '#';
			  const peg$c53 = peg$literalExpectation('#', false);
			  const peg$c54 = 'include';
			  const peg$c55 = peg$literalExpectation('include', false);
			  const peg$c56 = 'exec';
			  const peg$c57 = peg$literalExpectation('exec', false);
			  const peg$c58 = 'tryinclude';
			  const peg$c59 = peg$literalExpectation('tryinclude', false);

			  const peg$c60 = function (action, params) {
			    return {
			      type: 'action-comment',
			      action,
			      param: params.join('').trim()
			    };
			  };

			  const peg$c61 = ';--';
			  const peg$c62 = peg$literalExpectation(';--', false);
			  const peg$c63 = '--;';
			  const peg$c64 = peg$literalExpectation('--;', false);
			  const peg$c65 = peg$anyExpectation();

			  const peg$c66 = function () {
			    var _text$match;

			    return {
			      type: 'comment',
			      comment: (_text$match = text().match(/^;\x2D\x2D([\s\S]*?)\x2D\x2D;/)) === null || _text$match === void 0 ? void 0 : _text$match[1].trim()
			    };
			  };

			  const peg$c67 = peg$otherExpectation('whitespacing');
			  const peg$c68 = /^[ \t\r]/;
			  const peg$c69 = peg$classExpectation([' ', '\t', '\r'], false, false);
			  let peg$currPos = 0;
			  let peg$savedPos = 0;
			  const peg$posDetailsCache = [{
			    line: 1,
			    column: 1
			  }];
			  let peg$maxFailPos = 0;
			  let peg$maxFailExpected = [];
			  let peg$silentFails = 0;
			  const peg$resultsCache = {};
			  let peg$result;

			  if (options.startRule !== undefined) {
			    if (!(options.startRule in peg$startRuleFunctions)) {
			      throw new Error('Can\'t start parsing from rule "' + options.startRule + '".');
			    }

			    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
			  }

			  function text() {
			    return input.substring(peg$savedPos, peg$currPos);
			  }

			  function location() {
			    return peg$computeLocation(peg$savedPos, peg$currPos);
			  }

			  function peg$literalExpectation(text1, ignoreCase) {
			    return {
			      type: 'literal',
			      text: text1,
			      ignoreCase: ignoreCase
			    };
			  }

			  function peg$classExpectation(parts, inverted, ignoreCase) {
			    return {
			      type: 'class',
			      parts: parts,
			      inverted: inverted,
			      ignoreCase: ignoreCase
			    };
			  }

			  function peg$anyExpectation() {
			    return {
			      type: 'any'
			    };
			  }

			  function peg$endExpectation() {
			    return {
			      type: 'end'
			    };
			  }

			  function peg$otherExpectation(description) {
			    return {
			      type: 'other',
			      description: description
			    };
			  }

			  function peg$computePosDetails(pos) {
			    let details = peg$posDetailsCache[pos];
			    let p;

			    if (details) {
			      return details;
			    } else {
			      p = pos - 1;

			      while (!peg$posDetailsCache[p]) {
			        p--;
			      }

			      details = peg$posDetailsCache[p];
			      details = {
			        line: details.line,
			        column: details.column
			      };

			      while (p < pos) {
			        if (input.charCodeAt(p) === 10) {
			          details.line++;
			          details.column = 1;
			        } else {
			          details.column++;
			        }

			        p++;
			      }

			      peg$posDetailsCache[pos] = details;
			      return details;
			    }
			  }

			  function peg$computeLocation(startPos, endPos) {
			    const startPosDetails = peg$computePosDetails(startPos);
			    const endPosDetails = peg$computePosDetails(endPos);
			    return {
			      start: {
			        offset: startPos,
			        line: startPosDetails.line,
			        column: startPosDetails.column
			      },
			      end: {
			        offset: endPos,
			        line: endPosDetails.line,
			        column: endPosDetails.column
			      }
			    };
			  }

			  function peg$fail(expected1) {
			    if (peg$currPos < peg$maxFailPos) {
			      return;
			    }

			    if (peg$currPos > peg$maxFailPos) {
			      peg$maxFailPos = peg$currPos;
			      peg$maxFailExpected = [];
			    }

			    peg$maxFailExpected.push(expected1);
			  }

			  function peg$buildStructuredError(expected1, found, location1) {
			    return new SyntaxError$1(SyntaxError$1.buildMessage(expected1, found), expected1, found, location1);
			  }

			  function peg$parseIni() {
			    let s0, s1, s2, s3, s4, s5;
			    const key = peg$currPos * 15 + 0;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parseLine();

			    if (s1 !== peg$FAILED) {
			      s2 = [];
			      s3 = peg$currPos;
			      s4 = [];

			      if (peg$c0.test(input.charAt(peg$currPos))) {
			        s5 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s5 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c1);
			        }
			      }

			      if (s5 !== peg$FAILED) {
			        while (s5 !== peg$FAILED) {
			          s4.push(s5);

			          if (peg$c0.test(input.charAt(peg$currPos))) {
			            s5 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s5 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c1);
			            }
			          }
			        }
			      } else {
			        s4 = peg$FAILED;
			      }

			      if (s4 !== peg$FAILED) {
			        s5 = peg$parseLine();

			        if (s5 !== peg$FAILED) {
			          peg$savedPos = s3;
			          s4 = peg$c2(s1, s5);
			          s3 = s4;
			        } else {
			          peg$currPos = s3;
			          s3 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s3;
			        s3 = peg$FAILED;
			      }

			      while (s3 !== peg$FAILED) {
			        s2.push(s3);
			        s3 = peg$currPos;
			        s4 = [];

			        if (peg$c0.test(input.charAt(peg$currPos))) {
			          s5 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s5 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c1);
			          }
			        }

			        if (s5 !== peg$FAILED) {
			          while (s5 !== peg$FAILED) {
			            s4.push(s5);

			            if (peg$c0.test(input.charAt(peg$currPos))) {
			              s5 = input.charAt(peg$currPos);
			              peg$currPos++;
			            } else {
			              s5 = peg$FAILED;

			              if (peg$silentFails === 0) {
			                peg$fail(peg$c1);
			              }
			            }
			          }
			        } else {
			          s4 = peg$FAILED;
			        }

			        if (s4 !== peg$FAILED) {
			          s5 = peg$parseLine();

			          if (s5 !== peg$FAILED) {
			            peg$savedPos = s3;
			            s4 = peg$c2(s1, s5);
			            s3 = s4;
			          } else {
			            peg$currPos = s3;
			            s3 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s3;
			          s3 = peg$FAILED;
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c0.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c1);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c0.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c1);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          peg$savedPos = s0;
			          s1 = peg$c3(s1, s2);
			          s0 = s1;
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    if (s0 === peg$FAILED) {
			      s0 = null;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseLine() {
			    let s0, s1, s2;
			    const key = peg$currPos * 15 + 1;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parseAppendSection();

			    if (s1 === peg$FAILED) {
			      s1 = peg$parseTemplateSection();

			      if (s1 === peg$FAILED) {
			        s1 = peg$parseActionComment();

			        if (s1 === peg$FAILED) {
			          s1 = peg$parseObjectEntry();

			          if (s1 === peg$FAILED) {
			            s1 = peg$parseSection();

			            if (s1 === peg$FAILED) {
			              s1 = peg$parseEntry();

			              if (s1 === peg$FAILED) {
			                s1 = peg$currPos;
			                s2 = peg$parse_();

			                if (s2 !== peg$FAILED) {
			                  peg$savedPos = s1;
			                  s2 = peg$c4();
			                }

			                s1 = s2;
			              }
			            }
			          }
			        }
			      }
			    }

			    if (s1 !== peg$FAILED) {
			      s2 = peg$parseBlockComment();

			      if (s2 === peg$FAILED) {
			        s2 = peg$parseComment();
			      }

			      if (s2 === peg$FAILED) {
			        s2 = null;
			      }

			      if (s2 !== peg$FAILED) {
			        peg$savedPos = s0;
			        s1 = peg$c5(s1, s2);
			        s0 = s1;
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseSection() {
			    let s0, s1, s2, s3, s4, s5;
			    const key = peg$currPos * 15 + 2;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      if (input.charCodeAt(peg$currPos) === 91) {
			        s2 = peg$c6;
			        peg$currPos++;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c7);
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c8.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c9);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c8.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c9);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          if (input.charCodeAt(peg$currPos) === 93) {
			            s4 = peg$c10;
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c11);
			            }
			          }

			          if (s4 !== peg$FAILED) {
			            s5 = peg$parse_();

			            if (s5 !== peg$FAILED) {
			              peg$savedPos = s0;
			              s1 = peg$c12(s3);
			              s0 = s1;
			            } else {
			              peg$currPos = s0;
			              s0 = peg$FAILED;
			            }
			          } else {
			            peg$currPos = s0;
			            s0 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseComment() {
			    let s0, s1, s2, s3, s4;
			    const key = peg$currPos * 15 + 3;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      if (peg$c13.test(input.charAt(peg$currPos))) {
			        s2 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c14);
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c15.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c16);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c15.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c16);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          peg$savedPos = s0;
			          s1 = peg$c17(s3);
			          s0 = s1;
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseEntry() {
			    let s0, s1, s2, s3, s4, s5, s6, s7, s8;
			    const key = peg$currPos * 15 + 4;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      s2 = [];

			      if (peg$c18.test(input.charAt(peg$currPos))) {
			        s3 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s3 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c19);
			        }
			      }

			      if (s3 !== peg$FAILED) {
			        while (s3 !== peg$FAILED) {
			          s2.push(s3);

			          if (peg$c18.test(input.charAt(peg$currPos))) {
			            s3 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s3 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c19);
			            }
			          }
			        }
			      } else {
			        s2 = peg$FAILED;
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = peg$parse_();

			        if (s3 !== peg$FAILED) {
			          s4 = peg$currPos;

			          if (input.charCodeAt(peg$currPos) === 61) {
			            s5 = peg$c20;
			            peg$currPos++;
			          } else {
			            s5 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c21);
			            }
			          }

			          if (s5 !== peg$FAILED) {
			            s6 = peg$parse_();

			            if (s6 !== peg$FAILED) {
			              s7 = [];

			              if (peg$c22.test(input.charAt(peg$currPos))) {
			                s8 = input.charAt(peg$currPos);
			                peg$currPos++;
			              } else {
			                s8 = peg$FAILED;

			                if (peg$silentFails === 0) {
			                  peg$fail(peg$c23);
			                }
			              }

			              while (s8 !== peg$FAILED) {
			                s7.push(s8);

			                if (peg$c22.test(input.charAt(peg$currPos))) {
			                  s8 = input.charAt(peg$currPos);
			                  peg$currPos++;
			                } else {
			                  s8 = peg$FAILED;

			                  if (peg$silentFails === 0) {
			                    peg$fail(peg$c23);
			                  }
			                }
			              }

			              if (s7 !== peg$FAILED) {
			                peg$savedPos = s4;
			                s5 = peg$c24(s2, s7);
			                s4 = s5;
			              } else {
			                peg$currPos = s4;
			                s4 = peg$FAILED;
			              }
			            } else {
			              peg$currPos = s4;
			              s4 = peg$FAILED;
			            }
			          } else {
			            peg$currPos = s4;
			            s4 = peg$FAILED;
			          }

			          if (s4 === peg$FAILED) {
			            s4 = null;
			          }

			          if (s4 !== peg$FAILED) {
			            peg$savedPos = s0;
			            s1 = peg$c25(s2, s4);
			            s0 = s1;
			          } else {
			            peg$currPos = s0;
			            s0 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseTemplateSection() {
			    let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
			    const key = peg$currPos * 15 + 5;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      if (input.charCodeAt(peg$currPos) === 91) {
			        s2 = peg$c6;
			        peg$currPos++;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c7);
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c8.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c9);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c8.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c9);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          if (input.charCodeAt(peg$currPos) === 93) {
			            s4 = peg$c10;
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c11);
			            }
			          }

			          if (s4 !== peg$FAILED) {
			            s5 = peg$currPos;

			            if (input.charCodeAt(peg$currPos) === 40) {
			              s6 = peg$c26;
			              peg$currPos++;
			            } else {
			              s6 = peg$FAILED;

			              if (peg$silentFails === 0) {
			                peg$fail(peg$c27);
			              }
			            }

			            if (s6 !== peg$FAILED) {
			              s7 = peg$parse_();

			              if (s7 !== peg$FAILED) {
			                s8 = peg$parseTemplateName();

			                if (s8 !== peg$FAILED) {
			                  s9 = peg$parse_();

			                  if (s9 !== peg$FAILED) {
			                    s10 = [];
			                    s11 = peg$currPos;

			                    if (input.charCodeAt(peg$currPos) === 44) {
			                      s12 = peg$c28;
			                      peg$currPos++;
			                    } else {
			                      s12 = peg$FAILED;

			                      if (peg$silentFails === 0) {
			                        peg$fail(peg$c29);
			                      }
			                    }

			                    if (s12 !== peg$FAILED) {
			                      s13 = peg$parse_();

			                      if (s13 !== peg$FAILED) {
			                        s14 = peg$parseTemplateName();

			                        if (s14 !== peg$FAILED) {
			                          s15 = peg$parse_();

			                          if (s15 !== peg$FAILED) {
			                            peg$savedPos = s11;
			                            s12 = peg$c30(s3, s8, s14);
			                            s11 = s12;
			                          } else {
			                            peg$currPos = s11;
			                            s11 = peg$FAILED;
			                          }
			                        } else {
			                          peg$currPos = s11;
			                          s11 = peg$FAILED;
			                        }
			                      } else {
			                        peg$currPos = s11;
			                        s11 = peg$FAILED;
			                      }
			                    } else {
			                      peg$currPos = s11;
			                      s11 = peg$FAILED;
			                    }

			                    while (s11 !== peg$FAILED) {
			                      s10.push(s11);
			                      s11 = peg$currPos;

			                      if (input.charCodeAt(peg$currPos) === 44) {
			                        s12 = peg$c28;
			                        peg$currPos++;
			                      } else {
			                        s12 = peg$FAILED;

			                        if (peg$silentFails === 0) {
			                          peg$fail(peg$c29);
			                        }
			                      }

			                      if (s12 !== peg$FAILED) {
			                        s13 = peg$parse_();

			                        if (s13 !== peg$FAILED) {
			                          s14 = peg$parseTemplateName();

			                          if (s14 !== peg$FAILED) {
			                            s15 = peg$parse_();

			                            if (s15 !== peg$FAILED) {
			                              peg$savedPos = s11;
			                              s12 = peg$c30(s3, s8, s14);
			                              s11 = s12;
			                            } else {
			                              peg$currPos = s11;
			                              s11 = peg$FAILED;
			                            }
			                          } else {
			                            peg$currPos = s11;
			                            s11 = peg$FAILED;
			                          }
			                        } else {
			                          peg$currPos = s11;
			                          s11 = peg$FAILED;
			                        }
			                      } else {
			                        peg$currPos = s11;
			                        s11 = peg$FAILED;
			                      }
			                    }

			                    if (s10 !== peg$FAILED) {
			                      s11 = peg$parse_();

			                      if (s11 !== peg$FAILED) {
			                        if (input.charCodeAt(peg$currPos) === 41) {
			                          s12 = peg$c31;
			                          peg$currPos++;
			                        } else {
			                          s12 = peg$FAILED;

			                          if (peg$silentFails === 0) {
			                            peg$fail(peg$c32);
			                          }
			                        }

			                        if (s12 !== peg$FAILED) {
			                          peg$savedPos = s5;
			                          s6 = peg$c33(s3, s8, s10);
			                          s5 = s6;
			                        } else {
			                          peg$currPos = s5;
			                          s5 = peg$FAILED;
			                        }
			                      } else {
			                        peg$currPos = s5;
			                        s5 = peg$FAILED;
			                      }
			                    } else {
			                      peg$currPos = s5;
			                      s5 = peg$FAILED;
			                    }
			                  } else {
			                    peg$currPos = s5;
			                    s5 = peg$FAILED;
			                  }
			                } else {
			                  peg$currPos = s5;
			                  s5 = peg$FAILED;
			                }
			              } else {
			                peg$currPos = s5;
			                s5 = peg$FAILED;
			              }
			            } else {
			              peg$currPos = s5;
			              s5 = peg$FAILED;
			            }

			            if (s5 !== peg$FAILED) {
			              s6 = peg$parse_();

			              if (s6 !== peg$FAILED) {
			                peg$savedPos = s0;
			                s1 = peg$c34(s3, s5);
			                s0 = s1;
			              } else {
			                peg$currPos = s0;
			                s0 = peg$FAILED;
			              }
			            } else {
			              peg$currPos = s0;
			              s0 = peg$FAILED;
			            }
			          } else {
			            peg$currPos = s0;
			            s0 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseTemplateName() {
			    let s0, s1, s2;
			    const key = peg$currPos * 15 + 6;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    if (input.charCodeAt(peg$currPos) === 33) {
			      s0 = peg$c35;
			      peg$currPos++;
			    } else {
			      s0 = peg$FAILED;

			      if (peg$silentFails === 0) {
			        peg$fail(peg$c36);
			      }
			    }

			    if (s0 === peg$FAILED) {
			      s0 = peg$currPos;
			      s1 = [];

			      if (peg$c37.test(input.charAt(peg$currPos))) {
			        s2 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c38);
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        while (s2 !== peg$FAILED) {
			          s1.push(s2);

			          if (peg$c37.test(input.charAt(peg$currPos))) {
			            s2 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s2 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c38);
			            }
			          }
			        }
			      } else {
			        s1 = peg$FAILED;
			      }

			      if (s1 !== peg$FAILED) {
			        peg$savedPos = s0;
			        s1 = peg$c39();
			      }

			      s0 = s1;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseObjectEntry() {
			    let s0, s1, s2, s3, s4, s5, s6, s7;
			    const key = peg$currPos * 15 + 7;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      s2 = [];

			      if (peg$c18.test(input.charAt(peg$currPos))) {
			        s3 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s3 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c19);
			        }
			      }

			      if (s3 !== peg$FAILED) {
			        while (s3 !== peg$FAILED) {
			          s2.push(s3);

			          if (peg$c18.test(input.charAt(peg$currPos))) {
			            s3 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s3 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c19);
			            }
			          }
			        }
			      } else {
			        s2 = peg$FAILED;
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = peg$parse_();

			        if (s3 !== peg$FAILED) {
			          if (input.substr(peg$currPos, 2) === peg$c40) {
			            s4 = peg$c40;
			            peg$currPos += 2;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c41);
			            }
			          }

			          if (s4 !== peg$FAILED) {
			            s5 = peg$parse_();

			            if (s5 !== peg$FAILED) {
			              s6 = [];

			              if (peg$c22.test(input.charAt(peg$currPos))) {
			                s7 = input.charAt(peg$currPos);
			                peg$currPos++;
			              } else {
			                s7 = peg$FAILED;

			                if (peg$silentFails === 0) {
			                  peg$fail(peg$c23);
			                }
			              }

			              while (s7 !== peg$FAILED) {
			                s6.push(s7);

			                if (peg$c22.test(input.charAt(peg$currPos))) {
			                  s7 = input.charAt(peg$currPos);
			                  peg$currPos++;
			                } else {
			                  s7 = peg$FAILED;

			                  if (peg$silentFails === 0) {
			                    peg$fail(peg$c23);
			                  }
			                }
			              }

			              if (s6 !== peg$FAILED) {
			                peg$savedPos = s0;
			                s1 = peg$c25(s2, s6);
			                s0 = s1;
			              } else {
			                peg$currPos = s0;
			                s0 = peg$FAILED;
			              }
			            } else {
			              peg$currPos = s0;
			              s0 = peg$FAILED;
			            }
			          } else {
			            peg$currPos = s0;
			            s0 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseAppendSection() {
			    let s0, s1, s2, s3, s4, s5, s6, s7, s8;
			    const key = peg$currPos * 15 + 8;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parse_();

			    if (s1 !== peg$FAILED) {
			      if (input.charCodeAt(peg$currPos) === 91) {
			        s2 = peg$c6;
			        peg$currPos++;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c7);
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c8.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c9);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c8.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c9);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          if (input.charCodeAt(peg$currPos) === 93) {
			            s4 = peg$c10;
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c11);
			            }
			          }

			          if (s4 !== peg$FAILED) {
			            if (input.charCodeAt(peg$currPos) === 40) {
			              s5 = peg$c26;
			              peg$currPos++;
			            } else {
			              s5 = peg$FAILED;

			              if (peg$silentFails === 0) {
			                peg$fail(peg$c27);
			              }
			            }

			            if (s5 !== peg$FAILED) {
			              if (input.charCodeAt(peg$currPos) === 43) {
			                s6 = peg$c42;
			                peg$currPos++;
			              } else {
			                s6 = peg$FAILED;

			                if (peg$silentFails === 0) {
			                  peg$fail(peg$c43);
			                }
			              }

			              if (s6 !== peg$FAILED) {
			                s7 = peg$parseAppendSectionConditions();

			                if (s7 === peg$FAILED) {
			                  s7 = null;
			                }

			                if (s7 !== peg$FAILED) {
			                  if (input.charCodeAt(peg$currPos) === 41) {
			                    s8 = peg$c31;
			                    peg$currPos++;
			                  } else {
			                    s8 = peg$FAILED;

			                    if (peg$silentFails === 0) {
			                      peg$fail(peg$c32);
			                    }
			                  }

			                  if (s8 !== peg$FAILED) {
			                    peg$savedPos = s0;
			                    s1 = peg$c44(s3, s7);
			                    s0 = s1;
			                  } else {
			                    peg$currPos = s0;
			                    s0 = peg$FAILED;
			                  }
			                } else {
			                  peg$currPos = s0;
			                  s0 = peg$FAILED;
			                }
			              } else {
			                peg$currPos = s0;
			                s0 = peg$FAILED;
			              }
			            } else {
			              peg$currPos = s0;
			              s0 = peg$FAILED;
			            }
			          } else {
			            peg$currPos = s0;
			            s0 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseAppendSectionConditions() {
			    let s0, s1, s2, s3, s4, s5;
			    const key = peg$currPos * 15 + 9;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = peg$parseAppendSectionCondition();

			    if (s1 !== peg$FAILED) {
			      s2 = [];
			      s3 = peg$currPos;

			      if (input.charCodeAt(peg$currPos) === 44) {
			        s4 = peg$c28;
			        peg$currPos++;
			      } else {
			        s4 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c29);
			        }
			      }

			      if (s4 !== peg$FAILED) {
			        s5 = peg$parseAppendSectionCondition();

			        if (s5 !== peg$FAILED) {
			          peg$savedPos = s3;
			          s4 = peg$c45(s1, s5);
			          s3 = s4;
			        } else {
			          peg$currPos = s3;
			          s3 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s3;
			        s3 = peg$FAILED;
			      }

			      while (s3 !== peg$FAILED) {
			        s2.push(s3);
			        s3 = peg$currPos;

			        if (input.charCodeAt(peg$currPos) === 44) {
			          s4 = peg$c28;
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c29);
			          }
			        }

			        if (s4 !== peg$FAILED) {
			          s5 = peg$parseAppendSectionCondition();

			          if (s5 !== peg$FAILED) {
			            peg$savedPos = s3;
			            s4 = peg$c45(s1, s5);
			            s3 = s4;
			          } else {
			            peg$currPos = s3;
			            s3 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s3;
			          s3 = peg$FAILED;
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        peg$savedPos = s0;
			        s1 = peg$c46(s1, s2);
			        s0 = s1;
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseAppendSectionCondition() {
			    let s0, s1, s2, s3, s4;
			    const key = peg$currPos * 15 + 10;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;
			    s1 = [];

			    if (peg$c47.test(input.charAt(peg$currPos))) {
			      s2 = input.charAt(peg$currPos);
			      peg$currPos++;
			    } else {
			      s2 = peg$FAILED;

			      if (peg$silentFails === 0) {
			        peg$fail(peg$c48);
			      }
			    }

			    if (s2 !== peg$FAILED) {
			      while (s2 !== peg$FAILED) {
			        s1.push(s2);

			        if (peg$c47.test(input.charAt(peg$currPos))) {
			          s2 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s2 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c48);
			          }
			        }
			      }
			    } else {
			      s1 = peg$FAILED;
			    }

			    if (s1 !== peg$FAILED) {
			      if (input.charCodeAt(peg$currPos) === 61) {
			        s2 = peg$c20;
			        peg$currPos++;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c21);
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c49.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c50);
			          }
			        }

			        if (s4 !== peg$FAILED) {
			          while (s4 !== peg$FAILED) {
			            s3.push(s4);

			            if (peg$c49.test(input.charAt(peg$currPos))) {
			              s4 = input.charAt(peg$currPos);
			              peg$currPos++;
			            } else {
			              s4 = peg$FAILED;

			              if (peg$silentFails === 0) {
			                peg$fail(peg$c50);
			              }
			            }
			          }
			        } else {
			          s3 = peg$FAILED;
			        }

			        if (s3 !== peg$FAILED) {
			          peg$savedPos = s0;
			          s1 = peg$c51(s1, s3);
			          s0 = s1;
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseActionComment() {
			    let s0, s1, s2, s3, s4;
			    const key = peg$currPos * 15 + 11;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;

			    if (input.charCodeAt(peg$currPos) === 35) {
			      s1 = peg$c52;
			      peg$currPos++;
			    } else {
			      s1 = peg$FAILED;

			      if (peg$silentFails === 0) {
			        peg$fail(peg$c53);
			      }
			    }

			    if (s1 !== peg$FAILED) {
			      if (input.substr(peg$currPos, 7) === peg$c54) {
			        s2 = peg$c54;
			        peg$currPos += 7;
			      } else {
			        s2 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c55);
			        }
			      }

			      if (s2 === peg$FAILED) {
			        if (input.substr(peg$currPos, 4) === peg$c56) {
			          s2 = peg$c56;
			          peg$currPos += 4;
			        } else {
			          s2 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c57);
			          }
			        }

			        if (s2 === peg$FAILED) {
			          if (input.substr(peg$currPos, 10) === peg$c58) {
			            s2 = peg$c58;
			            peg$currPos += 10;
			          } else {
			            s2 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c59);
			            }
			          }
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        s3 = [];

			        if (peg$c15.test(input.charAt(peg$currPos))) {
			          s4 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s4 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c16);
			          }
			        }

			        while (s4 !== peg$FAILED) {
			          s3.push(s4);

			          if (peg$c15.test(input.charAt(peg$currPos))) {
			            s4 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s4 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c16);
			            }
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          peg$savedPos = s0;
			          s1 = peg$c60(s2, s3);
			          s0 = s1;
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parseBlockComment() {
			    let s0, s1, s2, s3, s4, s5;
			    const key = peg$currPos * 15 + 12;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    s0 = peg$currPos;

			    if (input.substr(peg$currPos, 3) === peg$c61) {
			      s1 = peg$c61;
			      peg$currPos += 3;
			    } else {
			      s1 = peg$FAILED;

			      if (peg$silentFails === 0) {
			        peg$fail(peg$c62);
			      }
			    }

			    if (s1 !== peg$FAILED) {
			      s2 = [];
			      s3 = peg$currPos;
			      s4 = peg$currPos;
			      peg$silentFails++;

			      if (input.substr(peg$currPos, 3) === peg$c63) {
			        s5 = peg$c63;
			        peg$currPos += 3;
			      } else {
			        s5 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c64);
			        }
			      }

			      peg$silentFails--;

			      if (s5 === peg$FAILED) {
			        s4 = undefined;
			      } else {
			        peg$currPos = s4;
			        s4 = peg$FAILED;
			      }

			      if (s4 !== peg$FAILED) {
			        if (input.length > peg$currPos) {
			          s5 = input.charAt(peg$currPos);
			          peg$currPos++;
			        } else {
			          s5 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c65);
			          }
			        }

			        if (s5 !== peg$FAILED) {
			          s4 = [s4, s5];
			          s3 = s4;
			        } else {
			          peg$currPos = s3;
			          s3 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s3;
			        s3 = peg$FAILED;
			      }

			      while (s3 !== peg$FAILED) {
			        s2.push(s3);
			        s3 = peg$currPos;
			        s4 = peg$currPos;
			        peg$silentFails++;

			        if (input.substr(peg$currPos, 3) === peg$c63) {
			          s5 = peg$c63;
			          peg$currPos += 3;
			        } else {
			          s5 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c64);
			          }
			        }

			        peg$silentFails--;

			        if (s5 === peg$FAILED) {
			          s4 = undefined;
			        } else {
			          peg$currPos = s4;
			          s4 = peg$FAILED;
			        }

			        if (s4 !== peg$FAILED) {
			          if (input.length > peg$currPos) {
			            s5 = input.charAt(peg$currPos);
			            peg$currPos++;
			          } else {
			            s5 = peg$FAILED;

			            if (peg$silentFails === 0) {
			              peg$fail(peg$c65);
			            }
			          }

			          if (s5 !== peg$FAILED) {
			            s4 = [s4, s5];
			            s3 = s4;
			          } else {
			            peg$currPos = s3;
			            s3 = peg$FAILED;
			          }
			        } else {
			          peg$currPos = s3;
			          s3 = peg$FAILED;
			        }
			      }

			      if (s2 !== peg$FAILED) {
			        if (input.substr(peg$currPos, 3) === peg$c63) {
			          s3 = peg$c63;
			          peg$currPos += 3;
			        } else {
			          s3 = peg$FAILED;

			          if (peg$silentFails === 0) {
			            peg$fail(peg$c64);
			          }
			        }

			        if (s3 !== peg$FAILED) {
			          peg$savedPos = s0;
			          s1 = peg$c66();
			          s0 = s1;
			        } else {
			          peg$currPos = s0;
			          s0 = peg$FAILED;
			        }
			      } else {
			        peg$currPos = s0;
			        s0 = peg$FAILED;
			      }
			    } else {
			      peg$currPos = s0;
			      s0 = peg$FAILED;
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  function peg$parse_() {
			    let s0, s1;
			    const key = peg$currPos * 15 + 13;
			    const cached = peg$resultsCache[key];

			    if (cached) {
			      peg$currPos = cached.nextPos;
			      return cached.result;
			    }

			    peg$silentFails++;
			    s0 = [];

			    if (peg$c68.test(input.charAt(peg$currPos))) {
			      s1 = input.charAt(peg$currPos);
			      peg$currPos++;
			    } else {
			      s1 = peg$FAILED;

			      if (peg$silentFails === 0) {
			        peg$fail(peg$c69);
			      }
			    }

			    while (s1 !== peg$FAILED) {
			      s0.push(s1);

			      if (peg$c68.test(input.charAt(peg$currPos))) {
			        s1 = input.charAt(peg$currPos);
			        peg$currPos++;
			      } else {
			        s1 = peg$FAILED;

			        if (peg$silentFails === 0) {
			          peg$fail(peg$c69);
			        }
			      }
			    }

			    peg$silentFails--;

			    if (s0 === peg$FAILED) {
			      s1 = peg$FAILED;

			      if (peg$silentFails === 0) {
			        peg$fail(peg$c67);
			      }
			    }

			    peg$resultsCache[key] = {
			      nextPos: peg$currPos,
			      result: s0
			    };
			    return s0;
			  }

			  peg$result = peg$startRuleFunction();

			  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
			    return peg$result;
			  } else {
			    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
			      peg$fail(peg$endExpectation());
			    }

			    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
			  }
			}

			const parse$1 = peg$parse$1;

			function buildAstConfObject(lines) {
			  const context = {
			    global: {},
			    section: {},
			    templates: {}
			  };
			  context.global[''] = context.section;

			  for (const line of lines) {
			    if (buildIniLine(line, context)) {
			      continue;
			    }

			    if (buildAsteriskConfObjectLine(line, context)) {
			      continue;
			    }

			    throw new Error(`unknown line: ${line.type}`);
			  }

			  if (!Object.keys(context.global['']).length) {
			    delete context.global[''];
			  }

			  return context.global;
			}

			function buildAsteriskConfObjectLine(line, context) {
			  const {
			    section,
			    global,
			    templates
			  } = context;

			  switch (line.type) {
			    case 'append-section':
			      {
			        const {
			          conditions
			        } = line;

			        if (!isEmptyObject(conditions)) {
			          throw new Error(`unsupported condition append: ${JSON.stringify(line)}`);
			        }

			        buildIniLine({ ...line,
			          type: 'section'
			        }, context);
			        break;
			      }

			    case 'template-section':
			      {
			        const {
			          extends: exts = [],
			          templateOnly,
			          name
			        } = line;
			        const sec = {};

			        for (const ext of exts) {
			          Object.assign(sec, templates[ext] || {});
			        }

			        if (templateOnly) {
			          context.section = templates[name] = sec;
			        } else {
			          context.section = global[name] = sec;
			        }

			        break;
			      }

			    default:
			      return false;
			  }

			  return true;
			}

			class AsteriskConfUtils {
			  parseSyntax(s) {
			    return parse$1(s);
			  }

			  parse(s) {
			    return buildAstConfObject(this.parseSyntax(s));
			  }

			  stringify(s) {
			    return stringifyIni(s);
			  }

			}

			const AsteriskConf = new AsteriskConfUtils();

			const Lang = AsteriskConf;
			const AsteriskConfPlayground = exports('AsteriskConfPlayground', () => {
			  const [theme, setTheme] = useState('prism-solarizedlight');
			  usePrismTheme(theme);
			  const [value, setValue] = React.useState(() => `
[general]
a => 1
b = 2

[base](!)
line=abc

[user](!,base)
pass=admin

[101](user)
name=wener

[101](+)
no=101
`);
			  const [json, setJson] = React.useState(() => JSON.stringify(Lang.parse(value), null, 2));
			  const [generated, setGenerated] = React.useState(() => Lang.stringify(Lang.parse(value)));
			  return /*#__PURE__*/React.createElement(Row, {
			    gutter: 16,
			    style: {}
			  }, /*#__PURE__*/React.createElement(Col, {
			    span: 12
			  }, /*#__PURE__*/React.createElement(Row, {
			    gutter: [0, 12]
			  }, /*#__PURE__*/React.createElement(Col, {
			    span: 24
			  }, /*#__PURE__*/React.createElement(Card, {
			    title: 'Asterisk Conf'
			  }, /*#__PURE__*/React.createElement(SimpleCodeEditor, {
			    value: value,
			    onChange: v => {
			      try {
			        setValue(v);
			        const o = Lang.parse(v);
			        setJson(JSON.stringify(o, null, 2));
			        setGenerated(Lang.stringify(o));
			      } catch (e) {
			        message.error(`ERROR: ${e}`);
			      }
			    },
			    language: 'ini'
			  }))), /*#__PURE__*/React.createElement(Col, {
			    span: 24
			  }, /*#__PURE__*/React.createElement(Card, {
			    title: 'Generated'
			  }, /*#__PURE__*/React.createElement(SimpleCodeEditor, {
			    value: generated,
			    onChange: setGenerated,
			    language: 'ini'
			  }))))), /*#__PURE__*/React.createElement(Col, {
			    span: 12
			  }, /*#__PURE__*/React.createElement(Card, {
			    title: "JSON",
			    extra: /*#__PURE__*/React.createElement(Button, {
			      type: "primary",
			      ghost: true,
			      onClick: () => {
			        try {
			          setGenerated(Lang.stringify(JSON.parse(json)));
			        } catch (e) {
			          message.error(`ERROR: ${e}`);
			        }
			      }
			    }, "Generated")
			  }, /*#__PURE__*/React.createElement(SimpleCodeEditor, {
			    value: json,
			    onChange: setJson,
			    language: 'json'
			  }))));
			});

			function useContainer({
			  updateState,
			  getState,
			  subscribe
			}) {
			  const onEncodedChange = v => {
			    updateState(s => {
			      s.encoded = v;
			      s.decoded = decode(v, s.decodeOptions);
			    });
			  };

			  const onDecodedChange = v => {
			    updateState(s => {
			      s.decoded = v;
			      s.encoded = encode(v, s.encodeOptions);
			    });
			  };

			  const onEncodeOptionChange = v => {
			    updateState(s => {
			      Object.assign(s.encodeOptions, v);
			    });
			  };

			  {
			    let last = getState().encodeOptions;
			    subscribe(s => {
			      if (last !== s.encodeOptions) {
			        last = s.encodeOptions;
			        updateState(s => s.encoded = encode(s.decoded, last));
			      }
			    });
			  }
			  return {
			    onEncodedChange,
			    onDecodedChange,
			    onEncodeOptionChange
			  };
			}

			const HtmlEntityContainer = createSubscriptionContainer(useContainer);

			function createInitialState() {
			  const decoded = 'Foo © bar 𝌆 baz ☃ qux : 1 > 2';
			  const encodeOptions = {
			    useNamedReferences: true,
			    decimal: false,
			    encodeEverything: false,
			    strict: false,
			    allowUnsafeSymbols: false
			  };
			  return {
			    decoded,
			    encoded: encode(decoded, encodeOptions),
			    encodeOptions,
			    decodeOptions: {
			      isAttributeValue: false,
			      strict: false
			    }
			  };
			}

			const HtmlEntitiesPlayground = exports('HtmlEntitiesPlayground', () => {
			  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HtmlEntityContainer.Provider, {
			    initialState: createInitialState()
			  }, /*#__PURE__*/React.createElement(HtmlEntitiesContent, null)), /*#__PURE__*/React.createElement("div", {
			    style: {
			      marginTop: 18
			    }
			  }, /*#__PURE__*/React.createElement(Alert, {
			    type: "info",
			    showIcon: true,
			    message: /*#__PURE__*/React.createElement("div", null, "\u5B9E\u73B0\u57FA\u4E8E", /*#__PURE__*/React.createElement("a", {
			      href: "https://www.npmjs.com/package/he",
			      rel: "noopener"
			    }, "he"), /*#__PURE__*/React.createElement("br", null))
			  })));
			});
			const HtmlEntitiesContent = exports('HtmlEntitiesContent', () => {
			  const {
			    onEncodedChange,
			    onDecodedChange
			  } = HtmlEntityContainer.useContainer();
			  const {
			    encoded,
			    decoded
			  } = HtmlEntityContainer.useSelector(({
			    encoded,
			    decoded
			  }) => ({
			    encoded,
			    decoded
			  }));
			  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, {
			    gutter: 16
			  }, /*#__PURE__*/React.createElement(Col, {
			    span: 12
			  }, /*#__PURE__*/React.createElement(Card, {
			    title: 'HTML Entities'
			  }, /*#__PURE__*/React.createElement(Input.TextArea, {
			    rows: 10,
			    value: decoded,
			    onChange: v => {
			      onDecodedChange(v.target.value);
			    }
			  }), /*#__PURE__*/React.createElement(EncodeOption, null))), /*#__PURE__*/React.createElement(Col, {
			    span: 12
			  }, /*#__PURE__*/React.createElement(Card, {
			    title: 'Encoded'
			  }, /*#__PURE__*/React.createElement(Input.TextArea, {
			    rows: 10,
			    value: encoded,
			    onChange: v => onEncodedChange(v.target.value)
			  })))));
			});

			const EncodeOption = () => {
			  const {
			    onEncodeOptionChange
			  } = HtmlEntityContainer.useContainer();
			  const {
			    useNamedReferences,
			    allowUnsafeSymbols,
			    encodeEverything
			  } = HtmlEntityContainer.useSelector(({
			    encodeOptions: {
			      useNamedReferences,
			      allowUnsafeSymbols,
			      encodeEverything
			    }
			  }) => ({
			    useNamedReferences,
			    allowUnsafeSymbols,
			    encodeEverything
			  }));
			  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement(Checkbox, {
			    checked: encodeEverything,
			    onChange: v => onEncodeOptionChange({
			      encodeEverything: v.target.checked
			    })
			  }), "\u7F16\u7801\u6240\u6709\u5B57\u7B26 - \u5373\u4FBF\u662F\u5B89\u5168\u7684\u975E ASCII \u5B57\u7B26")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement(Checkbox, {
			    checked: allowUnsafeSymbols,
			    onChange: v => onEncodeOptionChange({
			      allowUnsafeSymbols: v.target.checked
			    })
			  }), "\u5141\u8BB8\u4E0D\u5B89\u5168\u5B57\u7B26")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement(Checkbox, {
			    checked: useNamedReferences,
			    onChange: v => onEncodeOptionChange({
			      useNamedReferences: v.target.checked
			    })
			  }), "\u5141\u8BB8\u4F7F\u7528\u547D\u540D\u7684\u5B57\u7B26\u5F15\u7528")));
			};

		}
	};
});
//# sourceMappingURL=wener-apis-langs.system.js.map
