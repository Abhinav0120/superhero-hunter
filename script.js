// required elements
const getCharacter = document.getElementById('search-button');
const inputValue = document.getElementById('input-value');
const superheroImgContainer = document.getElementById('superhero-img-container');
const searchResult = document.getElementById('search-result');
const autoResultsContainer = document.getElementById('auto-results-container');
let addFavoriteButton = document.getElementById('add-favorite-button');
const favoriteContainer = document.getElementById('favorite-container');

// global variables
let date = new Date();
let favoriteList = [];

// checking if localStorage is empty or not
const storedData = localStorage.getItem('favoriteList');
if (storedData !== null) {
    console.log('localStorage is not empty');
    const parsedData = JSON.parse(storedData);
    console.log(parsedData);
    favoriteList = parsedData;
    // console.log(favoriteList);
}

// find superhero function 
function findSuperHero(){
    
    if(autoResultsContainer.style.display != 'none'){
        autoResultsContainer.style.display = 'none';
    }

    let characterName = inputValue.value.trim();
    if(characterName === ''){
        console.error('Please enter a character name');
        return;
    }

    const timeStamp = ts;
    const apiKey = publicKey; 
    const hashValue = hashVal;
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${characterName}`;

    // fetching Super hero data like name thumbnail discription comics
    fetch(url)
    .then((response) =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then((data) =>{
        if(data.data.results.length === 0){
            console.error('Character not found');
            return;
        }

        const characterId = data.data.results[0].id;
        const characterUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${inputValue}`;

        fetch(characterUrl)
        .then((response) => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then((characterData) => {
            const thumbnailUrl = characterData.data.results[0].thumbnail.path + '.' + characterData.data.results[0].thumbnail.extension;
            const characterName = characterData.data.results[0].name;

            searchResult.style.display = 'flex';
            superheroImgContainer.innerHTML = ` 
                <img id="superhero-img" src="${thumbnailUrl}" alt="Super hero" data-value="${characterName}">
            `

            const descriptionContainer = document.getElementById('description-container');
            let characterDescription = characterData.data.results[0].description;
            if(!characterDescription){
                characterDescription = "Information is Classified";
            }
            descriptionContainer.innerHTML = `
                <h3>
                    ${characterName}
                </h3>
                <p id="description">
                    ${characterDescription}
                </p>
            `
            searchResult.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // or 'center' for center alignment
            });
            const comicUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}`;
            fetch(comicUrl)
            .then((response)=>{
                if(!response.ok){
                    throw new Error('Network response was not Ok');
                }

                return response.json();
            })
            .then((comicsData)=>{
                const comicsContainer = document.getElementById('comics-container');
                comicsContainer.innerHTML = '';
                if(comicsData.data.results.length === 0){
                    comicsContainer.innerHTML = '<h1> No comics found </h1>';
                    console.error("Comic not found");
                    return;
                }
                const comics = comicsData.data.results;
                comics.forEach((comic)=>{
                   
                    const comicWrapper = document.createElement('div');
                    comicWrapper.classList.add('comic');
                    const imgSrc = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
                    const comicTitle = `${comic.title}`;
                    comicWrapper.innerHTML = `
                        <div class="img-container">
                            <img src="${imgSrc}" alt="comic">
                        </div>
                        <span class="name">
                           ${comicTitle}
                        </span>
                    `
                    comicsContainer.appendChild(comicWrapper);
                });

            })
            .catch((error)=>{
                console.error(error);
            })

        })
        .catch((error)=>{
            console.error(error);
        });
    })
    .catch((error) => {
        console.error(error);
    });
}

// renderList function for rendering superheros from favoriteList
function renderList(){
    favoriteContainer.innerHTML= '';
    let list = favoriteList;
    console.log(list);
    list.forEach((superhero) => {
        const thumbnailUrl = superhero.thumbnailUrl;
        const characterName = superhero.characterName;

        const favorite = document.createElement('div');  
        favorite.classList.add('favorite')
        favorite.innerHTML = `
                <div class="fav-img-container">
                    <img class="fav-img" src="${thumbnailUrl}" alt="">
                </div>
                <div class="fav-desc">
                    <span>
                        ${characterName}
                    </span>
                    <button class="remove-favorite" data-value="${characterName}">
                        Remove
                    </button>
                </div>
        `
        favoriteContainer.appendChild(favorite);
    });

    let removeFavoriteButtons = document.querySelectorAll('.remove-favorite');
    removeFavoriteButtons.forEach((button)=>{
        button.addEventListener('click', function(event){
            const target = event.target;
            const name = target.getAttribute('data-value');
            removeFromFavorite(name);
        })
    });
}

// addToFavorite function to add super hero to favoriteList
function addToFavorite(){
    const superheroImg = document.getElementById('superhero-img');

    const thumbnailUrl = superheroImg.getAttribute('src');
    const characterName = superheroImg.getAttribute('data-value');

    let favoriteSuperHero = {
        thumbnailUrl : thumbnailUrl,
        characterName : characterName
    }

    //cheking whether favoriteSuperhero already exists
    const index = favoriteList.findIndex((superhero) => superhero.characterName === favoriteSuperHero.characterName) 
    
    if(index === -1){
        favoriteList.push(favoriteSuperHero);
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));

        const favorite = document.createElement('div');  
        favorite.classList.add('favorite')
        favorite.innerHTML = `
                <div class="fav-img-container">
                    <img class="fav-img" src="${thumbnailUrl}" alt="">
                </div>
                <div class="fav-desc">
                    <span>
                        ${characterName}
                    </span>
                    <button class="remove-favorite" data-value="${characterName}">
                        Remove
                    </button>
                </div>
        `
        favoriteContainer.appendChild(favorite);
        const removeFavoriteButton = favorite.querySelector('.fav-desc .remove-favorite');
        removeFavoriteButton.addEventListener('click',function(event){
            const target = event.target;
            const name = target.getAttribute('data-value');
            removeFromFavorite(name);
        });
    }else{
        window.alert(`${characterName} is already in your favorite list`);
    }
    
}

// removeFromFavorite function to remove superhero from favoriteList
function removeFromFavorite(name){
    console.log('removing from favorite');
    const index = favoriteList.findIndex((superhero) => superhero.characterName === name);
    if (index !== -1) {
        favoriteList.splice(index, 1);
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));

        // Remove the corresponding element from the HTML
        const favoriteElements = document.querySelectorAll('.favorite');
        favoriteElements.forEach((element) => {
            const characterName = element.querySelector('.fav-desc span').textContent.trim();
            if (characterName === name) {
                element.remove();
            }
        });
    }
}
getCharacter.addEventListener('click', findSuperHero);
addFavoriteButton.addEventListener('click', addToFavorite);


