var MathCalculator = function () {

    var calculate = function (x, y, sign) {
        var res = 0;

        switch (sign) {
            case '+':
                res = x + y;
                break;
            case '-':
                res = x - y;
                break;
            case '*':
                res = x * y;
                break;
            case '/':
                res = x / y;
                break;
            case 'x ^ y':
                res = Math.pow(x, y);
                break;
            case 'x root y':
                res = Math.pow(x, 1 / y);
                break;
            case 'x mod y':
                res = x % y;
                break;
            default:
        }
        return res;
    }

    return {
        calculate: calculate
    };
};