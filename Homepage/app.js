var img = ["slider1.png", "slider2.png", "slider3.png"];

const elId = id => document.getElementById(id);
const elClass = className => document.getElementsByClassName(className);

var sliderContainer = elId("slider-container");
var slider = elClass("slider")[0];
var viewPort = sliderContainer.offsetWidth;
var direction = -1;
var nextBtn = elId("next-btn");
var prevBtn = elId("prev-btn");

// set link anh
var slides = elClass("slide");
for (let i = 0; i < slides.length; i++) {
    let src = "../image/" + img[i];
    slides[i].style.backgroundImage = "url(\'" + src + "\')";
}
nextBtn.addEventListener('click', () => {
    direction = -1;
    slider.classList.add('animated');
    slider.style.transform = "translateX(" + -viewPort + "px)";
})
prevBtn.addEventListener('click', () => {
    direction = 1;
    slider.classList.add('animated');
    slider.style.transform = "translateX(" + viewPort + "px)";
})
slider.addEventListener('transitionend', () => {
    if (direction === -1) {
        slider.appendChild(slider.firstElementChild);
    } else if (direction === 1) {
        slider.prepend(slider.lastElementChild);
    }
    slider.classList.remove('animated');
    slider.style.transform = "translateX(0px)";
})

setInterval(() => {
    nextBtn.click();
}, 3000);

var x = elClass('mess');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, showError)
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    initMap(lat, long);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function initMap(latitude, longitude) {
    let uluru = { lat: latitude, long: longitude };
    let map = new google.maps.Map(
        elClass('map'), { zoom: 4, center: uluru }
    );
    let marker = new google.maps.Marker({ position: uluru, map: map })
}