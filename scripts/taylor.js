define(["derivative", "fac"], function (derivative, fac) {
    var taylor_obj = {
       
        taylor: function (f, a, t) {
            var result = [1];
            for (var i = 0; i < t; i++) {




                // if (i >= 3) {
                //     result.push((derivative.derivativeStable(f, a, i) / (fac.fac(i + 1)))*(1/(i**i**(i/1.2))));
                // } else {
                    result.push(derivative.derivative(f, a, i) / (fac.fac(i + 1)));
                // }


            }

            return result;
        }

    }

    return taylor_obj;
});
