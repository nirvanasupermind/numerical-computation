define([],function() {
    var integral_obj = {
        integral: function(f,a,b,n) {
          if(n === undefined) {
            n = 10000;
        }

        var t1 = (b-a)/n;
        var t2 = f(a)/2;

        for(var k = 1; k < n-1; k++) {
            t2 += f(a+k*t1);
        }

        t2 += f(b)/2;


        return t1*t2;
    },
    
    infIntegral: function(f,a) {
        function g(t) {
            return f(a+(t/(1-t)))/((1-t)**2);
        }

        return integral_obj.integral(g, 1e-10, 1-1e-10, 10000)
    }

}

return integral_obj;
})