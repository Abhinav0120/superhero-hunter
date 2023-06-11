(() => { 
    superHeroGallery = document.getElementById('gallery-section');


    function onload(){
        // for rendering favorite super heros
        // let list = favoriteList;
        renderList();

        // displaying available super heros
        const timeStamp = ts;
        const apiKey = publicKey; 
        const hashValue = hashVal;
        const limit = 40;
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&limit=${limit}`;
        
        // fetching superheros data
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
        if(name === null){
            return;
        }
        inputValue.value = name;
        findSuperHero();

        //for scrolling to the searchResult 
        const parentDiv = searchResult.parentElement;
        parentDiv.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

})();