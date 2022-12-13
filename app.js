const XML = new XMLHttpRequest()
const input = document.getElementById("input")
const ul = document.getElementById('ul')
const pokepage = document.getElementById("pokepage")

XML.open("GET", "./ListeDeMot.txt")

XML.onload = () => {
    isredy(XML.response)
}

XML.send()

function isredy(document) {
    let liste = document.split("\r\n")
    input.addEventListener("input", () => {
        if (input.value !== "") {
            mettreajour()
            for (let i = 0; i < liste.length; i++) {
                if (liste[i].toLowerCase().startsWith(input.value)) {
                    ul.innerHTML += `<p>${liste[i]}</p>`
                }
            }
            let child = Array.from(ul.children)
            child.forEach(element => {
                element.addEventListener("click", () => {
                    input.value = element.textContent
                    mettreajour()
                    pokemoncard(input.value)
                })
            });
        } else {
            mettreajour()
        }
    })
    return document.split("\r\n")
}

function mettreajour() {
    let lis = ul.getElementsByTagName("p")
    while (lis.length > 0) {
        ul.removeChild(lis[0])
    }
}

function pokemoncard(name) {
    pokepage.style.display = "block"
    const atribut = document.getElementsByTagName("p")
    const image = document.getElementsByTagName("img")
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(function (response) {
        return response.json()
    }).then(function (data) {
        atribut[0].textContent = data.name
        atribut[3].textContent = "Taille : " + data.height / 10 + " m"
        atribut[4].textContent = "Poid : " + data.weight / 10 + " kg"
        if (data.types.length === 2) {
            atribut[5].textContent = "Type 1 : " + data.types[0].type.name
            atribut[6].style.display = "block"
            atribut[6].textContent = "Type 2 : " + data.types[1].type.name
        } else {
            atribut[6].style.display = "none"
            atribut[5].textContent = "Type : " + data.types[0].type.name
        }
        atribut[7].textContent = "Pokedex id : " + data.id
        image[0].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
        image[1].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`

    })

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(function (response) {
        return response.json()
    }).then(function (data) {
        atribut[1].textContent = "Nom français : " + data.names[4].name
        atribut[2].textContent = "Categorie " + data.genera[3].genus

        console.log(data.generation.name);
        let motsplit = data.generation.name.split("")
        let j = -1
        for (let i = 0; i < motsplit.length; i++) {
            if (motsplit[i] === "i") {
                j++
            }
        }
        atribut[8].textContent = "Génération " + j
    })
}