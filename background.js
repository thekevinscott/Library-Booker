chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{

   
	var sender_tab_id = sender.tab.id;
	
	switch(request.action)
	{
	   case 'open_library' :
	      var url = request.url;
	      var book_author = request.book_author;
	      var book_title = request.book_title;
	      
	      chrome.tabs.create({url : url}, function(tab) {
	         //alert('new tab!');
	      });
	   break;
	}

});