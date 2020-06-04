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
`numerical.fac(3) //6`
`numerical.fac(9) //362880`
`numerical.fac(2.5) //3.323402024697955`
`numerical.fac(-1) //NaN`

### `numerical.ncr(n: number, r: number)`
Returns the binomial coefficient or combination of two numbers. Also works for non-integers, due to using `numerical.fac` internally. Note that order does not matter with the combinations, but does with permutations.

#### Arguments
##### `n: number`
The first argument, or the number of options availible in an applied case.
##### `r: number`
The second argument, or the number of options selected in an applied case.

#### Usage
`numerical.ncr(2,3)` 