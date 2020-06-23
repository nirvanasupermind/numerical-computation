define([], function () {
    var comb_obj = {
        /**
         * Returns the factorial of a supplied number via a modfied Ramanujan approximation for x>=0 and a Weirstrass product for x<0. 
         * @param {x} number
         */
        fac: function (x) {

            if (x < 0) {
                //Resort to Weirstrass product
                var terms = 200;
                var result = 1;
                for (var i = 1; i < terms; i++) {
                    result *= ((1 + (1 / i)) ** x) / (1 + (x / i));
                }
                return result;
            } else {
                //Tweaked ramanujan approximation
                var result = Math.sqrt(Math.PI) * (x / Math.E) ** x
                result *= (8 * x ** 3 + 4 * x ** 2 + x + 1 / (Math.PI ** 3)) ** (1 / 6);

                return result;
            }

        },
        
        /**
         * Returns the combination or binomial coefficient of two numbers.
         * @param {number} n
         * @param {number} r
         */

        ncr: function (n, r) {
            if (r < n) {
                return 0;
            }
            return comb_obj.fac(n) / (comb_obj.fac(r) * fac.fac(n - r));
        },
         /**
         * Returns the permutation of two numbers.
         * @param {number} n
         * @param {number} r
         */

        npr: function (n, r) {
            return comb_obj.fac(n) / comb_obj.fac(n - r);
        },





    }

    return fac_obj;
});
