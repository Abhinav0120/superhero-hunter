const getCharacter = document.getElementById('search-button');
const inputValue = document.getElementById('input-value');
const superheroImgContainer = document.getElementById('superhero-img-container');
const searchResult = document.getElementById('search-result');

let date = new Date();
console.log(date.getTime());

function findSuperHero(){

    // let xhrRequest = new XMLHttpRequest();
    
    // xhrRequest.onload = function(){
    //     console.log(xhrRequest.response);
    // }

    let characterName = inputValue.value.trim();
    if(characterName === ''){
        console.error('Please enter a character name');
        return;
    }

    const timeStamp = ts;
    const apiKey = publicKey; 
    const hashValue = hashVal;
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${characterName}`;
    // const url = `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}`;

    // xhrRequest.open('get', url);
    // xhrRequest.send();

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
            // const characterImage = document.createElement('img');
            // characterImage.src = thumbnailUrl;
            // superheroImgContainer.appendChild(characterImage);
            searchResult.style.display = 'flex';
            superheroImgContainer.innerHTML = ` 
                <img id="superhero-img" src="${thumbnailUrl}" alt="Super hero">
            `
        })
        .catch((error)=>{
            console.error(error);
        });
    })
    .catch((error) => {
        console.error(error);
    });
}

getCharacter.addEventListener('click', findSuperHero);

