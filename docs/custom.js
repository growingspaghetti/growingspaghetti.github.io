function toggle(id) {
  let x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
var myiframe = document.getElementById('ts-1');
if (true) {
    myiframe.onload = function () { iframeIsLoaded(); };
} else {
    alert('testing 1'); // this fires for IE
    myiframe.onreadystatechange = function() {
        alert('testing 2'); // this fires for IE
        if (myiframe.readyState == 'complete') {
            alert('testing 3'); // this never fires
            iframeIsLoaded();
        }
    }
}
 
function iframeIsLoaded() {
    // re-enable the button
    //document.getElementById('downloadReport').disabled = '';
  alert("hey");
  }
