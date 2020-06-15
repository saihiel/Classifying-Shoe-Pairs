var buttonShoe1 = document.getElementById("shoe1");
var buttonShoe2 = document.getElementById("shoe2");
var buttonclassify = document.getElementById("classify");
var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
buttonclassify.disabled = true;

buttonclassify.onclick = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/take_a_pic");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ status: "classify" }));
    buttonShoe1.disabled = false;
    buttonShoe2.disabled = false;
    buttonclassify.disabled = true;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    }

};

buttonShoe1.onclick = function() {
    // var url = window.location.href + "record_status";
    buttonShoe1.disabled = true;
    // buttonUpload.disabled = false;

    // disable download link
    // var downloadLink = document.getElementById("download");
    // downloadLink.text = "";
    // downloadLink.href = "";

    // XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         // alert(xhr.responseText);
    //     }
    // }
    xhr.open("POST", "/take_a_pic");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ status: "shoe_1" }));
    if (buttonShoe2.disabled){
        buttonclassify.disabled = false;
    }
};

buttonShoe2.onclick = function() {
    buttonShoe2.disabled = true;

    // XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         alert(xhr.responseText);
    //
    //         // enable download link
    //         // var downloadLink = document.getElementById("download");
    //         // downloadLink.text = "Download Video";
    //         // downloadLink.href = "/static/video.avi";
    //     }
    // }
    xhr.open("POST", "/take_a_pic");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ status: "shoe_2" }));
    if (buttonShoe1.disabled){
        buttonclassify.disabled = false;
    }
};