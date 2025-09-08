let count = 0;
let pokemons = [];
let previousType = "";
let backSide = false;
let notYetCloseUpped = true;
let twoTypes = false;
let pokemonsSmall = [];
let liked = [];
let maxStats = [255, 255, 255, 255, 255, 180]
let sum = 0;
let names = [];
let searchResults = [];
let typeSearchResult = [];
let typeSearched = false;
let loadStart = 0;
let loadEnd = 30;
let likedModus = false;
let burgerMenuShown = false;
let morePokemonsButtonClicked = false;
let firstLoad = true;
let justClicked = false;
let renderedEnd= 30;
let pokemonsBasestats = [];
let indexOfStatsSorted = [];
let renderedStatsSorted = false;
let justRendering = false;
let renderedBaseStatEnd = 30;
let renderedTypeSearchedEnd = 30;
let currentTip = 1;
let startTipsInterval = setInterval(() => {(changeStartScreenTips())}, 2500)
let statsNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed', 'total base-stats'];
let tips = ['Click on type, to sort Pokemons by type!', 
            'Click on stat, to sort by stat', 
            'Flip the card to see abilities!', 
            'Click the star to like a pokemon!'];
let pokemonImages = ['shiny','default'];
let currentPokemonImage = 0;
let shinyMode = true;
let imageStates = ['shiny', 'normal']
            
/**
 * here the basic pokemons are loaded and rendered
 * @param {*} from 
 * @param {*} to 
 */
async function loadPokemons(from, to) {
    for (i = from; i < to; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        let pokemon = await response.json();
        pokemons.push(pokemon);
        render(i);
        names.push(pokemon['name']);
        document.getElementById('loaded-number').innerHTML = `${pokemons.length}`;
    }
    if (firstLoad) {
        morePokemonCard();
        document.getElementById('start-screen').style.display = 'none';
        clearInterval(startTipsInterval);
        firstLoad = false;
    }
}

/**
 * to load more pokemons (30), the button 30 more has to be clicked. if other searches are activated, only the first 30 are rendered
 * at first. if scrolle down, this function renders more of the loaded pokemons, depending on the chosen order
 */
addEventListener("scroll", (event) => {
    if (renderedStatsSorted) {
       renderMoreOfStatSearched();
    }
    if (typeSearched) {
        renderMoreOfTypesearched();
    }
    if (renderedEnd < loadEnd && typeSearched == false && renderedStatsSorted == false && !justRendering) {
        renderMoreOfLoaded();
    }
});

/**
 * this function renders more of the loaded pokemons if the stat-search is activated
 */
function renderMoreOfStatSearched(){
    if (renderedBaseStatEnd < pokemons.length) {
        for (let i = renderedBaseStatEnd; i < renderedBaseStatEnd+5; i++) {
            let pokemon = pokemonsBasestats[i].index;
            render(pokemon);
        }
        renderedBaseStatEnd = renderedBaseStatEnd + 5;
    }
}

/**
 * this function renders more of the already loaded pokemons in typesearch modus
 */
function renderMoreOfTypesearched(){
    if (renderedTypeSearchedEnd < pokemons.length) {
        for (let i = renderedTypeSearchedEnd; i < renderedTypeSearchedEnd+5; i++) {
            let pokemon = typeSearchResult[i]
            render(pokemon);
        }
        renderedTypeSearchedEnd = renderedTypeSearchedEnd + 5;
    }
}

/**
 * this function renders more of the already loaded pokemons, in the normal display if scrolled down
 */
function renderMoreOfLoaded(){
    if (renderedEnd < pokemons.length) {
        for (let i = renderedEnd; i < renderedEnd+5; i++) {
            render(i);
        }
        renderedEnd = renderedEnd + 5;
    }
}

/**
 * this function is triggered if the loaded button is clicked
 */
