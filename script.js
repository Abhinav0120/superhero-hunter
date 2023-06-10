const getCharacter = document.getElementById('search-button');
const inputValue = document.getElementById('input-value');
const superheroImgContainer = document.getElementById('superhero-img-container');
const searchResult = document.getElementById('search-result');
const autoResultsContainer = document.getElementById('auto-results-container');
let addFavoriteButton = document.getElementById('add-favorite-button');
const favoriteContainer = document.getElementById('favorite-container');

let date = new Date();
// console.log(date.getTime());
let favoriteList = [];
// localStorage.setItem('favoriteList',JSON.stringify(favoriteList));

const storedData = localStorage.getItem('favoriteList');
if (storedData !== null) {
    console.log('localStorage is not empty');
    const parsedData = JSON.parse(storedData);
    console.log(parsedData);
    favoriteList = parsedData;
    // console.log(favoriteList);
}

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
            const comicUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}`;
            fetch(comicUrl)
            .then((response)=>{
                if(!response.ok){
                    throw new Error('Network response was not Ok');
                }

                return response.json();
            })
            .then((comicsData)=>{
                if(comicsData.data.results.length === 0){
                    console.error("Comic not found");
                    return;
                }
                // console.log(comicsData);

                const comics = comicsData.data.results;
                const comicsContainer = document.getElementById('comics-container');
                comicsContainer.innerHTML = '';

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

function addToFavorite(){
    const superheroImg = document.getElementById('superhero-img');

    const thumbnailUrl = superheroImg.getAttribute('src');
    const characterName = superheroImg.getAttribute('data-value');

    let favoriteSuperHero = {
        thumbnailUrl : thumbnailUrl,
        characterName : characterName
    }

    favoriteList.push(favoriteSuperHero);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));

    // const favorite = document.createElement('div');
    
    // favorite.innerHTML = `
    //     <div class="favorite">
    //         <div class="fav-img-container">
    //             <img class="fav-img" src="${thumbnailUrl}" alt="">
    //         </div>
    //         <div class="fav-desc">
    //             <span>
    //                 ${characterName}
    //             </span>
    //             <button>
    //                 Remove
    //             </button>
    //         </div>
    //     </div>
    // `
    // favoriteContainer.appendChild(favorite);
    // console.log(favoriteList);

    renderList();
}


function renderList(){
    favoriteContainer.innerHTML= '';
    let list = favoriteList;
    console.log(list);
    list.forEach((superhero) => {
        const thumbnailUrl = superhero.thumbnailUrl;
        const characterName = superhero.characterName;

        const favorite = document.createElement('div');  
        favorite.innerHTML = `
            <div class="favorite">
                <div class="fav-img-container">
                    <img class="fav-img" src="${thumbnailUrl}" alt="">
                </div>
                <div class="fav-desc">
                    <span>
                        ${characterName}
                    </span>
                    <button>
                        Remove
                    </button>
                </div>
            </div>
        `
        favoriteContainer.appendChild(favorite);
    });
}

getCharacter.addEventListener('click', findSuperHero);
addFavoriteButton.addEventListener('click', addToFavorite);

