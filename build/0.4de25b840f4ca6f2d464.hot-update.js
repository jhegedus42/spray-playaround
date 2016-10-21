webpackHotUpdate(0,{

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(78);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(110);

	var _reactSortableHoc = __webpack_require__(248);

	var _jquery = __webpack_require__(389);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import React from 'react';
	// import ReactDOM from 'react-dom';
	// import App from './components/App.jsx';
	//
	// ReactDOM.render(
	//   <App />,
	//   document.body.appendChild(document.createElement('div'))
	// );

	var SortableItem = (0, _reactSortableHoc.SortableElement)(function (_ref) {
	    var value = _ref.value;
	    return _react2.default.createElement(
	        'li',
	        null,
	        value,
	        ' '
	    );
	});

	var SortableList = (0, _reactSortableHoc.SortableContainer)(function (_ref2) {
	    var items = _ref2.items;

	    return _react2.default.createElement(
	        'ul',
	        null,
	        items.map(function (value, index) {
	            return _react2.default.createElement(SortableItem, { key: 'item-' + index, index: index, value: value });
	        })
	    );
	});

	var SortableComponent = function (_Component) {
	    _inherits(SortableComponent, _Component);

	    function SortableComponent() {
	        var _ref3;

	        var _temp, _this, _ret;

	        _classCallCheck(this, SortableComponent);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = SortableComponent.__proto__ || Object.getPrototypeOf(SortableComponent)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
	            items: ['Item 2', 'Item 1', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
	        }, _this.onSortEnd = function (_ref4) {
	            var oldIndex = _ref4.oldIndex;
	            var newIndex = _ref4.newIndex;

	            _this.setState({
	                items: (0, _reactSortableHoc.arrayMove)(_this.state.items, oldIndex, newIndex)
	            });

	            var bla = _this.state.items;
	            _jquery2.default.ajax({
	                url: "http://localhost:3300/api/comments",
	                dataType: 'json',
	                type: 'POST',
	                data: bla
	            });
	            console.log('bla=' + _this.state.items);
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(SortableComponent, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(SortableList, { items: this.state.items, onSortEnd: this.onSortEnd });
	        }
	    }]);

	    return SortableComponent;
	}(_react.Component);

	(0, _reactDom.render)(_react2.default.createElement(SortableComponent, null), document.body.appendChild(document.createElement('div')));

/***/ }

})