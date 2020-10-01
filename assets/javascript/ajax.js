(function () {

    var httpRequest;
    // Grab reference to the button
    var ajaxButton = document.getElementById("ajaxButton");
    ajaxButton.addEventListener('click', makeRequest);


    function makeRequest() {
        // grave user's input value
        var value = document.getElementById("userInput").value;
        console.log(value);
        //GHIPHY API provides an APIkey unique to each user.
        var APIkey = "...";
        //[documentation] host: api.giphy.com ; path: /v1/gifs/search
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + APIkey + "&limit=1";

        console.log("clicked!");
        // Create XMLHttpRequest instance
        httpRequest = new XMLHttpRequest();
        
        if (!httpRequest) {
            console.log("Instance creation unsuccessfull.");
            return false;
        }
        // onreadystatechange, ajaxfunction will be called
        httpRequest.onreadystatechange = ajaxFunction;
        httpRequest.open("GET", queryURL, true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        // httpRequest.onload = function () {
        //     alert(httpRequest.responseText);
        // }
        // ajaxFunction();
        httpRequest.send();
    }



    function ajaxFunction() {
        console.log("making ajax call");
        
        // check the request's state and HTTP response status code
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                     // httpRequest.responseText is returned as a string, even though it’s in JSON format. ***
                    var data = JSON.parse(httpRequest.responseText);
                    console.log(data);
                    console.log(data.data[0].url)  //undefined
                    

                    //grab reference to empty div
                    var gifContainer = document.getElementById("giphyContainer");
                    var image = document.createElement("IMG");
                    image.setAttribute("src", data.data[0].url);
                    image.setAttribute("width", "200");
                    image.setAttribute("height", "200");
                    image.setAttribute("alt", "dynamic gif");

                    gifContainer.append(image);


                } else {
                    alert("there is a problem with the request.");
                }
            }
        }
        catch (e) {
            alert('caught exception: ' + e.description);
        }
        // console.log(text);
        // console.log(httpRequest.response);
    }
})();  //equivalent to $(document).ready(function() 