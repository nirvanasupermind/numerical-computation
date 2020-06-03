define([], function () {
    var fac_obj = {
        fac: function (x) {
            var result = Math.sqrt(Math.PI) * (x / Math.E) ** x
            result *= (8 * x ** 3 + 4 * x ** 2 + x + 1 / 30) ** (1 / 6)
            if (x % 1 == 0) {
                result = Math.round(result)
            }

            return result

        },

        

    }

    return fac_obj;
});
