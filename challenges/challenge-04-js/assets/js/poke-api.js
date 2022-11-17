const pokeApi = {}

// Dos dados que recebemos dos detalhes, instanciar Pokemon e alimentar objeto modelo com os dados recebidos 
let convertPokeApiDetailToPokemon = pokeDetail => {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    // Map retorna um novo array
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    return pokemon;
}

// Fazer a requisição para pegar os detalhes do pokemon
pokeApi.getPokemonDetail = pokemon => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// Pegar dados dos pokemons. Limit determina a quantidade
// Fetch sempre precisa usar o then pra pegar o resultado e transformar em .json()
// Promise.all - faz a chamada da API para todos os pokemons que retornam (5) e retorna os dados dos detalhes de cada um deles
// Quando terminar de receber o resultado de todas as requisições, retorna no próximo .then em pokemonsDetails
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDetailByName = pokemonName => {
    const urlDetailName = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    return fetch(urlDetailName)
        .then(response => response.json())
        .then(jsonBody => pokeApi.createPokemonCharacter(jsonBody))
        .catch(error => console.log(error));
}

pokeApi.createPokemonCharacter = pokemonDetail => {
    let pokemonCharacter = new PokemonCharacter();
    pokemonCharacter.name = pokemonDetail.name;
    pokemonCharacter.photo = pokemonDetail.sprites.other.dream_world.front_default;
    pokemonCharacter.weight = pokemonDetail.weight;
    pokemonCharacter.height = pokemonDetail.height;

    const pokemonStats = pokemonDetail.stats;
    pokemonStats.map((pokeStat) => {

        let statName = pokeStat.stat.name;
        let baseState = pokeStat.base_stat;

        if (statName) {
            statName = statName.toUpperCase();

            switch (statName) {
                case "ATTACK":
                    pokemonCharacter.attack = baseState;
                    break;
                case "DEFENSE":
                    pokemonCharacter.defense = baseState;
                    break;
                case "SPECIAL-ATTACK":
                    pokemonCharacter.specialAttack = baseState;
                    break;
                case "SPECIAL-DEFENSE":
                    pokemonCharacter.specialDefense = baseState;
                    break;
                case "SPEED":
                    pokemonCharacter.speed = baseState;
                    break;
            }
        }

    });

    // Retorna um novo array com os nomes
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);

    // Retorna o primeiro item do array
    const [type] = types;
    pokemonCharacter.type = type;
    
    return pokemonCharacter;
}