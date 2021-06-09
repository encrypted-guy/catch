

const slider = document.querySelector('#imageslider');
let imagearray = [
    "/public/img/showfive.jpg",
    "/public/img/showone.jpg",
    "/public/img/showthree.jpg",
    "/public/img/showtwo.jpg"
];
let imageindex = 0;
const changeimage = () => {
    slider.setAttribute('src', imagearray[imageindex]);
    imageindex++;

    if(imageindex >= imagearray.length){
        imageindex = 0;
    }
}
setInterval(changeimage, 2000);

// heart
const togglefav = document.querySelectorAll('#changeontoggle');
togglefav.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add("addfavcolor");
    });
    
});