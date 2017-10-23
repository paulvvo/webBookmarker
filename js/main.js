
/*
 -get form element
 -add submit event listener
 -calls saveBookmark function
*/
document.getElementById('myForm').addEventListener('submit', saveBookmark);

localStorage.setItem('test','hello world');
//save bookmark function
function saveBookmark(e){

    /*
    -site name variable, getting the value
    -site url varible, getting the value
    */
    var siteName = document.getElementById('siteHolder').value;
    var siteUrl = document.getElementById('siteURL').value;

    if(!validation(siteUrl, siteName)){
        return false;
    }
    
    var bookmark = {
        name:siteName,
        url:siteUrl
    }
    /**
     * Local Storage Functions
     * key, value
     * localStorage.setItem('test','Hello World');
     * LocalStorage.getItem('test');
     * LocalStorage.removeItem('test');
     */

    /**
     * checks if there is a bookmarks key in the local storage
     */
     if(localStorage.getItem('bookmarks') === null){
        //creates the initial bookmarks array
        var bookmarks = [];
        //push the bookmark object into the bookmarks array
        bookmarks.push(bookmark);
        /**
         * key is "bookmarks"
         * value is the bookmarks array
         * bookmarks needs to be converted into strings from JSON
         */
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
     }
     //If there is an existing bookmarks 
     else{
        /**
         * gettings the bookmarks array from local storage
         * need to convert from String back to JSON
         */
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //pushing the new bookmark object into the array that was retrieved
        bookmarks.push(bookmark);
        /**
         * bookmarks array is converted back to String from JSON
         * the array is set back into localstorage
         * same key 
         */
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
     }

    //clear form
    document.getElementById("myForm").reset();
    
    //fetch bookmarks to update the page
    fetchBookmarks();
    e.preventDefault();
}


function fetchBookmarks(){
    /**
     * getting bookmarks array from local storage
     * converting String to JSON
     */
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    
    //show the bookmarks in JSON format on the console
    //console.log(bookmarks);

    //getting results id
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    //for loop to cycle through the entire array of bookmarks
    for (var i=0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                      '<h3>' + name +
                                      ' <a class="btn btn-primary" target="_blank" href="' + url + '">  Visit </a> ' +
                                      ' <a onclick = "deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">  Delete </a> ' +
                                      ' </h3>' +
                                      '</div>';
    }
    

}

function deleteBookmark(url){
        //retrieve the bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

        //cycle through the entire bookmark array
        for(var i=0; i< bookmarks.length; i++){
            //match delete bookmark with bookmark in array
            if(bookmarks[i].url == url){
                //remove the bookmark from the array
                bookmarks.splice(i,1);
            }
        }
        //set the array of bookmarks back into localstorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        //fetchbookmarks to refresh the page
        fetchBookmarks();
    
}


function validation(siteUrl,siteName){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    //checks to see if there is a submission
    if(!siteName || !siteUrl){
        alert("Please Fill in the Form");
        return false;
    }
    //determines whether the submissions is a valid url
    if(!siteUrl.match(regex)){
        alert("not valid url");
        return false;
    }

    return true;
}