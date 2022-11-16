
const pokeApi = {}

// Dos dados que recebemos dos detalhes, instanciar Pokemon e alimentar objeto modelo com os dados recebidos 
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    // Map retorna um novo array
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

// Fazer a requisição para pegar os detalhes do pokemon
pokeApi.getPokemonDetail = (pokemon) => {
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
