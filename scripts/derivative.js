//Uses external library gauss.js
//Credis to itsravenous for gauss.js
define(["regression"], function (regression) {
    var derivative_obj = {

        // firstDerivative: function (f, x) {
        //     var h = Math.sqrt(Number.EPSILON);
        //     return (f(x + h) - f(x - h)) / (2 * h)
        // },

        // firstDerivativeFunc: function (f) {
        //     return function (x) {
        //         return derivative_obj.firstDerivative(f, x);
        //     }
        // },



        // firstDerivative2: function (f, x) {
        //     var data = {};
        //     var step = 0.05;
        //     for (var i = -10; i < 10; i += step) {

        //              if(Math.abs(f(i)) < 200) {

        //             data[i] = f(i);
        //              }

        //     }





        //     var a = regression.quadraticRegression(data).a*2;
        //     var b = regression.quadraticRegression(data).b;

        //     return a*x+b;



        //     // if (isFinite(f(x)) && isFinite(Math.log(f(x)))) {
        //     //     data[x] = f(x);
        //     // }



        // },

        // firstDerivative2Func: function (f) {
        //     return function (x) {
        //         return derivative_obj.firstDerivative(f, x);
        //     }
        // },

        /**
         * Constructs a differentiable exponential approximation for a function
        */

        constructExponential: function constructExponential(f) {
            var data = [];
            var lower = -100;
            var upper = 100;
            var step = 0.2;
            for (var i = lower; i < upper; i += step) {
                if (isFinite(f(i))) {
                    data.push([i, f(i)]);
                }
            }

            return regression.exponential(data);
        },


        /** 
         * Constructs a differentiable polynomial approximation for a function
         */

        constructPolynomial: function constructPolynomial(f) {
            var data = [];
            var lower = -100;
            var upper = 100;
            var step = 0.2;
            for (var i = lower; i < upper; i += step) {
                if (isFinite(f(i))) {
                    data.push([i, f(i)]);
                }
            }

            // console.log("func:" + f);
            // console.log("poly:" + regression.polynomial(data, 8));



            return regression.polynomial(data, 8);
        },
        /**
         * Creates a first derivative of an exponential
         */

        firstDerivativeExp: function firstDerivativeExp(exp) {
            var result = exp;
            result = [exp[0] * Math.log(exp[1]), exp[1]];
            return result;
        },

        firstDerivativePoly: function firstDerivativePoly(polynomial) {
            var result = polynomial;
            result.shift();
            // console.log("1st derivative - after shifting the poly is :" + result)

            result = result.map((x) => (result.indexOf(x) + 1) * x);
            // console.log("1st derivative - after multiplying the poly is :" + result)
            return result;
        },



        /**
         * Creates an nth derivative polynomial of the function
         */

        derivativePoly: function derivativePoly(f, n) {
            n = (n === undefined ? 1 : n);
            var arr = derivative_obj.constructPolynomial(f);
            for (var i = 0; i < n; i++) {
                arr = derivative_obj.firstDerivativePoly(arr);
            }
            return arr;

        },

        /**
    * Creates an nth derivative exponential of the function
    */


        derivativeExp: function derivativeExp(f, n) {
            n = (n === undefined ? 1 : n);
            var arr = derivative_obj.constructExponential(f);
            for (var i = 0; i < n; i++) {
                arr = derivative_obj.firstDerivativeExp(arr);
            }
            return arr;
        },

        /** 
        * Determines which approximation is best based on the limiting ratio
        */

        isExp: function isExp(f) {
            var ratios = [];
            var lower = 0;
            var upper = 100;
            var step = 0.2;
            for (var i = lower; i < upper; i += step) {
                if (isFinite(f(i) / f(i - 1))) {
                    ratios.push([i, f(i) / f(i - 1)]);
                }
            }
            //If the last ratio is the minimum, then this means the function is slower than exponential
            if (Math.min(...ratios) === ratios[ratios.length - 1]) {
                return false;
            } else {
                return true;
            }

        },

        /**
         * Finds the nth derivative of a function using a polynomial approximation
         */




        derivative: function derivative(f, x, n) {
            if (derivative_obj.isExp(f)) {
                n = (n === undefined ? 1 : n);
                var exp = derivative_obj.derivativeExp(f, n);        
                return exp[0]*exp[1]**x;
            } else {
            n = (n === undefined ? 1 : n);
            var result = 0;
            var poly = derivative_obj.derivativePoly(f, n);
            // console.log("poly #2: " + poly);
            for (var i = 0; i < poly.length; i++) {
                result += poly[i] * x ** i;
            }
            return result;
            }
        }

        // derivativeStable: function (f, x, n) {
        //     // n = parseFloat(n) ? 1 : n;
        //     for (var i = 0; i < n; i++) {
        //         var oldF = f;

        //             f =  derivative_obj.firstDerivative2Func(oldF, x);




        //     }

        //     return f(x);
        // }

    }



    return derivative_obj;
});
