
var libraryBooker;
(function($){
   libraryBooker = function(){
      //// functions
      var l, goodreads, createLibraryUrl, library_functions, save;
      
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
         pin : localStorage['pin'],
         pickup_location : localStorage['pickup_location'],         
      }
      
      l = function(msg) {if (debug && window['console']) { console.log(msg); }}
      
      save = function(key,val)
      {
         localStorage[key] = val;
         user_defaults[key] = localStorage[key];
      }
      
      library_functions = {
         'catalog.einetwork.net' : function() {
            switch(window.location.pathname) {
               case "/patroninfo~S1" :
                  // login screen
                  var login_form, card_number, pin;
                  $(document).ready(function(){
                     login_form = $('form');
                     card_number = login_form.find('input[name=code]');
                     pin = login_form.find('input[name=pin]');
                     
                     if (login_form.length && card_number.length && pin.length && user_defaults && user_defaults.card_number && user_defaults.pin) {
                        
                        card_number.val(user_defaults.card_number);
                        pin.val(user_defaults.pin);
                        //$(login_form).submit();
                     }
                  });
               break;
               case "/search~S1" :
                  // check that this is the reserve screen
                  var pickup_location, month, day, year;
                  pickup_location   = $('select[name=locx00]');
                  month             = $('select[name=needby_Month]');
                  day               = $('select[name=needby_Day]');
                  year              = $('select[name=needby_Year]');
                  
                  $.each([pickup_location, month, day, year],function(){
                     var field = this;
                     var name = $(this).attr('name');
                     if (field.length) {
                        $(field).change(function(){
                           save(name,$(this).val());
                        });

                        if (user_defaults[name]) {
                           field.val(user_defaults[name]);
                        }

                     }
                  });
                  
                  
                  // reserve screen
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