
var libraryBooker;
(function($){
   libraryBooker = function(){
      //// functions
      var l, goodreads, createLibraryUrl;
      
      //// variables
      var debug, html_attributes, library_url, styles;
      
      //// settings
      debug = true;
      library_url = "http://catalog.einetwork.net/search/";
      html_attributes = {
         'add_my_book_search_string' : "http://www.goodreads.com/assets/layout/addMyBookbutton.jpg",
         'book_title_search_string' : "a.bookTitle span",
         'book_author_search_string' : "a.authorName span",
      };
      styles = {
         'add_to_library' : 'position: absolute;margin-left: -98px;padding: 4px 10px 5px 10px;border: 1px solid #ceccbd;background: #edebdc; color : #382110;'
      }
      
      l = function(msg) {if (debug && window['console']) { console.log(msg); }}
      
      createLibraryUrl = function(params)
      {
         var book_title = params.book_title.replaceAll(' ','+');
         switch(library_url)
         {
            case "http://catalog.einetwork.net/search/" : 
               return "http://catalog.einetwork.net/search/a?searchtype=Y&searcharg="+book_title+"&SORT=D&searchscope=1&submit=Search";
            break;
         }
      }
      
      
      goodreads = function() {
         var add_my_book_buttons, add_to_library_button, tr, book_author, book_title, library_search_url;
         add_my_book_buttons = $('img[src="'+html_attributes.add_my_book_search_string+'"]');
         add_my_book_buttons.each(function(){
            var _this = this;
            tr = $(_this).parents('tr');
            book_author = $(tr).find(html_attributes.book_author_search_string).html();
            book_title = $(tr).find(html_attributes.book_title_search_string).html();

            library_search_url = createLibraryUrl({book_author : book_author, book_title : book_title});
            add_to_library_button = $('<a target="_blank" href="'+library_search_url+'" class="addToLibrary" style="'+styles.add_to_library+'">add to library</a>');
            /*
            add_to_library_button.click(function(){
               
               chrome.extension.sendRequest({
                  action: 'open_library',
                  url : library_search_url
               });
               
            });
            */
            $(_this).parent().before(add_to_library_button);
         });

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