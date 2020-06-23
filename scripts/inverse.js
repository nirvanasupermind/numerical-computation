define(["derivative"], function (derivative) {
    /**
     * The inverse module
     */
    var inverse_obj = {
        /**
         * Evaluates the approximate inverse of a supplied function at a number via Newton's method.
         * @param {function} f
         * @param {number} x
         */

        inverse: function inverse(f, x) {
            function g(n) {
             return f(n)-x;
            }
            function gdash(n) {
                return derivative.derivative(g, x);
            }
            var guesses = [2];
            for (var i = 0; i < 100; i++) {
                guesses.push(guesses[i] - g(guesses[i]) / gdash(guesses[i]));
            }
            return guesses.pop();

        }
    }
    return inverse_obj;
})