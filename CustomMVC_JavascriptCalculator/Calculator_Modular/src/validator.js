var validator = (function () {
    var isNumeric = function(input) {
        var pattern = /^\d+$/;

        return pattern.test(input);
    }

    var hasValue = function(input) {
        if (typeof input == 'undefined' || !input || input == '') {
            return false;
        }
        return true;
    }

    return {
        isNumeric: isNumeric,
        hasValue: hasValue
    }
})();