// get the input field
const searchBar = document.querySelector('.search')

//execute function when user releases a key on keyboard
searchBar.addEventListener("keyup", function(event) {
    // if enter is pressed
    if (event.keyCode === 13) {
        // cancel default action
        event.preventDefault();
        
        var input = searchBar.value;
        input = input.trim();
        input = input.toLowerCase();

        // creating object to contain API data that we need
        var apiData = {
            url: 'https://pokeapi.co/api/v2/',
            type: 'pokemon',
            name: input
        }

        // using deconstruction to make more readable URL
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        var {url, type, name} = apiData

        // using template literals to allow for subsitutions 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        var apiURL = `${url}${type}/${name}`

        // fetch to return a promise with the data in it
        // https://developer.mozilla.org/en-US/docs/Web/API/fetch
        fetch(apiURL)
        .then( (data) => data.json() )
        .then( (pokemon) => generateHTML(pokemon) )
        .catch(error => 
            document.querySelector(".search-bar").animate([
                // keyframes
                { transform: 'rotate(10deg)' },
                { transform: 'rotate(-10deg)' },
                { transform: 'rotate(0deg)' }
              ], {
                // timing options
                duration: 100,
                iterations: 1
              }));
        
        function generateHTML(data) {
            const HTML = `
            <div class="poke-name">${data.name}</div>
            <img class="poke-image" src=${data.sprites.front_default}>
            <ul class="poke-details">
                <li>Height: ${data.height * 10}cm</li>
                <li>Weight: ${data.weight}g</li>
            </ul>
        `;

            const pokemonDiv = document.querySelector('.pokemon');
            pokemonDiv.innerHTML = HTML;
        }
    }
});
