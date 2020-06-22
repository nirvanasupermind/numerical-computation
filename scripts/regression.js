
define(["gauss"], function (gauss) {
    /** 
     * The regression module
     * @exports ./main.js
     * @namespace regression_obj
     */
    var regression_obj = {

        /**
        * Sums up x values of a dataset each raised to power
        * @method sumX
        */

        sumX: function sumX(data, pow) {

            var total = 0;
            for (var i = 0; i < data.length; i++) {
                total += data[i][0] ** pow;
            }
            return total;
        },

        /**
        * Sums up y values of a dataset each raised to power
        * @method sumY
        */


        sumY: function sumY(data, pow) {
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum += data[i][1] ** pow;
            }
            return sum;

        },

        /**
       * Sums up x values multipled by y values of a dataset with x's each raised to a power
       * @memberof regression_obj
       * @method sumXY
       */

        sumXY: function sumXY(data, pow) {
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum += (data[i][0] ** pow) * data[i][1];
            }
            return sum;
        },

        /**
     * Generates a left matrix of dataset for the polynomial regression
     * @memberof regression_obj
     * @method generateLeftMatrix
     */


        generateLeftMatrix: function generateLeftMatrix(data, deg) {
            var leftMatrix = []
            for (let i = 0; i <= deg; i++) {
                leftMatrix.push([]);
                for (let j = 0; j <= deg; j++) {
                    if (i === 0 && j === 0) {
                        leftMatrix[i][j] = data.length;
                    } else {
                        leftMatrix[i][j] = regression_obj.sumX(data, (i + j));
                    }
                }
            }
            return leftMatrix;

        },

        /**
    * Generates a right matrix of dataset for the polynomial regression
    * @memberof regression_obj
    * @method generateRightMatrix
    */


        generateRightMatrix: function generateRightMatrix(data, deg) {
            var rightMatrix = [];
            for (let i = 0; i <= deg; i++) {
                if (i === 0) {
                    rightMatrix[i] = regression_obj.sumY(data, 1);
                } else {
                    rightMatrix[i] = regression_obj.sumXY(data, i);
                }
            }
            return rightMatrix;
        },




        // linearRegression: function (s) {
        //     //Take linear regression of sset
        //     var sumX = 0;
        //     var sumY = 0;
        //     var sumXY = 0;
        //     var sumX2 = 0;
        //     var n = Object.keys(s).length;
        //     for (var i = 0; i < n; i++) {
        //         sumX += parseFloat(Object.keys(s)[i]);
        //         sumY += Object.values(s)[i];
        //         sumXY += parseFloat(Object.keys(s)[i]) * Object.values(s)[i];
        //         sumX2 += parseFloat(Object.keys(s)[i]) ** 2;
        //     }
        //     // console.log(sumX);
        //     // console.log(sumY);
        //     // console.log(sumXY);
        //     // console.log(sumX2);

        //     //Parameters


        //     var m = (n * sumXY - (sumX * sumY)) / (n * sumX2 - (sumX ** 2));
        //     var b = (sumY - (m * sumX)) / n;
        //     return [m, b];
        // },

        // quadraticRegression: function (s) {
        //     //Take quadratic regression of set
        //     var sumXI = 0;
        //     var sumYI = 0;
        //     var sumXIYI = 0;
        //     var sumXI2YI = 0;
        //     var sumXI2 = 0;
        //     var sumXI3 = 0;
        //     var sumXI4 = 0;



        //     var n = Object.keys(s).length;
        //     var x = Object.keys(s).map(parseFloat);
        //     var y = Object.values(s);


        //     for (var i = 0; i < n; i++) {
        //         sumXI += x[i];
        //         sumYI += y[i];
        //         sumXIYI += x[i] * y[i];
        //         sumXI2YI += x[i] ** 2 * y[i];
        //         sumXI2 += x[i] ** 2;
        //         sumXI3 += x[i] ** 3;
        //         sumXI4 += x[i] ** 4;

        //     }

        //     var sumXX = sumXI2 - ((sumXI ** 2) / n);
        //     var sumXY = sumXIYI - ((sumXI * sumYI) / n);
        //     var sumXX2 = sumXI3 - ((sumXI * sumXI2) / n);
        //     var sumX2Y = sumXI2YI - (((sumXI2 * sumYI) / n));
        //     var sumX2X2 = sumXI4 - (((sumXI2) ** 2) / n);


        //     var a = ((sumX2Y * sumXX) - (sumXY * sumXX2))
        //     a /= ((sumXX) * sumX2X2) - (sumXX2 ** 2);
        //     var b = (sumXY * sumX2X2) - (sumX2Y * sumXX2);
        //     b /= ((sumXX) * sumX2X2) - (sumXX2 ** 2);
        //     var c = (sumYI / n) - (b * (sumXI / n)) - (a * (sumXI2 / n));
        //     return [a, b, c];





        // },


        /**
         * Approximates a data set with a polynomial a+b*x+c*x^2..., returns [a,b,c,...].
         */

        polynomial: function polynomial(data, deg) {
            return gauss.gauss(regression_obj.generateLeftMatrix(data, deg), regression_obj.generateRightMatrix(data, deg));
        },

        /**
         * Approximates a dataset with a linear function a+b*x.
         */
        linear: function linear(data) {
            return regression_obj.polynomial(data, 1);
        },

        /**
         * Approximates a dataset with a logarithmic function b1+b2*ln(x), returns [b1,b2].
         */


        logarithmic: function logarithmic(data) {
            var n = data.length;
            var data2 = [];
            for (var i = 0; i < n; i++) {
                data2.push([Math.log(data[i][0]),data[i][1]]);
            }

            var xAvg = 0;
            var yAvg = 0;
            for (var i = 0; i < n; i++) {
                xAvg += parseFloat(data2[i][0]);
                yAvg += parseFloat(data2[i][1]);
            }



            xAvg /= n;
            yAvg /= n;



            var sumXX = 0;
            var sumYY = 0;
            var sumXY = 0;
            for (var i = 0; i < n; i++) {
                sumXX += (data2[i][0] - xAvg) ** 2;
                sumYY += (data2[i][1] - yAvg) ** 2;
                sumXY += (data2[i][0] - xAvg)*(data2[i][1] - yAvg);
            }

            // console.log(sumX);
            // console.log(sumY);
            // console.log(sumXY);
            // console.log(sumX2);


            var b2 = sumXY / sumXX;
            var b1 = yAvg - (b2 * xAvg);
            return [b1,b2];
        },

        /**
         * Approximates a dataset with an exponential function ab^x, returns [a,b].
         */

        exponential: function exponential(data) {
            var data2 = [];
            for (var i = 0; i < 50; i++) {
                data2.push([data[i][0], Math.log(data[i][1])])
            }
            var a = Math.exp(regression_obj.linear(data2)[0]);
            var b = Math.exp(regression_obj.linear(data2)[1]);
            return [a, b];

        },



        // polynomialRegression: function (s, order) {
        //     var lhs = [];
        //     var rhs = [];
        //     var a = 0;
        //     for (var i = 0; i < order + 1; i++) {
        //         for (var j = 0; j < Object.keys(s).length; j++) {
        //             a += (Object.keys(s)[j] ** i) * Object.values(s)[j];
        //         }
        //     }
        //     console.log("CHECKPOINT 1")

        //     lhs.push(a);
        //     console.log("CHECKPOINT 2")
        //     a = 0;
        //     console.log("CHECKPOINT 3")
        //     var b = 0;
        //     console.log("CHECKPOINT 4")
        //     var c = [];
        //     console.log("CHECKPOINT 5")
        //     for (var m = 0; m < order + 1; m++) {
        //         for (var l = 0; l < Object.keys(s).length; l++) {
        //             console.log("CHECKPOINT 6")
        //             b += Object.keys(s) ** (i + j);
        //             console.log("CHECKPOINT 7")

        //         }

        //         c.push(b);
        //         b = 0;
        //     }



        //     rhs.push(c);

        //     rhs.push(lhs);

        //     console.warn(rhs)

        //     return gauss.solveMatrix(rhs);

        // },



        // exponentialRegression: function (s) {
        //     var n = Object.keys(s).length;
        //     var s2 = {};
        //     for (var i = 0; i < n; i++) {
        //         s2[Object.keys(s)[i]] = Math.log(Object.values(s)[i]);
        //     }

        //     var a = Math.exp(regression_obj.linearRegression(s2).b);
        //     var r = Math.exp(regression_obj.linearRegression(s2).m);
        //     return [a, r];
        // },

    }

    return regression_obj;
});