
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
                                      '<a class="btn btn-primary" target="_blank" href="' + url + '"> Visit </a> ' +
                                      '</h3>' +
                                      '</div>';
    }
    

}