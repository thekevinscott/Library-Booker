
var libraryBooker;
(function($){
   libraryBooker = function(){
      var debug = true;
      var l = function(msg) {
         if (debug && window['console']) { console.log(msg); }
      }
      var goodreads = function() {
         var addMyBook = $('img[src=http://www.goodreads.com/assets/layout/addMyBookbutton.jpg]');
         console.log(addMyBook);
      };
      

      switch(window.location.hostname) {
         case 'www.goodreads.com' :
            goodreads();
         break;
      }
      return {
         
         
      }
   }();
})(jQuery);