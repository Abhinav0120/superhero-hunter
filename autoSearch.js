(()=>{
    // const inputValue = document.getElementById('input-value');
    // const autoResultsContainer = document.getElementById('auto-results-container');
    
    function showAutoSearch(){  

        let characterName = inputValue.value.trim();
        if(characterName === ''){
            console.error('please enter a character name');
            return;
        }

        const timeStamp = ts;
        const apiKey = publicKey;
        const hashValue = hashVal;
        // const url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartWith=${characterName}`;
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${characterName}`;

        fetch(url)
        .then((response) =>{
            if(!response.ok){
                throw new Error('Netwok response was not ok');
            }

            return response.json();
        })
        .then((data) =>{
            if(data.data.results.length === 0){
                console.error('Character not found');
                return;
            }

            // console.log(data);
            
            const superheroes = data.data.results;
            autoResultsContainer.innerHTML = '';
            autoResultsContainer.style.display = 'block'
            superheroes.forEach((superhero) =>{
                const superheroName = superhero.name;
                const thumbnailUrl = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;

                const autoResult = document.createElement('div');
                autoResult.classList.add('auto-result');

                autoResult.innerHTML = `
                    <div class="character-img-container">
                        <img class="character-img" src="${thumbnailUrl}" alt="Super Hero" data-value="${superheroName}">
                    </div>
                    <div class="character-desc" data-value="${superheroName}">
                        ${superheroName}
                    </div>
                `
                autoResultsContainer.appendChild(autoResult);
                
            });

        })
        .catch((error) =>{
            console.error(error);
        });
    }

    inputValue.addEventListener('input', showAutoSearch);
    autoResultsContainer.addEventListener('click', function(event){
        let target = event.target;
        // console.log(target);

        let name = target.getAttribute('data-value');
        if(name === null){
            return;
        }
        inputValue.value = name;
        findSuperHero();
    });

    window.addEventListener('click', function(){
        if(autoResultsContainer.style.display != 'none'){
            autoResultsContainer.style.display = 'none';
        }
    });
})();