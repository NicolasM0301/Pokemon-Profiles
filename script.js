document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-btn");
    const pokemonCard = document.getElementById("pokemon-card");
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonId = document.getElementById("pokemon-id");
    const pokemonHp = document.getElementById("pokemon-hp");
    const pokemonAtk = document.getElementById("pokemon-atk");
    const pokemonDef = document.getElementById("pokemon-def");
    const pokemonSpe = document.getElementById("pokemon-spe");
    const pokemonTypes = document.getElementById("pokemon-types");
  
    const getRandomPokemon = async () => {
      const id = Math.ceil(Math.random() * 1025);
  
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} (${response.statusText})`
          );
        }
  
        const data = await response.json();
        console.log(response.json());
  
        const types = data.types.map((typeInfo) => typeInfo.type.name);
  
        pokemonImage.src =
          data.sprites.other.dream_world.front_default ||
          data.sprites.other.home.front_default ||
          "https://via.placeholder.com/150";
        pokemonImage.alt = `${data.name}`;
        pokemonName.textContent = data.name;
        pokemonId.textContent = `#${data.id}`;
        pokemonHp.textContent = `HP: ${data.stats[0].base_stat}`;
        pokemonAtk.textContent = `ATK: ${data.stats[1].base_stat}`;
        pokemonDef.textContent = `DEF: ${data.stats[2].base_stat}`;
        pokemonSpe.textContent = `SPE: ${data.stats[5].base_stat}`;
  
        pokemonTypes.innerHTML = "";
        types.forEach((type) => {
          const typeSpan = document.createElement("span");
          typeSpan.textContent = type;
          typeSpan.classList.add("type", type.toLowerCase());
          pokemonTypes.appendChild(typeSpan);
        });
  
        pokemonCard.classList.remove("hidden");
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
  
        if (error instanceof TypeError) {
          alert("Network error! Please check your connection and try again.");
        } else {
          alert(`Failed to load Pokémon data: ${error.message}`);
        }
  
        pokemonCard.classList.add("hidden");
      }
    };
  
    generateBtn.addEventListener("click", getRandomPokemon);
  });
  