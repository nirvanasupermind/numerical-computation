define(["matrix", "inverse"], function (matrix, inverse) {
    var tetrate_obj = {
        /**
        * Tetrates (repeatedly exponentiates) two numbers. 
        * The index x can be fractional, but must be in range (0,1), producing a Carlemanmatrix approximation. 
        * @param {number} a
        * @param {number} x
        */
        tetrate1: function (a, x) {
            return matrix.Matrix.carleman((n) => a ** n, 8).pow(x).array[1].reduce((n, m) => n + m);
        },

        /**
     * Tetrates (repeatedly exponentiates) two numbers. 
     * The index x can be fractional, producing a Carlemanmatrix approximation.
     * @param {number} a
     * @param {number} x
     * */

        tetrate: function (a, x) {
            if (x < 0) {
                return Math.log(tetrate_obj.tetrate(a, x + 1)) / Math.log(a);
            } else if (0 <= x && x <= 1) {
                return tetrate_obj.tetrate1(a, x)
            } else {
                return a**tetrate_obj.tetrate(a,x-1);
            }

        },

        /**
         * Returns the yth super-root (upper inverse of tetration) of x.
         * @param {number} x
         * @param {number} y
         */



        sroot: function (x, y) {
            return inverse.inverse((n) => tetrate_obj.tetrate(n, y), x);
        },

        /**
         * Returns the superlogarithm base-y (lower inverse of tetration) of x.
         */

        slog: function (b, x) {
            return inverse.inverse((n) => tetrate_obj.tetrate(b, n), x);
        },






    };
    return tetrate_obj;
});