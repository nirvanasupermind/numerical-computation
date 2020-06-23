define(["integral","inverse"],function(integral,inverse) {
    /**
     * The erf module
     */
     var erf_obj = {
         /**
          * Returns the error function of a supplied number.
          * @param {number} x
          * @returns {number}
          */
         erf: function(x) {
             return 2/Math.sqrt(Math.PI)*integral.integral((t) => Math.exp(-(t**2)), 0, x);
         },
         
         /**
          * Returns the complementary error function (one minus the error function) of a supplied number.
          * @param {number} x
          * @returns {number}
          */



         erfc: function(x) {
             return 1-erf_obj.erf(x);
         },

           /**
          * Returns the inverse of the error function of a supplied number.
          */
         erfinv: function(x) {
             return inverse.inverse(erf_obj.erf,x);
         },

         /**
          * Returns the inverse of the complementary error function of a supplied number.
          */

          erfcinv: function(x) {
              return inverse.inverse(erf_obj.erfc,x);
          }


         
         
     };
    
});