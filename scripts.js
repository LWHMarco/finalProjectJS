document.getElementById('btnSearch').addEventListener('click', function(){
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data =>{
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';
        data.countries.forEach(country =>{
            country.cities.forEach(city => {
                if(city.name.toLowerCase().includes(searchText)){
                    displayCity(city);
                }
            });
        });
        if(searchText.toLowerCase().includes('beach')||searchText.toLowerCase().includes('beaches')){
            data.beaches.forEach(beach => displayCity(beach));
        }else if(searchText.toLowerCase().includes('temple')){
            data.temples.forEach(temple => displayCity(temple));
        }
        else if(searchText.toLowerCase().includes('country')||searchText.toLowerCase().includes('countries')){
            data.countries.forEach(country => {
                country.cities.forEach(city =>{
                    displayCity(city);
                })
            })
        }

    });

});
function displayCity(location){
    const resultsContainer = document.getElementById('searchResults');
    const cityDiv = document.createElement('div');
    cityDiv.className = 'city';
    cityDiv.innerHTML = `
        <div class="city-image">
            <img src="${location.imageUrl}" alt="${location.name}">
        </div>
        <div class="city-info">
            <h3>${location.name}</h3>
            <p>${location.description}</p>
            <button>Visit</button>
        </div>
    `;
    resultsContainer.appendChild(cityDiv);
}
document.getElementById('btnClear').addEventListener('click', function(){
    const container = document.getElementById('searchResults');
    container.innerHTML ='';
});