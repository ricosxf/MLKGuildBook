// Example:

// writeCookie("myCookie", "my name", 24);

// Stores the string "my name" in the cookie "myCookie" which expires after 24 hours.

function writecookie(name, value, hours) {

    var expire = "";

    if (hours != null) {

        expire = new Date((new Date()).getTime() + hours * 3600000);

        expire = "; expires=" + expire.toGMTString();

    }

    document.cookie = name + "=" + escape(value) + expire;

}

// Example:

// alert( readCookie("myCookie") );

function readcookie(name) {

    var cookieValue = "";

    var search = name + "=";

    if (document.cookie.length > 0) {

        offset = document.cookie.indexOf(search);

        if (offset != -1) {

            offset += search.length;

            end = document.cookie.indexOf(";", offset);

            if (end == -1) end = document.cookie.length;

            cookieValue = unescape(document.cookie.substring(offset, end))

        }

    }

    return cookieValue;

}
function clearcookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        //alert((new Date()).toUTCString());
        for (i in keys) {//alert(keys[i]);
            var date = new Date();

            date.setTime(date.getTime() - 1000);
            document.cookie = keys[i] + '=000;expires=' + date.toGMTString() + ";path=/";

        }
    }
}
