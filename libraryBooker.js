
var libraryBooker;
(function($){
   libraryBooker = function(){
      //// functions
      var l, goodreads;
      
      //// variables
      var debug, html_attributes;
      
      //// settings
      debug = true;
      html_attributes = {
         'add_my_book_search_string' : "http://www.goodreads.com/assets/layout/addMyBookbutton.jpg",
         'book_title_search_string' : "a.bookTitle span",
         'book_author_search_string' : "a.authorName span",
         
         
         
      };
      
      l = function(msg) {if (debug && window['console']) { console.log(msg); }}
      
      
      
      var goodreads = function() {
         var add_my_book_buttons, add_to_library_button, tr, book_author, book_title;
         add_my_book_buttons = $('img[src="'+html_attributes.add_my_book_search_string+'"]');
         add_my_book_buttons.each(function(){
            var _this = this;
            tr = $(_this).parents('tr');
            book_author = $(tr).find(html_attributes.book_title_search_string).html();
            book_title = $(tr).find(html_attributes.book_author_search_string).html();
            add_to_library_button = $('<a href="javascript:;">add to library</a>');
            $(_this).parent().before(add_to_library_button);
         });

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