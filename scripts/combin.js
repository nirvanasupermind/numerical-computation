define(["fac"], function(fac) {
   return {
       ncr: function(n,r) {
           return fac.fac(n)/(fac.fac(r)*fac.fac(n-r));
       },
       npr: function(n,r) {
        return fac.fac(n)/fac.fac(n-r);
       }
   }
})