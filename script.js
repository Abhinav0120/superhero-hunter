const getCharacter = document.getElementById('getcharacter');

let date = new Date();
console.log(date.getTime());

function findSuperHero(){

    let xhrRequest = new XMLHttpRequest();
    
    xhrRequest.onload = function(){
        console.log(xhrRequest.response);
    }

    let inputValue = "Spider-Man";
    const timeStamp = ts;
    const apiKey = publicKey; 
    const hashValue = hashVal;
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${inputValue}`;
    // const url = `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}`;

    xhrRequest.open('get', url);
    xhrRequest.send();
}

getCharacter.addEventListener('click', findSuperHero);