async function loadMore() {
    loadStart = loadStart + 30;
    loadEnd = loadEnd + 30;
    justRendering = true;
    document.getElementById('load-more-text').innerHTML = 'Loading...';
    document.getElementById('poke-ball').style.animation = 'turnBall 425ms infinite';
    for (i = loadStart; i < loadEnd; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        let pokemon = await response.json();
        pokemons.push(pokemon);
        names.push(pokemon['name']);
        document.getElementById('loaded-number').innerHTML = `${pokemons.length}`;
    }
    document.getElementById('load-more-text').innerHTML = '30 More';
    document.getElementById('poke-ball').style.animation = 'unset';
    morePokemonsButtonClicked = false;
    renderMore(loadStart, loadEnd);
    justRendering = false;
}

/**
 * if the load-more-button is clicked, it is animated and more pokemons are loaded and rendered
 */
function loadMoreButtonClicked() {
    if (!morePokemonsButtonClicked) {
        morePokemonsButtonClicked = true;
            loadMore();
    }
}

/**
 * if the pokemon-logo in the header is clicked, the pokemons are rendered in default order
 */
function renderFromLogo() {
   if (!justClicked) {
     justClicked = true;
     clear();
     defaultBackground();
     document.documentElement.scrollTop = 0;
     renderMore(0, 30);
     renderedEnd = 30;
     showStarAgain();
     document.getElementById('search-input').value = '';
     justClicked = false;
   }
}

/**
 * this function renders pokemons from and to a specified value
 * @param {*} from 
 * @param {*} to 
 */
function renderMore(from, to) {
    for (let i = from; i < to; i++) {
        render(i);
    }
    renderedEnd = to;
}

/**
 * here the pokemons are renderdd
 * @param {} index 
 */
function render(index) {
    if (index < pokemons.length) {
        let name = pokemons[index]['name'];
        let id = pokemons[index]['id'];
        let image = pokemons[index]['sprites']['other']['official-artwork'][`front_shiny`];
        let type1 = pokemons[index]['types'][0]['type']['name'];
        generateSmallCards(name, id, image, type1, index);
        getTypeforSmallCard(index);
    }
}

/**
 * for the small cards, this function renders the type shown at the bottom left
 * @param {*} index 
 */
function getTypeforSmallCard(index) {
    let types = pokemons[index]['types'];
    for (let i = 0; i < types.length; i++) {
        let type = types[i]['type']['name'];
        let content = document.getElementById(`type-small${index}`);
        content.innerHTML += `
            <div class="type-small ${type}-lighter" id="${type}${index}" onclick="sortByType('${type}', event)">
                ${type}
                <img src="icons/${type}.svg" alt="">
            </div>
                `;
    }
}

/**
 * this function renders the pokemons, after they are searched by type.
 */
function renderTypeSearchResults() {
    renderedTypeSearchedEnd = 30;
    for (let i = 0; i < 30; i++) {
        let result = typeSearchResult[i];
        render(result);
    }
}

/**
 * here the pokemons are pushed in an array, depending on the clicked type
 * @param {} type 
 */
function pushTypeSearchResults(type) {
    for (let i = 0; i < pokemons.length; i++) {
        let pokemonTypes = pokemons[i]['types'];
        for (let j = 0; j < pokemonTypes.length; j++) {
            if (pokemonTypes[j]['type']['name'].includes(type) == true) {
                typeSearchResult.push(i);
            }
        }
    }
}

/**
 * this function triggers the sort by type-mechanism
 * @param {*} type 
 * @param {*} event 
 */
function sortByType(type, event) {
        if (!justRendering) {
            event.stopPropagation();
            likedModus = true;
            let withSearchBars = true;
            animateStar(withSearchBars);
            typeSearchResult = [];
            removePreviousBackground();
            clear();
            pushTypeSearchResults(type);
            addNewBackground(type);
            document.documentElement.scrollTop = 0;
            renderTypeSearchResults();
            previousType = type;
            typeSearched = true;
            renderedStatsSorted = false;
            showTypeInHeader(type);
        }
}

/**
 * if the pokemons are searched by type, the current type is also shown in the header
 * @param {*} type 
 */
function showTypeInHeader(type) {
    document.getElementById('type-header').innerHTML = ` 
    <img src="./img/${type}.png" alt="" id="type-header-img">
    <p id="type-header">${type}</p>
    `
}

/**
 * this makes sure, the default background is shown and it is scolled to the top
 */
