"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// main.jsx — React with JSX syntax (Chapter 4 approach)
// This file must be transpiled by Babel before it can run in the browser:
//   npx babel main.jsx --out-file main.js
// JSX lets us write HTML-like syntax directly within JavaScript,
// which Babel compiles down to React.createElement() calls.

function start() {
  var CourseCard = /*#__PURE__*/function (_React$Component) {
    function CourseCard(props) {
      var _this;
      _classCallCheck(this, CourseCard);
      _this = _callSuper(this, CourseCard, [props]);
      _defineProperty(_this, "title", _this.props.title);
      _defineProperty(_this, "titleStyle", {
        color: "#0064a4"
      });
      console.log("CourseCard component created:", props.title);
      return _this;
    }
    _inherits(CourseCard, _React$Component);
    return _createClass(CourseCard, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        return /*#__PURE__*/React.createElement("li", {
          className: "card"
        }, /*#__PURE__*/React.createElement("h2", {
          style: this.titleStyle
        }, this.title), /*#__PURE__*/React.createElement("a", {
          href: this.props.href,
          target: "_blank",
          rel: "noopener noreferrer"
        }, this.props.description), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            if (_this2.title.includes("✓")) {
              _this2.title = _this2.title.replace(" ✓", "");
            } else {
              _this2.title = _this2.title + " ✓";
            }
            _this2.setState({});
          }
        }, "Mark Visited"));
      }
    }]);
  }(React.Component); // ReactDOM.render() mounts the React component tree into the real DOM.
  _defineProperty(CourseCard, "defaultProps", {
    description: "No description available"
  });
  _defineProperty(CourseCard, "propTypes", {
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    description: PropTypes.string
  });
  ReactDOM.render(/*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", null, "My Course Resources"), /*#__PURE__*/React.createElement("p", null, "Built with React JSX \u2014 transpiled by Babel"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement(CourseCard, {
    title: "React Documentation",
    href: "https://react.dev",
    description: "Official React docs — learn React fundamentals"
  }), /*#__PURE__*/React.createElement(CourseCard, {
    title: "Eloquent JavaScript",
    href: "https://eloquentjavascript.net",
    description: "A modern intro to programming by Marijn Haverbeke"
  }), /*#__PURE__*/React.createElement(CourseCard, {
    title: "MDN Web Docs",
    href: "https://developer.mozilla.org",
    description: "Comprehensive web technology references"
  }), /*#__PURE__*/React.createElement(CourseCard, {
    title: "UCI SWE 250P",
    href: "https://www.uci.edu"
  }))), document.getElementById("mainContainer"));
}
