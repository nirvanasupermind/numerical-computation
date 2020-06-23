define(["derivative", "comb"], function (derivative, comb) {

    var matrix_obj = {
        // dotProduct: function (x, y) {
        //     var result = 0;
        //     for (var i = 0; i < y.length; i++) {
        //         result += x[i] * y[i];
        //     }
        //     return result;
        // },

        gcd: function (x, y) {
            x = Math.abs(x);
            y = Math.abs(y);
            while (y) {
                var t = y;
                y = x % y;
                x = t;
            }
            return x;
        },

        lcm: function (x, y) {
            if ((typeof x !== 'number') || (typeof y !== 'number'))
                return false;
            return (!x || !y) ? 0 : Math.abs((x * y) / matrix_obj.gcd(x, y));
        },

        fracAdd: function (x, y) {
            var t1 = matrix_obj.lcm(x[1], y[1]) / x[1];
            var t2 = matrix_obj.lcm(x[1], y[1]) / y[1];
            var t3 = matrix_obj.lcm(x[1], y[1]);
            x[0] = x[0] * t1;
            x[1] = t3;
            y[0] = y[0] * t2;
            y[1] = t3;


            return matrix_obj.simplify([x[0] + y[0], t3]);
        },

        simplify: function (data) {
            var result = '';
            numOne = Number(data[0]),
                numTwo = Number(data[1]);
            for (var i = Math.max(numOne, numTwo); i > 1; i--) {
                if ((numOne % i == 0) && (numTwo % i == 0)) {
                    numOne /= i;
                    numTwo /= i;
                }
            }
            if (numTwo === 1) {
                result = numOne.toString()
            } else {
                result = numOne.toString() + '/' + numTwo.toString()
            }
            return result.split('/').map(parseFloat);

        },


        nearestDyadicFrac: function (x) {
            var t1 = Math.round(x * 128);
            var t2 = 128;


            return matrix_obj.simplify([t1, t2]);

        },


        // chunk: function (array, size) {
        //     const chunked_arr = [];
        //     for (let i = 0; i < array.length; i++) {
        //         const last = chunked_arr[chunked_arr.length - 1];
        //         if (!last || last.length === size) {
        //             chunked_arr.push([array[i]]);
        //         } else {
        //             last.push(array[i]);
        //         }
        //     }
        //     return chunked_arr;
        // },

        // dyadicFracSum: function (x) {
        //     //Represent number as sum of power of 2 fractions
        //     var binary = x.toString(2).split(".").pop().slice(0, 8);
        //     var result = [];
        //     for (var i = 0; i < binary.length; i++) {
        //         for (var j = 0; j < binary[i].length; j++) {
        //             if (binary[i]) {
        //                 result.push([1, 2 ** (i + 1)]);
        //             }
        //         }

        //     }
        //     console.log(result);



        //     return result;
        // },









        /**
         * A basic matrix class.
         */
        Matrix: class Matrix {
            constructor(array) {
                this.array = array;

            }

            toString() {
                return JSON.stringify(this);
            }

            /**
             * Returns the width of a matrix.
             */

            width() {
                return this.array[0].length;
            }

            /**
             * Returns the height of a matrix.
             */



            height() {
                return this.array.length;
            }

            /**
             * Adds two matrices elementwise.
             * @param {*} x 
             */


            add(x) {
                if (this.width() !== x.width() || this.height() !== x.height()) {
                    throw new Error("Cannot add matrices " + this + " and " + x + "- width and height do not match");
                } else {
                    var result = new matrix_obj.Matrix([[]]);
                    for (var i = 0; i < this.height(); i++) {
                        result.array.push([]);
                        for (var j = 0; j < this.width(); j++) {
                            result.array[i].push(this.array[i][j] + x.array[i][j]);
                        }
                    }
                    result.array.pop();
                    return result;
                }
            }

            /**
             * Adds a matrix with a scalar.
             * @param {number} x 
             */

            adds(x) {
                return new matrix_obj.Matrix(this.array.map(function (x2) { return x2.map(function (x3) { return x3 + x }) }));
            }

            /**
             * Multiplies a matrix by a scalar.
             * @param {*} x 
             */

            multiplys(x) {
                return new matrix_obj.Matrix(this.array.map(function (x2) { return x2.map(function (x3) { return x3 * x }) }));
            }

            /**
             * Subtracts two matrices elementwise.
             * @param {*} x 
             */

            subtract(x) {
                return this.add(x.multiplys(-1));
            }

            /**
             * Subtracts a scalar from a matrix.
             * @param {number} x 
             */


            subtracts(x) {
                return this.adds(-1 * x);
            }

            /**
             * Multiplies two matrices using dot-product.
             * @param {*} x 
             */

            multiply(x) {
                if (this.width() !== x.height()) {
                    throw new Error("Cannot multiply matrices " + this + " and " + x + " - width of first matrix " + "(" + this.width() + ")" + " is not equal to height of second matrix (" + x.height() + ")");
                } else {
                    var a = this.array;
                    var b = x.array;
                    var aNumRows = a.length, aNumCols = a[0].length,
                        bNumRows = b.length, bNumCols = b[0].length,
                        m = new Array(aNumRows);  // initialize array of rows
                    for (var r = 0; r < aNumRows; ++r) {
                        m[r] = new Array(bNumCols); // initialize the current row
                        for (var c = 0; c < bNumCols; ++c) {
                            m[r][c] = 0;             // initialize the current cell
                            for (var i = 0; i < aNumCols; ++i) {
                                m[r][c] += a[r][i] * b[i][c];
                            }
                        }
                    }
                    return new matrix_obj.Matrix(m);



                }
            }

            /**
             * Finds the determinant of a matrix. 
             */

            det() {
                if (this.width() !== this.height()) {
                    throw new Error("Can't find determinant of matrix " + this + " - the matrix is not a square matrix")
                } else {
                    var M = this.array;
                    if (M.length == 2) { return (M[0][0] * M[1][1]) - (M[0][1] * M[1][0]); }
                    var answer = 0;
                    for (var i = 0; i < M.length; i++) { answer += Math.pow(-1, i) * M[0][i] * det(deleteRowAndColumn(M, i)); }
                    return answer;
                }

            }

            /**
             * Returns an square identity matrix with a supplied side length.
             * @param {number} size 
             */

            static identity(width) {
                var result = new matrix_obj.Matrix([]);
                for (var i = 0; i < width; i++) {
                    result.array.push([]);
                    for (var j = 0; j < width; j++) {
                        if (i === j) {
                            result.array[i].push(1);
                        } else {
                            result.array[i].push(0);
                        }
                    }
                }

                return result;
            }

            /**
             * Raises a matrix to an integer power.
             * @param {number} x 
             */

            powInt(x) {
                var result = matrix_obj.Matrix.identity(this.width());
                for (var i = 0; i < x; i++) {
                    result = this.multiply(result);
                }
                return result;
            }
            /**
             * Returns the inverse of a matrix. I used some code from someone called Andrew Ippoliti because I couldn't find an algorithm for nxn matrix inversion at the time, so credits to him.
             */



            inverse() {
                //Uses gauss elimination
                var M = this.array;
                if (M.length !== M[0].length) { return; }

                //create the identity matrix (I), and a copy (C) of the original
                var i = 0, ii = 0, j = 0, dim = M.length, e = 0, t = 0;
                var I = [], C = [];
                for (i = 0; i < dim; i += 1) {
                    // Create the row
                    I[I.length] = [];
                    C[C.length] = [];
                    for (j = 0; j < dim; j += 1) {

                        //if we're on the diagonal, put a 1 (for identity)
                        if (i == j) { I[i][j] = 1; }
                        else { I[i][j] = 0; }

                        // Also, make the copy of the original
                        C[i][j] = M[i][j];
                    }
                }

                // Perform elementary row operations
                for (i = 0; i < dim; i += 1) {
                    // get the element e on the diagonal
                    e = C[i][i];

                    // if we have a 0 on the diagonal (we'll need to swap with a lower row)
                    if (e == 0) {
                        //look through every row below the i'th row
                        for (ii = i + 1; ii < dim; ii += 1) {
                            //if the ii'th row has a non-0 in the i'th col
                            if (C[ii][i] != 0) {
                                //it would make the diagonal have a non-0 so swap it
                                for (j = 0; j < dim; j++) {
                                    e = C[i][j];       //temp store i'th row
                                    C[i][j] = C[ii][j];//replace i'th row by ii'th
                                    C[ii][j] = e;      //repace ii'th by temp
                                    e = I[i][j];       //temp store i'th row
                                    I[i][j] = I[ii][j];//replace i'th row by ii'th
                                    I[ii][j] = e;      //repace ii'th by temp
                                }
                                //don't bother checking other rows since we've swapped
                                break;
                            }
                        }
                        //get the new diagonal
                        e = C[i][i];
                        //if it's still 0, not invertable (error)
                        if (e == 0) { return }
                    }

                    // Scale this row down by e (so we have a 1 on the diagonal)
                    for (j = 0; j < dim; j++) {
                        C[i][j] = C[i][j] / e; //apply to original matrix
                        I[i][j] = I[i][j] / e; //apply to identity
                    }

                    // Subtract this row (scaled appropriately for each row) from ALL of
                    // the other rows so that there will be 0's in this column in the
                    // rows above and below this one
                    for (ii = 0; ii < dim; ii++) {
                        // Only apply to other rows (we want a 1 on the diagonal)
                        if (ii == i) { continue; }

                        // We want to change this element to 0
                        e = C[ii][i];

                        // Subtract (the row above(or below) scaled by e) from (the
                        // current row) but start at the i'th column and assume all the
                        // stuff left of diagonal is 0 (which it should be if we made this
                        // algorithm correctly)
                        for (j = 0; j < dim; j++) {
                            C[ii][j] -= e * C[i][j]; //apply to original matrix
                            I[ii][j] -= e * I[i][j]; //apply to identity
                        }
                    }
                }

                //we've done all operations, C should be the identity
                //matrix I should be the inverse:
                return new matrix_obj.Matrix(I);
            }

            /**
             * Creates a square matrix filled with zeroes that has a supplied side length
             * @param {number} width 
             */

            static zero(width) {
                var result = new matrix_obj.Matrix([]);
                for (var i = 0; i < width; i++) {
                    result.array.push([]);
                    for (var j = 0; j < width; j++) {
                        result.array[i].push([0]);
                    }
                }

                return result;
            }

            /**
             * Creates an axb matrix filled with psuedorandom numbers in (0,1)
             * @param {number} a 
             * @param {number} b 
             */

            random(a, b) {
                var result = new Matrix([]);
                for (var i = 0; i < a; i++) {
                    result.array.push([]);
                    for (var j = 0; j < b; j++) {
                        result.array[i].push(Math.random());
                    }


                }
                return result;
            }



            sqrt() {
                if (this.width() !== this.height()) {
                    throw new Error("Can't find square root of matrix " + this + " - the matrix is not a square matrix")
                } else {
                    //Old series expansion method
                    // var result = matrix_obj.Matrix.zero(this.width());
                    // var identityMatrix = matrix_obj.Matrix.identity(this.width());
                    // const limit = 100;
                    // for (var n = 0; n < limit; n++) {
                    //     console.log("*****n=" + n);
                    //     var t1 = Math.abs(comb.ncr(0.5, n));
                    //     console.log("t1=" + t1);
                    //     var t2 = identityMatrix.subtract(this);
                    //     t2 = t2.pow(n);
                    //     console.log("t2=" + t2);
                    //     result = result.add(t2.multiplys(t1));
                    //     console.log("added value=" + t2.multiplys(t1));
                    //     console.log("result=" + result);
                    // }

                    // result = identityMatrix.subtract(result);
                    // return result;

                    var y = this;
                    var z = matrix_obj.Matrix.identity(this.width());

                    var y_old = y;
                    var z_old = z;

                    for (var k = 0; k < 500; k++) {
                        try {
                            y_old = y;
                            z_old = z;
                            y = y_old.add(z_old.inverse()).multiplys(1 / 2);
                            z = z_old.add(y_old.inverse()).multiplys(1 / 2);
                        } catch (e) {
                            console.warn("Denman-beaver iteration broke at k=" + k + ", program will return the last iteration valid.")
                            break;

                        }



                    }

                    /*
                    var y = [this];
                    var z = [matrix_obj.Matrix.identity(this.width())];


                    for (var k = 0; k < 50; k++) {
                        console.log("*****k=" + k)
                        console.log("y[k]=" + y[k])
                        console.log("z[k]=" + z[k])          

                        y.push((y[k].add(z[k].inverse())).multiplys(1 / 2));
                        z.push((z[k].add(y[k].inverse())).multiplys(1 / 2));
                    }

                    return y.pop();
                    */

                    return y;


                }
            }


            static carleman(f, size) {
                var result = new matrix_obj.Matrix([]);
                for (var j = 0; j < size; j++) {
                    result.array.push([]);
                    for (var k = 0; k < size; k++) {
                        var temp = 1 / comb.fac(k);
                        temp *= (derivative.derivative(function (x) {
                            return f(x) ** j
                        }, 0, k));
                        result.array[j].push(temp);
                    }
                }
                return result;
            }

            fourthRoot() {
                return this.sqrt().sqrt();
            }

            eighthRoot() {
                return this.fourthRoot().sqrt();
            }

            sixteenthRoot() {
                return this.eighthRoot().sqrt();
            }

            thirtySecondRoot() {
                return this.sixteenthRoot().sqrt();
            }

            sixtyFourthRoot() {
                return this.thirtySecondRoot().sqrt();
            }

            hundredTwentyEighthRoot() {
                return this.sixtyFourthRoot().sqrt();
            }

            twoHundredFixtySixthRoot() {
                return this.hundredTwentyEighthRoot().sqrt();
            }

            nthRoot(n) {
                var dyadic = matrix_obj.nearestDyadicFrac(1 / n);
                var result = matrix_obj.root_obj[dyadic[1]](this).powInt(dyadic[0]);


                return result;
            }



            pow(x) {


                var t1 = this.powInt(Math.floor(x));
                if (x % 1 === 0) {
                    return t1;
                } else {
                    var t2 = this.nthRoot(1 / (x % 1));
                    return t2.multiply(t1);
                }
            }


        },

        root_obj: {
            1:
            (n) => n,

            2:
            (n) => n.sqrt(),
            4:
            (n) => n.fourthRoot(),
            8:
            (n) => n.eighthRoot(),

            16:
            (n) => n.sixteenthRoot(),

            32:

            (n) => n.thirtySecondRoot(),

            64:

            (n) => n.sixtyFourthRoot(),

            128: (n) => n.hundredTwentyEighthRoot(),

            256: (n) => n.twoHundredFixtySixthRoot(),



        }
    }

    return matrix_obj;
});