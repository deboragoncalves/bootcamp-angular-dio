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

let createModalCharacterPokemon = pokemonCharacter => {

    if (pokemonCharacter) {
        let heightPokemon = parseFloat(pokemonCharacter.height) / 10;
        let weightPokemon = parseFloat(pokemonCharacter.weight) / 10;

        return `
        <div class="modal fade" id="modalCharacterPokemon" tabindex="-1" role="dialog" aria-labelledby="modalCharacterPokemon" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body ${pokemonCharacter.type}">
                        <p class="pokemon-name">${pokemonCharacter.name}</p>
                        <section class="section-pokemon-image">
                            <img alt="${pokemonCharacter.name}" src="${pokemonCharacter.photo}">
                        </section>
                        <section class="section-character-pokemon">
                            <p class="pokemon-character">Altura: <span>${heightPokemon.toFixed(1)} m</span></p>
                            <p class="pokemon-character">Peso: <span>${weightPokemon.toFixed(1)} kg</span></p>
                            <p class="pokemon-character">Ataque: <span>${pokemonCharacter.attack}</span></p>
                            <p class="pokemon-character">Ataque especial: <span>${pokemonCharacter.specialAttack}</span></p>
                            <p class="pokemon-character">Defesa: <span>${pokemonCharacter.defense}</span></p>
                            <p class="pokemon-character">Defesa especial: <span>${pokemonCharacter.specialDefense}</span></p>
                            <p class="pokemon-character">Velocidade: <span>${pokemonCharacter.speed}</span></p>    
                        </section>                    
                    </div>
                    <div class="modal-footer ${pokemonCharacter.type}">
                        <button type="button" class="btn btn-modal-character" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>`;
    }
}

let getCharacterPokemon = pokemonName => {
    if (pokemonName) {
        pokeApi.getPokemonDetailByName(pokemonName)
            .then(characterPokemon => {
                let modalCharactere = createModalCharacterPokemon(characterPokemon);
                let sectionModalCaractere = document.querySelector("#sectionCharacterPokemon");
                sectionModalCaractere.innerHTML = modalCharactere;
                $("#modalCharacterPokemon").modal("show");
            })
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