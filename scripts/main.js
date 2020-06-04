require(["numerical"], function (numerical) {

    // var m1 = function(x) {
    //     return Math.exp(x+1);
    // }

    // var m2 = halfIterate.halfIterate(m1,3);
    // console.log(m2);
    
    console.log((numerical.Matrix.carleman(function (x) {
        return x**2
    },3)).sqrt());

});