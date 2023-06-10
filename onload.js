(() => { 
    superHeroGallery = document.getElementById('gallery-section');


    function onload(){
        // for rendering favorite super heros
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

        const timeStamp = ts;
        const apiKey = publicKey; 
        const hashValue = hashVal;
        const limit = 40;
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&limit=${limit}`;
    
        fetch(url)
        .then((response)=>{
            if(!response.ok){
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then((data)=>{
            if(data.data.results.length===0){
                console.error('Characters not found');
                return;
            }

            // console.log(data);

            const superheroes = data.data.results;

            superheroes.forEach((superhero)=>{
                // Create a contianer for each superhero
                const superheroContainer = document.createElement('div');
                superheroContainer.classList.add('superhero-container');

                // Create an image element for the superheros's thumbnail
                const thumbnailUrl = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
                const thubmnailImage = document.createElement('img');
                thubmnailImage.src = thumbnailUrl;
                thubmnailImage.classList.add('superhero-Thumbnail');
                thubmnailImage.setAttribute('data-value',`${superhero.name}`);

                // create a heading element for the superhero's name
                const nameHeading = document.createElement('h3');
                nameHeading.classList.add('suprehero-name');
                nameHeading.textContent = superhero.name;
                nameHeading.setAttribute('data-value', `${superhero.name}`);

                //append thubmnailImage and name to superheroContainer
                superheroContainer.appendChild(thubmnailImage);
                superheroContainer.appendChild(nameHeading);

                // append the superherocontainer to the superHeroGallery
                superHeroGallery.appendChild(superheroContainer);
            });

        })
        .catch((error)=>{
            console.error(error);
        });
    }
    onload();

    superHeroGallery.addEventListener('click', function(event){
        let target = event.target;
        let name = target.getAttribute('data-value');

        inputValue.value = name;
        findSuperHero();
        // console.log(target);
    });

})();