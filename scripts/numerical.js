define(["comb", "derivative", "erf", "gauss", "integral", "inverse",
    "matrix", "regression", "taylor", "tetrate"], function (comb, derivative, erf, gauss, integral, inverse,
        matrix, regression, taylor, tetrate) {
        return {
            comb: comb,
            derivative: derivative,
            erf: erf,
            gauss: gauss,
            integral: integral,
            inverse: inverse,
            Matrix: matrix.Matrix,
            regression: regression,
            taylor: taylor,
            tetrate: tetrate
        }
    })