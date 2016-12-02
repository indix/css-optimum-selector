'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CssCheckList = function () {
  function CssCheckList(props) {
    _classCallCheck(this, CssCheckList);

    this.ignore = props && props.ignore || null;
    this.ignoreFunc = props && props.ignoreFunc || null;
    this.root = props && props.root || 'html';
    this.priority = props && props.priority || _defaults2.default.priority;
    this.relativeDepth = props && props.relativeDepth || _defaults2.default.relativeDepth;
  }

  _createClass(CssCheckList, [{
    key: 'getCheckList',
    value: function getCheckList(element) {
      var checkListValues = {};
      this.priority.forEach(function (checkList) {
        var value = null;
        if (checkList === 'tag') value = element.prop('tagName').toLowerCase();else {
          value = element.attr(checkList);
          value = value ? value.split(" ") : null;
        }
        if (value) checkListValues[checkList] = Array.isArray(value) && value || [value];
      });
      return checkListValues;
    }
  }, {
    key: 'getIgnoredValues',
    value: function getIgnoredValues(key, values) {
      var _this = this;

      return this.ignore[key] ? values.filter(function (value) {
        return !(_this.ignore[key].indexOf(value) > -1);
      }) : values;
    }
  }, {
    key: 'getIgnoredValuesFromFunc',
    value: function getIgnoredValuesFromFunc(key, values) {
      return this.ignoreFunc[key] ? this.ignoreFunc[key](values) : values;
    }
  }, {
    key: 'getFilteredCheckList',
    value: function getFilteredCheckList(checkList) {
      var _this2 = this;

      var checkListKeys = Object.keys(checkList);
      var newCheckList = {};
      checkListKeys.forEach(function (key) {
        newCheckList[key] = checkList[key];
        if (_this2.ignoreFunc) newCheckList[key] = _this2.getIgnoredValuesFromFunc(key, newCheckList[key]);
        if (_this2.ignore) newCheckList[key] = _this2.getIgnoredValues(key, newCheckList[key]);
      });
      return newCheckList;
    }
  }]);

  return CssCheckList;
}();

exports.default = CssCheckList;