const URL = "https://api-colombia.com/api/v1/"

document.addEventListener("DOMContentLoaded", () => {

    getInfo(`${URL}country/colombia`)
    getDepartment(`${URL}/Department`)
    getRegion(`${URL}/Region`)
    getTouristSites(`${URL}/TouristicAttraction`)
})

/**
 * Fetch data from API
 * @param url
 * @return {Promise<void>}
 */
const getInfo = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            buildIndex(data);
        })
}

const getDepartment = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            buildDepartments(data);
        })
}

const getRegion = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            buildRegion(data);
        })
}

const getTouristSites = async (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            buildTouristSites(data);
        })
}

/**
 * *Build index section
 * @param data
 */
const buildIndex = (data) => {
    const index = document.getElementById("index");
    index.innerHTML = indexSection(data);
}

const buildDepartments = (data) => {
    const index = document.getElementById("departments");
    index.innerHTML = departmentsSection(data);
}

const buildRegion = (data) => {
    const index = document.getElementById("regions");
    index.innerHTML = regionsSection(data);
}

const buildTouristSites = (data) => {
    const index = document.getElementById("tourist");
    index.innerHTML = touristSitesSection(data);
}

const indexSection = (data) => {

    let borders = data.borders.map((border) => {
        return `<li class="pl-2 list-disc">${border}</li>`
    })

    return `
    <div>
                <div class="flex justify-between pb-8">
                    <div>
                        <h2 class="text-2xl font-bold">${data.name}</h2>
                        <p>Moneda: ${data.currency}</p>
                        <p>Población: ${numberWithCommas(data.population)} habitantes</p>
                    </div>
                    <figure>
                        <img class="w-40" src="${data.flags[0]}" alt="Bandera">
                    </figure>
                </div>
                <p class="pb-8">${data.description}</p>
                <div>
                    <h3 class="text-xl font-bold mb-4">Limites</h3>
                    <ul>
                        ${borders.join("")}
                    </ul>
                </div>
            </div>
    `
}


const departmentsSection = (departments) => {

    let myData = departments.map((data, index) => {
        return `
        <tr>
                        <td>${index + 1}</td>
                        <td>${data.name}</td>
                        <td>${numberWithCommas(data.population)} habitantes</td>
                        <td>${numberWithCommas(data.surface)} km2</td>
                        <td>${data.description}</td>
                        
</tr>
        `
    })

    return `
    <table class="w-full table-auto">
                <thead class="bg-blue-200">
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th>Población</th>
                        <th>Superficie</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    ${myData.join("")}
                </tbody>
            </table>
    `
}

const regionsSection = (departments) => {

    let myData = departments.map((data, index) => {
        return `
        <tr>
                        <td>${index + 1}</td>
                        <td>${data.name}</td>
                        <td>${data.description}</td>
                        
</tr>
        `
    })

    return `
    <table class="w-full table-auto">
                <thead class="bg-blue-200">
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    ${myData.join("")}
                </tbody>
            </table>
    `
}

const touristSitesSection = (data) => {
    let tourist = data.map((tourist) => {
        return `
        <div class="bg-blue-50 shadow-md p-4 mb-4 rounded-md">
                <div class="flex justify-between mb-4">
                    <h2 class="text-xl font-bold">${tourist.name}</h2>
                    <h3>${tourist.city.name}</h3>
                </div>
                <div class="w-full flex justify-between gap-4 mb-4">
                    <p class="w-1/2 text-gray-500">${tourist.description}</p>
                        <img class="w-1/2" src="${tourist.images[0]}" alt="${tourist.name}">
                </div>
                <div class="flex justify-between">
                    <p>Longitud: ${tourist.longitude}</p>
                    <p>Latitud: ${tourist.latitude}</p>
                </div>
        </div>`
    })

    return `
    <div>
                ${tourist.join("")}
            </div>`
}


/*
* Helper functions
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
