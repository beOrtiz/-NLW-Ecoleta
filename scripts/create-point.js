function populateUFs() {
    const ufSelect = document.querySelector("[name=uf]")
    const urlAPI = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

    callAPI(ufSelect, urlAPI)
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    callAPI(citySelect, url)
    citySelect.disabled = false

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


function callAPI(selectField, url) {
    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                selectField.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
        })
}