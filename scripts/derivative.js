define([], function () {
    var derivative_obj =  {
        

        firstDerivative: function(f,x) {
            var h = Math.sqrt(Number.EPSILON);
            return (f(x+h)-f(x-h))/(2*h)
        },

        firstDerivativeFunc: function(f) {
            return function(x) {
                return derivative_obj.firstDerivative(f,x);
            }
        },
        

      
        // firstDerivative2: function (f, x) {
        //     var data = {};
        //     var step = 0.05;
        //     for (var i = -10; i < 10; i += step) {

        //              if(Math.abs(f(i)) < 200) {
                   
        //             data[i] = f(i);
        //              }
                
        //     }





        //     var a = regression.quadraticRegression(data).a*2;
        //     var b = regression.quadraticRegression(data).b;

        //     return a*x+b;



        //     // if (isFinite(f(x)) && isFinite(Math.log(f(x)))) {
        //     //     data[x] = f(x);
        //     // }
            

           
        // },

        // firstDerivative2Func: function (f) {
        //     return function (x) {
        //         return derivative_obj.firstDerivative(f, x);
        //     }
        // },

        derivative: function(f,x,n) {
            for (var i = 0; i < n; i++) {
                var oldF = f;
       
                    f =  derivative_obj.firstDerivativeFunc(oldF, x);
                    
                


            }

            return f(x);
        },

        // derivativeStable: function (f, x, n) {
        //     // n = parseFloat(n) ? 1 : n;
        //     for (var i = 0; i < n; i++) {
        //         var oldF = f;
       
        //             f =  derivative_obj.firstDerivative2Func(oldF, x);
                    
                


        //     }

        //     return f(x);
        // }

    }

    
    
    return derivative_obj;
});
