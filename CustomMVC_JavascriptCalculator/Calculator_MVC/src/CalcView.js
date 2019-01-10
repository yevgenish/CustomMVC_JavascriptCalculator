/// <reference path="eventdispatcher.js" />
/// <reference path="calcmodel.js" />

var CalcView = function (model) {

    this.model = model;

    this.domElements = {
        $mainArea: null,
        $calcTypes: null,
        $txtLeft: null,
        $txtRight: null,
        $calcSign: null,
        $calcResult: null
    };

    this.events = {
        calcTypeChangedEvent: new Event(this),
        calcSignChangedEvent: new Event(this),
        leftValChangedEvent: new Event(this),
        rightValChangedEvent: new Event(this)
    };
  
    this.init();
}

CalcView.prototype = {
    init: function () {
        this.cacheDom();

        this.populateInitControls();

        this.setupEventHandlers();
        this.bindEvents();

        this.setupModelHandlers();
        this.bindModelEvents();       
    },
    initDisplay: function () {
        this.domElements.$calcTypes.find('input:radio[name="calc-type"]').first().trigger('click');
    },
    cacheDom: function () {
        this.domElements.$mainArea = $('.main-area');
        this.domElements.$calcTypes = this.domElements.$mainArea.find('.calc-types');
        this.domElements.$txtLeft = this.domElements.$mainArea.find('#txtLeft');
        this.domElements.$txtRight = this.domElements.$mainArea.find('#txtRight');
        this.domElements.$calcSign = this.domElements.$mainArea.find('#calcSign');
        this.domElements.$calcResult = this.domElements.$mainArea.find('#calcResult');
    },
    populateInitControls: function () {
        this.populateCalcTypesControl();
    },
    bindEvents: function () {
        this.domElements.$calcTypes.on('change', this.calcTypesChangedHandler);
        this.domElements.$txtLeft.on('change', this.leftValChangedHandler);
        this.domElements.$txtRight.on('change', this.rightValChangedHandler);
        this.domElements.$calcSign.on('change', this.calcSignChangedHandler);
    },
    setupEventHandlers: function () {
        this.leftValChangedHandler = this.leftValChanged.bind(this);      
        this.rightValChangedHandler = this.rightValChanged.bind(this);
        this.calcTypesChangedHandler = this.calcTypesChanged.bind(this);
        this.calcSignChangedHandler = this.calcSignChanged.bind(this);
    },
    setupModelHandlers: function () {
        this.calcTypeChangedHandler = this.populateCalcSigns.bind(this);
        this.resultChangedHandler = this.getResult.bind(this);
        this.validatorMessageDisplayHandler = this.displayMessage.bind(this);
    },
    bindModelEvents: function () {
        this.model.events.calcTypeChangedEvent.attach(this.calcTypeChangedHandler);
        this.model.events.resultChangedEvent.attach(this.resultChangedHandler);
        this.model.events.validatorMessageDisplayEvent.attach(this.validatorMessageDisplayHandler);
    },
    populateCalcTypesControl: function () {
        var calcTypes = this.model.getCalcTypes();
        for (var i = 0; i < calcTypes.length; i++) {
            var el = '<label><input type="radio" name="calc-type"'
                + 'value="' + calcTypes[i].name + '" />'
                + calcTypes[i].displayName
                + '</label>'
            this.domElements.$calcTypes.append($(el));
        }
    },
    populateCalcSignControl: function (calcSigns) {
        this.domElements.$calcSign.empty();
        if (calcSigns != null && calcSigns != undefined) {
            for (var i = 0; i < calcSigns.length; i++) {
                var el = '<option value="' + calcSigns[i] + '" '
                    + (i == 0 ? 'selected="selected"' : '')
                    + '>' + calcSigns[i] + '</option>';
                this.domElements.$calcSign.append($(el));
            }
        }
        this.domElements.$calcSign.trigger('change');
    },
    displayMessage: function (sender, args) {
        alert(args.text);
    },
    setCalcResult: function (val) {
        this.domElements.$calcResult.text(val);
    },
    populateCalcSigns: function() {
        var calcSigns = this.model.getCalcSigns();
        this.populateCalcSignControl(calcSigns);
    },
    getResult: function () {
        var result = this.model.getResult();
        this.setCalcResult(result);
    },
    leftValChanged: function () {
        var leftVal = this.domElements.$txtLeft.val();
        this.events.leftValChangedEvent.notify({ leftVal: leftVal });
    },
    rightValChanged: function () {
        var rightVal = this.domElements.$txtRight.val();
        this.events.rightValChangedEvent.notify({ rightVal: rightVal });
    },
    calcTypesChanged: function () {
        var calcType = this.domElements.$calcTypes.find('input:radio[name="calc-type"]:checked').val();
        this.events.calcTypeChangedEvent.notify({ calcType: calcType });
    },
    calcSignChanged: function () {
        var calcSign = this.domElements.$calcSign.children("option:selected").val();
        this.events.calcSignChangedEvent.notify({ calcSign: calcSign });
    }
};