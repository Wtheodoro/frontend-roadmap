// Initialize team from localStorage or empty array
let myTeam = JSON.parse(localStorage.getItem('pokemonTeam')) || []
let currentPokemon = null

async function searchPokemon() {
  const pokemonName = document
    .getElementById('pokemonInput')
    .value.toLowerCase()
  if (!pokemonName) return

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    )
    if (!response.ok) {
      throw new Error('Pokemon not found')
    }
    currentPokemon = await response.json()
    console.log('Pokemon encontrado:', currentPokemon)
    displayPokemon(currentPokemon)
  } catch (error) {
    document.getElementById('pokemonResult').innerHTML = `
      <div class="pokemon-card">
        <p>Error: ${error.message}</p>
      </div>
    `
    currentPokemon = null
  }
}

function displayPokemon(pokemon) {
  const pokemonHTML = `
    <div class="pokemon-card">
      <h2>${pokemon.name}</h2>
      <img class="pokemon-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <button onclick="addToTeam()">
        Add to Team
      </button>
    </div>
  `
  document.getElementById('pokemonResult').innerHTML = pokemonHTML
}

function addToTeam() {
  if (myTeam.length >= 6) {
    alert('Your team is full! Maximum 6 Pokemon allowed.')
    return
  }

  if (myTeam.some((p) => p.name === currentPokemon.name)) {
    alert('This Pokemon is already in your team!')
    return
  }

  const pokemonToAdd = {
    name: currentPokemon.name,
    img: currentPokemon.sprites.front_default,
  }

  myTeam.push(pokemonToAdd)

  localStorage.setItem('pokemonTeam', JSON.stringify(myTeam))
  displayTeam()
}

function displayTeam() {
  const teamHTML = myTeam
    .map(
      (pokemon) => `
    <div class="team-pokemon">
      <img src="${pokemon.img}" alt="${pokemon.name}">
      <p>${pokemon.name}</p>
      <button onclick="removeFromTeam('${pokemon.name}')">Remove</button>
    </div>
  `
    )
    .join('')
  document.getElementById('teamDisplay').innerHTML = teamHTML
}

function removeFromTeam(pokemonName) {
  myTeam = myTeam.filter((pokemon) => pokemon.name !== pokemonName)
  localStorage.setItem('pokemonTeam', JSON.stringify(myTeam))
  displayTeam()
}

displayTeam()
