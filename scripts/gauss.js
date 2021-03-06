/*
Most of this code is copied from an external library "RobertMenke/regressionjs", 
credits to him, because otherwise it would be super-hard to get the gauss elimination
terms. The license of the library is:

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

define([], function () {
    return {
        backwardSubstitution: function (anyMatrix, arr, row, col) {
            if (row < 0 || col < 0) {
                return arr;
            }
            else {
                const rows = anyMatrix.length;
                const cols = anyMatrix[0].length - 1;
                let current = 0;
                let counter = 0;

                for (let i = cols - 1; i >= col; i--) {

                    if (i === col) {
                        current = anyMatrix[row][cols] / anyMatrix[row][i];


                    } else {
                        anyMatrix[row][cols] -= anyMatrix[row][i] * arr[rows - 1 - counter];
                        counter++;
                    }
                }

                arr[row] = current;
                return this.backwardSubstitution(anyMatrix, arr, row - 1, col - 1);
            }
        },
        combine_matrices: function (left, right) {

            const rows = right.length;
            const cols = left[0].length;
            const returnMatrix = [];

            for (let i = 0; i < rows; i++) {
                returnMatrix.push([]);

                for (let j = 0; j <= cols; j++) {

                    if (j === cols) {

                        returnMatrix[i][j] = right[i];

                    } else {

                        returnMatrix[i][j] = left[i][j];
                    }
                }
            }

            return returnMatrix;
        },

        forwardElimination: function (anyMatrix) {

            const rows = anyMatrix.length;
            const cols = anyMatrix[0].length;
            const matrix = [];
            //returnMatrix = anyMatrix;
            for (let i = 0; i < rows; i++) {

                matrix.push([]);

                for (let j = 0; j < cols; j++) {
                    matrix[i][j] = anyMatrix[i][j];
                }
            }

            for (let x = 0; x < rows - 1; x++) {

                for (let z = x; z < rows - 1; z++) {

                    const numerator = matrix[z + 1][x];
                    const denominator = matrix[x][x];
                    const result = numerator / denominator;


                    for (let i = 0; i < cols; i++) {

                        matrix[z + 1][i] = matrix[z + 1][i] - (result * matrix[x][i]);
                    }
                }
            }
            return matrix;
        },

        gauss: function (leftMatrix, rightMatrix) {

            const combined = this.combine_matrices(leftMatrix, rightMatrix);
            const fwdIntegration = this.forwardElimination(combined);
            //NOW, FINAL STEP IS BACKWARD SUBSTITUTION WHICH RETURNS THE TERMS NECESSARY FOR POLYNOMIAL REGRESSION
            return this.backwardSubstitution(fwdIntegration, [], fwdIntegration.length - 1, fwdIntegration[0].length - 2);
        }





    }

});