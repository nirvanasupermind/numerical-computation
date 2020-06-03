define(["combin", "derivative", "fac", "integral", "matrix",
    "regression", "taylor", "tetrate"], function (combin, derivative, fac, integral, matrix,
        regression, taylor, tetrate) {
        return {
            ncr: combin.ncr,
            npr: combin.npr,
            firstDerivative: derivative.firstDerivative,
            firstDerivativeFunc: derivative.firstDerivativeFunc,
            derivative: derivative.derivative,
            fac: fac.fac,
            integral: integral.integral,
            infIntegral: integral.infIntegral,
            Matrix: matrix.Matrix,
            linearRegression: regression.linearRegression,
            quadraticRegression: regression.quadraticRegression,
            logRegression: regression.logRegression,
            exponentialRegression: regression.exponentialRegression,
            taylor: taylor.taylor,
            tetrate: tetrate.tetrate,
            superRoot: tetrate.superRoot,
            slog: tetrate.slog
        }
    })