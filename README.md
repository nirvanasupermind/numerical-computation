# numerical-computation
A numerical analysis toolkit in Javascript, featuring derivatives, integration, matrices, tetration and more. It will be updated as and when new features are available. Below is a documentation of the installation process and all the current functions supported.

# Install
To install, you can clone the file in a terminal using `git clone https://github.com/nirvanasupermind/numerical-computation/` or install it locally. 

Note that numerical-computation uses require.js, so we highly reccomend you install it first. After that, you need to use a `define` statement to import numerical:
`define(["<file url>"], {`
   `var obj =  {`
`   func1: <func definition>,`
    `variable1: <variable definition>`
    `...`
           }        `
           `return obj`
})`
Where `<file url>` is the local file URL of numerical.js in your computer. For more info on require.js, check out their official site, and for info on Github installation, check out Github support.

# Functions
## Combinatorial
### `numerical.fac(x: number)`
Returns the factorial of a number using a Ramanujan approximation. It also emulates the gamma function for non-integers, but does not work for negative numbers.
#### Arguments
##### `x: number`
The number to take the factorial of.
#### Usage
    numerical.fac(3) //6
    numerical.fac(9) //362880
    numerical.fac(2.5) //3.323402024697955`
    numerical.fac(-1) //NaN`

### `numerical.ncr(n: number, r: number)`
Returns the binomial coefficient or combination of two numbers. Also works for non-integers, due to using `numerical.fac` internally. 

#### Arguments
##### `n: number`
The first argument, or the number of options availible in an applied case. Does not work if `n>r`.
##### `r: number`
The second argument, or the number of options selected in an applied case. Does not work if `n>r`.

#### Usage
    numerical.ncr(5,3) // 10
    numerical.ncr(4.5,2.8) // 7.218203306925931
    numerical.ncr(2,4) // NaN

### `numerical.npr(n: number, r: number)`
Returns the permutation of two numbers. Also works for non-integers, due to using `numerical.fac` internally. 

##### `n: number`
The first argument, or the number of options availible in an applied case. Does not work if `n>r`.
##### `r: number`
The second argument, or the number of options selected in an applied case. Does not work if `n>r`.

#### Usage
    numerical.npr(5,3) // 60
    numerical.npr(6.2,1.7) //20.066120287080764
    numerical.npr(1,9) // NaN
## Differentiation
