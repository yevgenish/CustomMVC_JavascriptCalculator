/// <reference path="validator.js" />
/// <reference path="calcmodel.js" />
/// <reference path="calcview.js" />
/// <reference path="calccontroller.js" />
/// <reference path="mathcalculator.js" />

$(function () {
    var validator = new Validator();
    var mathCalculator = new MathCalculator();

    var model = new CalcModel(validator, mathCalculator);
    var view = new CalcView(model);
    var controller = new CalcController(model, view);
    view.initDisplay();
});