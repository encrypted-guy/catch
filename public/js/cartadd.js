

// const cartavalue = () => {
//     setInterval(() => {
//         axios
//         .get('/cartvalue')
//         .then(res => {
//             console.log(res);
//             console.log(res.data.cartvalue);
//         })
//         .catch(error => {
//             console.log(error);
//         })
//     }, 100);
     
// }

/*
const button = document.querySelectorAll('.add-cart');
button.forEach(btn => {
    btn.addEventListener('click', () => {
        //console.log('work till now');
        let id = btn.value;
        
        axios
            .get(`/add/cart/${id}`)
            .then(res => {
                //console.log(res);
                console.log(`${id} added to cart`);
                return;
            })
            .catch(error => {
                console.log(`can't add to cart ${error}`);
                return;
            });
            
    });
});


const btn = document.querySelectorAll('.add-cart');
let cartvalue = 0;
btn.forEach(btn => {
    btn.addEventListener('click', () => {
           
        setTimeout(() => {
            axios
            .get('/cartvalue')
            .then(res => {
                // console.log(res);
                console.log(res.data.cartvalue);

                cartvalue = res.data.cartvalue;

            })
            .catch(error => {
                console.log(error);
            })
        }, 100);
        
        valueupdate()

    });
});

console.warn(cartvalue)

const valueupdate = () => {
    const valueposition = document.querySelectorAll('.cartvaluehere');
    valueposition.forEach(element => {
        element.innerText = cartvalue;
    });
}
window.addEventListener('load', function() {
    const valueposition = document.querySelectorAll('.cartvaluehere');
    valueposition.forEach(element => {
        element.innerText = cartvalue;
    });
})


*/



// setInterval(() => {
//     axios
//     .get('/cartvalue')
//     .then(res => {
//         console.log(res);
//         console.log(res.data.cartvalue);
//     })
//     .catch(error => {
//         console.log(error);
//     })
// }, 1000)    