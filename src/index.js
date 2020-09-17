function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.split(" ").join("");
    if (isDividingByZeroPresents(expr)) throw Error("TypeError: Division by zero.");
    try {
        return new Function('return ' + expr)();
    } catch (e) {
        throw Error('ExpressionError: Brackets must be paired');
    }

    function isDividingByZeroPresents(str) {
        let counter = 0;
        let startIndex = -1;
        let array = [];
        for (let i = 0; i < str.length; i++) {
            if (counter === 0) {
                if (str[i] === "/" && str[i + 1] === "0") return true;
                if (str[i] === "/" && str[i + 1] === "(") {
                    counter++;
                    i++;
                    startIndex = i + 1;
                }
            } else {
                if (str[i] === "(") counter++;
                if (str[i] === ")") {
                    counter--;
                }
                if (counter === 0) array.push(str.slice(startIndex, i));
            }
        }
        return array.reduce((x, y) => {
            if (new Function('return ' + y)() === 0) return true;
            return x || isDividingByZeroPresents(y);
        }, false)
    }
}

module.exports = {
    expressionCalculator
}
