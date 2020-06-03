define(["derivative"], function (derivative) {
    var tetrate_obj = {
        tetrate: function (a, x) {
            //Quadratic approximation
            if (x > -1 && x <= 0) {
                var result = 1 + (2 * Math.log(a) / (1 + Math.log(a))) * x;
                result -= ((1 - Math.log(a)) / (1 + Math.log(a))) * x ** 2;
                return result;
            } else if (x <= -1) {
                return Math.log(tetrate_obj.tetrate(a, x + 1)) / Math.log(a);
            } else {
                return a ** tetrate_obj.tetrate(a, x - 1);
            }
        },

        superRoot: function (x, y) {
            //Netwon method on tetrate function
            function f(a) {
                return tetrate_obj.tetrate(a, y) - x;
            }

            var guesses = [2];
            for (var i = 0; i < 100; i++) {
                var last = guesses[guesses.length - 1];
                var appended = last - (f(last) / derivative.derivative(f, last, 1));
                guesses.push(appended);
            }
            return guesses.pop();
        },

         slog: function(b,x) {
                         //Netwon method on tetrate function
               function f(a) {
                return tetrate_obj.tetrate(b, a) - x;
            }

            var guesses = [2];
            for (var i = 0; i < 100; i++) {
                var last = guesses[guesses.length - 1];
                var appended = last - (f(last) / derivative.derivative(f, last, 1));
                guesses.push(appended);
            }
            return guesses.pop();
        }





    };
    return tetrate_obj;
});