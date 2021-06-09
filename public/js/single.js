const togglefav = document.querySelectorAll('#changeontoggle');
togglefav.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add("addfavcolor");
    });
    
});

// single product [page]
const modelimage = document.querySelectorAll('.modelimage');
const changeimage = document.querySelector('.changeimage');
modelimage.forEach(element => {
    element.addEventListener('click', () => {
        let src = element.getAttribute('src');
        // console.log(src)
        changeimage.setAttribute("src", src);
    });
});