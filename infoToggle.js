(() =>{
    const options = document.getElementById('options');
    const description = document.getElementById('description-container');
    const descriptionButton = document.getElementById('description-button');
    const comicButton = document.getElementById('comics-button');
    const comics = document.getElementById('comics-container');

    options.addEventListener('click', function(event){
        let target = event.target;
        // console.log(target);
        if(target == descriptionButton){
            comics.style.display = 'none';
            description.style.display = 'block';
        }else if(target == comicButton){
            description.style.display = 'none';
            comics.style.display = 'flex';
        }
    });
})();