function renderSearchResults() {
    for (let i = 0; i < searchResults.length; i++) {
        let result = searchResults[i];
        defaultBackground();
        render(result);
    }
    document.documentElement.scrollTop = 0;
}

/**
 * the closeup-card can be rotated by this function
 */
function rotateCloseUpCard() {
    if (backSide == true) {
        showFront();
    } else {
        showBack();
    }
}

/**
 * this function shows the front of the closeup-card
 */
function showFront() {
    document.getElementById('closeup-card').style.transform = "rotateY(0) translateX(0)";
    document.getElementById('closeup-card').style.transform = "perspective(1000px)";
    addRemove('closeup-card', 'box-shadow', 'closeup-card', 'box-shadow-negative');
    backSide = false;
    setTimeout(() => {
        document.getElementById('back').classList.add('d-none');
    }, 60);
}

/**
 * this function shows the back of the closeup-card
 */
function showBack() {
    document.getElementById('closeup-card').style.transform = "rotateY(-180deg) translateX(-300px)";
    document.getElementById('closeup-card').classList.remove('box-shadow');
    backSide = true;
    setTimeout(() => {
        document.getElementById('back').classList.remove('d-none');
        document.getElementById('closeup-card').classList.add('box-shadow-negative');
    }, 60);
}

/**
 * if the closeup-modus is chosen, the pokemon flies in the card. This does only happen if it is chosen from the small-card screen
 */
function firstCloseUp() {
    setTimeout(() => {
        document.getElementById('closeup-body').style.transform = "translateY(0)";
        setTimeout(() => {
            dropImage();
        }, 350);
    }, 100);
}

/**
 * this function drops the image of the pokemon if the closeup-card are first shown
 */
function dropImage() {
    document.getElementById('closeup-img').style.transform = "translateY(0)";
}

/**
 * this function lets the user switch back to the small card display
 */
function backToSmallCards() {
    addRemove('main-closeup', 'd-none', 'body', 'overflow-hidden');
    notYetCloseUpped = true;
}

/**
 * this function renders the closeup-view of the pokemons
 * @param {} index 
 */
function renderCloseUp(index) {
    if (index < loadEnd) {
        let name = pokemons[index]['name'];
        let id = pokemons[index]['id'];
        let image = pokemons[index]['sprites']['other']['official-artwork'][`front_${pokemonImages[currentPokemonImage]}`];
        let type1 = pokemons[index]['types'][0]['type']['name'];
        let height = pokemons[index]['height'];
        let weight = pokemons[index]['weight'];
        let bex = pokemons[index]['base_experience'];
        let stats = pokemons[index]['stats'];
        addRemove('body', 'overflow-hidden', 'main-closeup', 'd-none');
        generateCloseUpCard(index, name, id, image, type1, height, weight, bex, stats);
        checkIfalreadyCloseUpped();
        checkBeginningEnd(id, 1, 'left');
        checkBeginningEnd(id, loadEnd, 'right');
        getSortedBeginning(index);
        checkStatsWidth(index);
        getMoves(index);
        getAbilities(index);
    }
}

/**
 * this function adds a class to the images, if they are just been just at first in the closeup-view. 
 * then a transition is added
 */
function checkFirstCloseUp() {
    if (notYetCloseUpped == true) {
        return `first-closeup`;
    }
}

/**
 * this function lets the user like a pokemon from the closeup-view
 * @param {*} index 
 */
function like(index) {
    if (liked.indexOf(index) == -1) {
        document.getElementById('star').src = "img/star_filled.png";
        liked.push(index);
        animateHearts();
        save();
    }
    else {
        let position = liked.indexOf(index);
        liked.splice(position, 1);
        document.getElementById('star').src = "img/star.png";
        dontAnimateHearts();
        save();
        showLiked();
        likedModus = true;
    }
}

/**
 * this function shows the liked pokemons
 */
function showLiked() {
            clear();
            defaultBackground();
            if (liked.length == 0) {
                youDontLikeAnyPokemonsYet();
            }
            document.documentElement.scrollTop = 0;
            for (let i = 0; i < liked.length; i++) {
                index = liked[i];
                render(index);    
            }
            let withSearchBars = true;
            animateStar(withSearchBars);
}