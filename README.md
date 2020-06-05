# numerical-computation
A numerical analysis toolkit in Javascript, featuring derivatives, integration, matrices, tetration and more. It will be updated as and when new features are available. Below is a documentation of the installation process and all the current functions supported.

# Install
To install, you can clone the file in a terminal using `git clone https://github.com/nirvanasupermind/numerical-computation/` or install it locally. 

Note that numerical-computation uses require.js, so we highly reccomend you install it first. After that, you need to use a `define` statement to import numerical:
```
define(["<file url>"], {
   var obj =  {
   func1: <func definition>,`
    variable1: <variable definition>
    ...
           }        `
           return obj
})
```
Where `<file url>` is the local file URL of numerical.js in your computer. For more info on require.js, check out their official site, and for info on Github installation, check out Github support.

# Functions
## Factorial
### `numerical.fac(x)`
Returns the factorial of a number using a Ramanujan approximation. It also emulates the gamma function for non-integers, but does not work for negative numbers.
#### Arguments
##### `x: number`
The number to take the factorial of.
#### Usage
    numerical.fac(3) //6
    numerical.fac(9) //362880
    numerical.fac(2.5) //3.323402024697955`
    numerical.fac(-1) //NaN`

### `numerical.ncr(n, r)`
Returns the binomial coefficient or combination of two numbers. Also works for non-integers, due to using `numerical.fac` internally. 

#### Arguments
##### `n: number`
The first argument, or the number of options availible in an applied case. Does not work if `n<r`.
##### `r: number`
The second argument, or the number of options selected in an applied case. Does not work if `n<r`.

#### Usage
    numerical.ncr(5,3) // 10
    numerical.ncr(4.5,2.8) // 7.218203306925931
    numerical.ncr(2,4) // NaN

### `numerical.npr(n, r)`
Returns the permutation of two numbers. Also works for non-integers, due to using `numerical.fac` internally. 

##### `n: number`
The first argument, or the number of options availible in an applied case. Does not work if `n<r`.
##### `r: number`
The second argument, or the number of options selected in an applied case. Does not work if `n<r`.

#### Usage
    numerical.npr(5,3) // 60
    numerical.npr(6.2,1.7) //20.066120287080764
    numerical.npr(1,9) // NaN
## Derivative
### `numerical.derivative(f, x, n?)`
Finds the derivative of a function at a point using a symmetric difference quotient.

#### Arguments
##### `f: (number) => number`
The function to take the derivative of.
##### `x: number`
The point to take the derivative at.
#####  `n?: number`
The degree of the derivative, or how many times the
derivative should be taken. Set to `1` by default.

**WARNING**: The symmetric difference quotient approximation used for `numerical.derivative`
is numerically unstable, and will explode after roughly`n=3-5` depending on the function. A new stable method using polynomial regression is in the works, but for now this is our best approximation.

#### Usage
    numerical.derivative(Math.sqrt, 64) // 0.0625
    numerical.derivative(Math.sqrt, 64, 1) // 0.0625
    numerical.derivative(Math.sqrt, 9, 2) // 0.009259259259259259
    numerical.derivative(Math.sqrt, 2, 10) // UNSTABLE 1.2052035331942427e+61

### numerical.taylor(f, a, t)
Returns the Taylor series of a function as an array.

#### Arguments
##### `f: (number) => number`
The function to take the Taylor series of.
##### `a: number`
The point to expand the Taylor series at. The series will have neglibile error at this point.
##### `t: number`
The degree of the Taylor series. For example inputting `t=2` returns a quadratic. 


**WARNING**: The symmetric difference quotient approximation used for `numerical.derivative` (which is utilizied in this function)
is numerically unstable, so the expansion will explode after roughly`t=4-6` depending on the function. A new stable method using polynomial regression is in the works, but for now this is our best approximation.


#### Usage
    numerical.taylor(Math.exp,0,2) // [1, 1, 0.49999999813735485]
    numerical.taylor(Math.exp,0,3) // [1, 1, 0.49999999813735485, 0.16666666666666666]
    numerical.taylor(Math.exp,0,9) // UNSTABLE  [1, 1, 0.49999999813735485, 0.16666666666666666, 699050.6666666666, 0, -91823792722465330000, 0, 6.593392836234701e+33, 0]

    

## Integral
### `numerical.integral(f,a,b,n?)`
Returns the definite integral of a function over an interval using a composite trapezoidal rule. 
#### Arguments
##### `f: (number) => number`
The integrand function.
##### `a: number`
The lower bound of the integral range.
##### `b: number`
The upper bound of the integral range.
##### `n?: number`
Optional argument specifying the number of subintervals to use in the composite trapezoidal rul approximation. Larger `n` values produce more accurate results, but take more time to compute. Set to `1000` by default.

#### Usage
    numerical.integral(function (x) { return x**2},0,6,50) // 67.86547199999998
    numerical.integral(function (x) { return x**2},0,6,200) // 70.93167299999998
    numerical.integral(function (x) { return x**2},0,6,1000) // 71.78446778400003
    numerical.integral(function (x) { return x**2},0,6) // 71.78446778400003
    numerical.integral(function (x) { return x**2}, 0, 6, 100000) //71.99784004680012
    numerical.integral(function (x) { return x**2}, 0, 6, 1e+7) //71.99997840000916

### numerical.infIntegral(f,a)
Returns the, if convergent, semi-infinite integral of a function starting from a point. 
#### Arguments
##### `f: (number) => number`