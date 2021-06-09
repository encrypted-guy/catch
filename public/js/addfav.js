const button = document.querySelectorAll('.add-fav');
button.forEach(btn => {
    btn.addEventListener('click', () => {
        //console.log('work till now');
        let id = btn.value;
        
        axios
            .get(`/add/fav/${id}`)
            .then(res => {
                //console.log(res);
                // console.log(`${id} added to fav`);
                return;
            })
            .catch(error => {
                // console.log(`can't add to fav ${error}`);
                return;
            });
            
    });
});