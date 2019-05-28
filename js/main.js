const POKEMON_TYPES = [
    "Fire",
    "Grass",
    "Water",
    "Flying",
    "Normal",
    "Fighting",
    "Fairy",
    "Rock",
    "Bug",
    "Electric",
    "Poison",
    "Psychic",
    "Ground",
    "Ice",
    "Ghost",
    "Dragon",
    "Steel",
    "Dark"
]

const createId = function() {

    if (POKEMONS.length === 0)  { return 1 }

    return POKEMONS[POKEMONS.length - 1].id + 1
}

const ERROR_INCOMPLETE_FIELDS = "Please complete all fields"

const POKEMONS = []

let app = angular.module('pokemon-app', [])

const getPokemon = function(id) {

    for (let i in POKEMONS) {
        if (parseInt(id) === POKEMONS[i].id) {
            return POKEMONS[i]
        }
    }
}


app.controller('pokemon-controller', function($scope) {

    POKEMONS.push({"id": 1, "name": "Bulbasaur", "type": "Grass"})
    POKEMONS.push({"id": 2, "name": "Charmander", "type": "Fire"})
    POKEMONS.push({"id": 3, "name": "Squirtle", "type": "Water"})

    $scope.errorMsg = ERROR_INCOMPLETE_FIELDS

    const toggleErrorMsg = function(isShown) {

        let errorMsg = document.getElementsByClassName("error-msg")
    
        try {
            for (let i in errorMsg) {
                if (isShown) {
                    errorMsg[i].classList.remove("hidden")
                }
                else {
                    errorMsg[i].classList.add("hidden")
                }
            }
        }catch(e) {
            
        }
    }

    // pre-populate table
    $scope.pokemons = POKEMONS

    $scope.types = POKEMON_TYPES
    $scope.selectedType = POKEMON_TYPES[0]

    // init add modal
    $scope.initAddModal = function() {
        $scope.name = ""
        $scope.selectedType = POKEMON_TYPES[0]
        toggleErrorMsg(false)
    }

    // init delete modal (once delete button is clicked in the table)
    $scope.initDeleteModal = function($event) {

        let id = $event.currentTarget.parentElement.parentElement.dataset.id
        document.getElementById("confirm-delete-btn").dataset.id = id
        $scope.selectedPokemon = getPokemon(id).name
    }

    // init edit modal
    $scope.initEditModal = function($event) {

        let id = $event.currentTarget.parentElement.parentElement.dataset.id
        document.getElementById("edit-pokemon").dataset.id = id

        let pokemon = getPokemon(id)
        $scope.nameEdit = pokemon.name
        $scope.selectedTypeEdit = pokemon.type

        toggleErrorMsg(false)
    }

    // add pokemon
    $scope.addPokemon = function() {
        
        let name = $scope.name
        let type = $scope.selectedType

        // error handling (if name has no value)
        if (name.trim() === "") {
            toggleErrorMsg(true)
        }
        else {
            // add to array
            POKEMONS.push({"id": createId(), "name": name, "type": type})
            $("#add-pokemon-modal").modal("hide")

            toggleErrorMsg(false)
        }
    }

    // edit pokemon
    $scope.editPokemon = function($event) {

        let name = $scope.nameEdit
        let type = $scope.selectedTypeEdit
        let id = $event.currentTarget.dataset.id

        // error handling (if name has no value)
        if (name.trim() === "") {
            toggleErrorMsg(true)
        }
        else {
            // edit
            let pokemon = getPokemon(id)
            pokemon.name = name
            pokemon.type = type

            $("#edit-pokemon-modal").modal("hide")
            toggleErrorMsg(false)
        }
    }

    // delete pokemon
    $scope.deletePokemon = function($event) {

        let id = parseInt($event.currentTarget.dataset.id)
        let pokemon = getPokemon(id)
        POKEMONS.splice(POKEMONS.indexOf(pokemon), 1)
        
        $("#delete-pokemon-modal").modal("hide")
    }
})