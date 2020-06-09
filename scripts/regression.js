
define([], function () {
    var regression_obj = {
        linearRegression: function (s) {
            //Take linear regression of sset
            var sumX = 0;
            var sumY = 0;
            var sumXY = 0;
            var sumX2 = 0;
            var n = Object.keys(s).length;
            for (var i = 0; i < n; i++) {
                sumX += parseFloat(Object.keys(s)[i]);
                sumY += Object.values(s)[i];
                sumXY += parseFloat(Object.keys(s)[i]) * Object.values(s)[i];
                sumX2 += parseFloat(Object.keys(s)[i]) ** 2;
            }
            // console.log(sumX);
            // console.log(sumY);
            // console.log(sumXY);
            // console.log(sumX2);

            //Parameters


            var m = (n * sumXY - (sumX * sumY)) / (n * sumX2 - (sumX ** 2));
            var b = (sumY - (m * sumX)) / n;
            return { m: m, b: b };
        },

        quadraticRegression: function (s) {
            //Take quadratic regression of set
            var sumXI = 0;
            var sumYI = 0;
            var sumXIYI = 0;
            var sumXI2YI = 0;
            var sumXI2 = 0;
            var sumXI3 = 0;
            var sumXI4 = 0;



            var n = Object.keys(s).length;
            var x = Object.keys(s).map(parseFloat);
            var y = Object.values(s);


            for (var i = 0; i < n; i++) {
                sumXI += x[i];
                sumYI += y[i];
                sumXIYI += x[i] * y[i];
                sumXI2YI += x[i] ** 2 * y[i];
                sumXI2 += x[i] ** 2;
                sumXI3 += x[i] ** 3;
                sumXI4 += x[i] ** 4;

            }

            var sumXX = sumXI2 - ((sumXI ** 2) / n);
            var sumXY = sumXIYI - ((sumXI * sumYI) / n);
            var sumXX2 = sumXI3 - ((sumXI * sumXI2) / n);
            var sumX2Y = sumXI2YI - (((sumXI2 * sumYI) / n));
            var sumX2X2 = sumXI4 - (((sumXI2) ** 2) / n);


            var a = ((sumX2Y * sumXX) - (sumXY * sumXX2))
            a /= ((sumXX) * sumX2X2) - (sumXX2 ** 2);
            var b = (sumXY * sumX2X2) - (sumX2Y * sumXX2);
            b /= ((sumXX) * sumX2X2) - (sumXX2 ** 2);
            var c = (sumYI / n) - (b * (sumXI / n)) - (a * (sumXI2 / n));
            return { a: a, b: b, c: c }





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


        logRegression: function (s) {
            //Take log regression of set
            var n = Object.keys(s).length;
            var s2 = {};
            for (var i = 0; i < n; i++) {
                s2[Object.keys(s)[i]] = Math.exp(Object.values(s)[i]);
            }

            var xAvg = 0;
            var yAvg = 0;
            for (var i = 0; i < n; i++) {
                xAvg += parseFloat(Object.keys(s2)[i]);
                yAvg += parseFloat(Object.values(s2)[i]);
            }



            xAvg /= n;
            yAvg /= n;



            var sumXX = 0;
            var sumYY = 0;
            var sumXY = 0;
            for (var i = 0; i < n; i++) {
                sumXX += (parseFloat(Object.keys(s2)[i]) - xAvg) ** 2;
                sumYY += (Object.values(s2)[i] - yAvg) ** 2;
                sumXY += (parseFloat(Object.keys(s2)[i]) - xAvg) * (Object.values(s)[i] - yAvg);
            }

            // console.log(sumX);
            // console.log(sumY);
            // console.log(sumXY);
            // console.log(sumX2);


            //Parameters
            var b2 = sumXY / sumXX;
            var b1 = yAvg - (b2 * xAvg);
            return { b1: b1, b2: b2 };
        },

        exponentialRegression: function (s) {
            var n = Object.keys(s).length;
            var s2 = {};
            for (var i = 0; i < n; i++) {
                s2[Object.keys(s)[i]] = Math.log(Object.values(s)[i]);
            }

            var a = Math.exp(regression_obj.linearRegression(s2).b);
            var r = Math.exp(regression_obj.linearRegression(s2).m);
            return { a: a, r: r };
        }
    }

    return regression_obj;
});