/// <reference path="eventdispatcher.js" />
/// <reference path="mathcalculator.js" />

var CalcModel = function (validator, mathCalculator) {

    this.helpers = {
        validator: validator,
        mathCalculator: mathCalculator
    };

    this.messages = {
        invalidInput: 'Invalid input fields'
    };

    this.calcTypes = {
        standard: { displayName: 'Standard', signs: ['+', '-', '*', '/'] },
        scientific: { displayName: 'Scientific', signs: ['+', '-', '*', '/', 'x ^ y', 'x root y'] },
        programmer: { displayName: 'Programmer', signs: ['+', '-', '*', '/', 'x mod y'] }
    };

    this.variables = {
        calcType: null,
        calcSign: null,
        leftVal: null,
        rightVal: null,
        result: null
    };

    this.events = {
        calcTypeChangedEvent: new Event(this),
        resultChangedEvent: new Event(this),
        validatorMessageDisplayEvent: new Event(this)
    };
};

CalcModel.prototype = {
    changeCalcType: function (calcType) {
        this.variables.calcType = calcType;        
        this.events.calcTypeChangedEvent.notify();
    },
    getCalcTypes: function () {
        var res = [];
        for (var key in this.calcTypes) {
            if (this.calcTypes.hasOwnProperty(key)) {
                res.push({ name: key, displayName: this.calcTypes[key].displayName})
            }
        }
        return res;
    },
    getCalcSigns: function () {
        return this.calcTypes[this.variables.calcType].signs;
    },
    changeCalcSign: function (calcSign) {
        this.variables.calcSign = calcSign;
        this.calculateResultAndNotify();
        this.events.resultChangedEvent.notify();
    },
    changeLeftVal: function (leftVal) {
        this.variables.leftVal = leftVal;
        this.calculateResultAndNotify();
    },
    changeRightVal: function (rightVal) {
        this.variables.rightVal = rightVal;
        this.calculateResultAndNotify();
    },
    displayValidatorMessage: function (validatorMessage) {
        this.events.validatorMessageDisplayEvent.notify({ text: validatorMessage });
    },
    changeResult: function (result) {
        this.variables.result = result;
    },
    getResult: function () {
        return this.variables.result;
    },
    calculateResultAndNotify: function () {
        this.calculateResult();
        this.events.resultChangedEvent.notify();
    },
    calculateResult: function () {
        this.variables.result = '';

        var validator = this.helpers.validator;

        var leftText = this.variables.leftVal;
        var rightText = this.variables.rightVal;
        var selectedSign = this.variables.calcSign;

        var validateInputResult = this.validateInput(leftText, rightText, selectedSign, validator);
        if (validateInputResult.success == false) {
            if (validator.hasValue(validateInputResult.message)) {
                this.displayValidatorMessage(validateInputResult.message);
            }
            return;
        }

        var leftVal = parseFloat(leftText);
        var rightVal = parseFloat(rightText);

        var res = this.helpers.mathCalculator.calculate(leftVal, rightVal, selectedSign);
        
        this.changeResult(res);
    },
    validateInput: function (leftText, rightText, selectedSign, validator) {
        //TO DO - see how to implement result interface
        var result = {
            success: false,
            message: null
        };

        var leftText_HasValue = validator.hasValue(leftText);
        var rightText_HasValue = validator.hasValue(rightText);
        var selectedSign_HasValue = validator.hasValue(selectedSign);

        var leftText_IsNumeric = leftText_HasValue && validator.isNumeric(leftText);
        var rightText_IsNumeric = rightText_HasValue && validator.isNumeric(rightText);

        if (!(leftText_HasValue && rightText_HasValue && selectedSign_HasValue)) {
            return result;
        }

        if (!(leftText_IsNumeric && rightText_IsNumeric)) {
            result.message = this.messages.invalidInput;
            return result;
        }

        result.success = true;
        return result;
    }
};