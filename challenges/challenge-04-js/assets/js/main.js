const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 10
let offset = 0;

// A partir da chamada GET pra criar os dados do Pokemon, criar li e exibir dados no HTML
let convertPokemonToLi = pokemon => {
    return `
        <li class="pokemon ${pokemon.type}" onclick="getCharacterPokemon('${pokemon.name}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

let getCharacterPokemon = pokemonName => {
    if (pokemonName) {
        pokeApi.getPokemonDetailByName(pokemonName)
            .then(characterPokemon => console.log(characterPokemon))
            .catch(error => console.log(error));
    }
}

// Join: une todos os dados da lista, usando a string passada como parâmetro para unir cada item
let loadPokemonItens = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

// Limite - quantidade de pokemons que a API vai enviar na requisição GET
// Offtet - paginação
// A cada click, aumenta a paginação, para exibir mais pokemons
// Determinar valor máximo de pokemons a serem exibidos
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})