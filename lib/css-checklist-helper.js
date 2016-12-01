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
    key: 'getFuncForCheckList',
    value: function getFuncForCheckList(element) {
      var funcCheckList = {};
      this.priority.forEach(function (checkList) {
        if (checkList === 'tag') funcCheckList[checkList] = $(element).prop;else funcCheckList[checkList] = $(element).attr;
      });
      return funcCheckList;
    }
  }, {
    key: 'getCheckList',
    value: function getCheckList(element) {
      var funcCheckList = this.getFuncForCheckList(element);
      var checkListValues = {};
      this.priority.forEach(function (checkList) {
        return checkListValues[checkList] = funcCheckList(element);
      });
      if (this.priority.tag) checkListValues.tag = checkListValues.tag.toLowerCase();
      return checkListValues;
    }
  }, {
    key: 'getIgnoredValues',
    value: function getIgnoredValues(key, values) {
      return this.ignore[key] ? this.ignore[key].filter(function (value) {
        return values.indexOf(value) > -1;
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
      var _this = this;

      var checkListKeys = Object.keys(checkList);
      var newCheckList = {};
      checkListKeys.forEach(function (key) {
        newCheckList[key] = checkList[key];
        if (_this.ignoreFunc) newCheckList[key] = _this.getIgnoredValuesFromFunc(key, newCheckList[key]);
        if (_this.ignore) newCheckList[key] = _this.getIgnoredValues(key, newCheckList[key]);
      });
      return newCheckList;
    }
  }]);

  return CssCheckList;
}();

exports.default = CssCheckList;