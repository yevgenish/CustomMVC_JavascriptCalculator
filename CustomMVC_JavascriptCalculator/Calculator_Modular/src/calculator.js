
var calculator = function () {
	var signs = {
		standard: ['+', '-', '*', '/'],
		scientific: ['+', '-', '*', '/', 'x ^ y', 'x root y'],
		programmer: ['+', '-', '*', '/', 'x mod y']
	};

	var data = {
		calcSign: null,
		leftVal: null,
		rightVal: null
	};

	var domElements = {
			$mainArea: null,
			$calcTypes: null,
			$txtLeft: null,
			$txtRight: null,
			$selSign: null,
			$calcResult: null,
			fnGetCheckedCalcTypeValue: null,
			fnGetSelectedSignValue: null
	};

	var messages = {
		invalid_input: 'Invalid input fields'
	};

	var init = function () {
		cacheDom();
		bindEvents();
		fillCalcType();
	};

	var cacheDom = function () {
		domElements.$mainArea = $('.main-area');
		domElements.$calcTypes = domElements.$mainArea.find('.calc-types');
		domElements.$txtLeft = domElements.$mainArea.find('#txtLeft');
		domElements.$txtRight = domElements.$mainArea.find('#txtRight');
		domElements.$selSign = domElements.$mainArea.find('#selSign');
		domElements.$calcResult = domElements.$mainArea.find('#calcResult');
		domElements.fnGetCheckedCalcTypeValue = function () {
			return domElements.$calcTypes.find('input:radio[name="calc-type"]:checked').val();
		};
		domElements.fnGetSelectedSignValue = function () {
			return domElements.$selSign.children("option:selected").val();
		}
	};

	var bindEvents = function () {

		domElements.$calcTypes.on('change', fillCalcType);

		domElements.$txtLeft.on('change', function () {
			data.leftVal = $(this).val();
			calculate();
		});

		domElements.$txtRight.on('change', function () {
			data.rightVal = $(this).val();
			calculate();
		});

		domElements.$selSign.on('change', calculate);
	};

	var populateSelectSignsControl = function () {
		domElements.$selSign.empty();

		if (data.calcSign != null && data.calcSign != undefined) {
			for (var i = 0; i < data.calcSign.length; i++) {
				var el = '<option value="' + data.calcSign[i] + '" '
					+ (i == 0 ? 'selected="selected"' : '')
					+ '>' + data.calcSign[i] + '</option>';
				domElements.$selSign.append($(el));
			}
		}

		domElements.$selSign.trigger('change');
	};

	var setCalcResult = function (val) {
		domElements.$calcResult.text(val);
	};

	var displayMessage = function (text) {
		alert(text);
	};

	var fillCalcType = function () {
		//var calcType = $('input:radio[name="calc-type"]:checked').val();
		var calcType = domElements.fnGetCheckedCalcTypeValue();
		//alert(val);         

		var calcSign = null;
		switch (calcType) {
			case 'standard':
				calcSign = signs.standard;
				break;
			case 'scientific':
				calcSign = signs.scientific;
				break;
			case 'programmer':
				calcSign = signs.programmer;
				break;
			default:
				break;
		}

		data.calcSign = calcSign;

		populateSelectSignsControl();
	};

	var calculate = function () {

		setCalcResult('');

		//var leftText = this.$txtLeft.val();
		//var rightText = this.$txtRight.val();

		var leftText = data.leftVal;
		var rightText = data.rightVal;

		var selectedSign = domElements.fnGetSelectedSignValue();

		var leftText_HasValue = validator.hasValue(leftText);
		var rightText_HasValue = validator.hasValue(rightText);
		var selectedSign_HasValue = validator.hasValue(selectedSign);

		var leftText_IsNumeric = leftText_HasValue && validator.isNumeric(leftText);
		var rightText_IsNumeric = rightText_HasValue && validator.isNumeric(rightText);

		if (!(leftText_HasValue && rightText_HasValue && selectedSign_HasValue)) {
			return;
		}

		if (!(leftText_IsNumeric && rightText_IsNumeric)) {
			displayMessage(messages.invalid_input);
			return;
		}

		var leftVal = parseFloat(leftText);
		var rightVal = parseFloat(rightText);

		var res = 0;

		switch (selectedSign) {
			case '+':
				res = leftVal + rightVal;
				break;
			case '-':
				res = leftVal - rightVal;
				break;
			case '*':
				res = leftVal * rightVal;
				break;
			case '/':
				res = leftVal / rightVal;
				break;
			case 'x ^ y':
				res = Math.pow(leftVal, rightVal);
				break;
			case 'x root y':
				res = Math.pow(leftVal, 1 / rightVal);
				break;
			case 'x mod y':
				res = leftVal % rightVal;
				break;
			default:
		}

		setCalcResult(res);
	}

	return {
		init: init
	}
};
