
var libraryBooker;
(function($){
   libraryBooker = function(){
      //// functions
      var l, goodreads, createLibraryUrl, library_functions;
      
      //// variables
      var debug, html_attributes, library_url, styles, user_defaults;
      
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
      };
      user_defaults = {
         card_number : localStorage['card_number'],
         pin : localStorage['pin']
      }
      
      l = function(msg) {if (debug && window['console']) { console.log(msg); }}
      
      library_functions = {
         'catalog.einetwork.net' : function() {
            switch(window.location.pathname) {
               case "/patroninfo~S1" :
                  // login screen
                  var login_form, card_number, pin;
                  $(document).ready(function(){
                     if (user_defaults && user_defaults.card_number && user_defaults.pin) {
                        
                        login_form = $('form');
                        card_number = login_form.find('input[name=code]');
                        pin = login_form.find('input[name=pin]');
                        card_number.val(user_defaults.card_number);
                        pin.val(user_defaults.pin);
                        $(login_form).submit();
                     }
                  });
               break;
            }
            
         }
      };
      
      createLibraryUrl = function(params)
      {
         var book_title = params.book_title.trim().replace(/\ /g,'+');
         switch(library_url)
         {
            case "http://catalog.einetwork.net/search/" : 
               return "http://catalog.einetwork.net/search~S1/?searchtype=t&searcharg="+book_title+"";
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
         default :
            if (library_functions[window.location.hostname]) {
               library_functions[window.location.hostname]();
            }
         break;
      }
      return {
         
         
      }
   }();
})(jQuery);