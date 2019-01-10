/// <reference path="eventdispatcher.js" />

var CalcController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

CalcController.prototype = {
    init: function () {
        this.setupModelHandlers();
        this.enable();
    },
    setupModelHandlers: function () {
        this.calcTypeChangedHandler = this.calcTypeChanged.bind(this);
        this.calcSignChangedHandler = this.calcSignChanged.bind(this);
        this.leftValChangedHandler = this.leftValChanged.bind(this);
        this.rightValChangedHandler = this.rightValChanged.bind(this);
    },
    enable: function () {
        this.view.events.calcTypeChangedEvent.attach(this.calcTypeChangedHandler);
        this.view.events.calcSignChangedEvent.attach(this.calcSignChangedHandler);
        this.view.events.leftValChangedEvent.attach(this.leftValChangedHandler);
        this.view.events.rightValChangedEvent.attach(this.rightValChangedHandler);
    },
    calcTypeChanged: function (sender, args) {
        this.model.changeCalcType(args.calcType);
    },
    calcSignChanged: function (sender, args) {
        this.model.changeCalcSign(args.calcSign);
    },
    leftValChanged: function (sender, args) {
        this.model.changeLeftVal(args.leftVal);
    },
    rightValChanged: function (sender, args) {
        this.model.changeRightVal(args.rightVal);
    }
};