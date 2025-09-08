load();

/**
 * this function changes back to the normal background if searching by type was used
 */
function defaultBackground() {
    if (previousType) {
        document.getElementById('body').classList.remove(`${previousType}`);
        document.getElementById('body').classList.remove(`bg-img-${previousType}`);
        document.getElementById('body').classList.add('bg');
    }
}

/**
 * this is a short function to clear the content so it can be filled with new innerhtml
 */
function clear() {
    let content = document.getElementById('content');
    content.innerHTML = ``;
}

/**
 * this function removes the previously used background in the search by type modus
 */
function removePreviousBackground() {
    if (previousType) {
        document.getElementById('body').classList.remove(`${previousType}`);
        document.getElementById('body').classList.remove(`bg-img-${previousType}`);
    }
}

/**
 * this function shows the according background depending on the type
 */
function addNewBackground(type) {
    document.getElementById('body').classList.add(`${type}`);
    document.getElementById('body').classList.add(`bg-img-${type}`);
    document.getElementById('body').classList.remove('bg');
}

/**
 * this funciton shows the burger menu and changes the three lines to a cancel cross
 */
function showBurgerMenu() {
    if (!burgerMenuShown) {
        document.getElementById('burger-content').style.transform = 'translateX(0)';
        document.getElementById('line-2').style.opacity = 0;
        document.getElementById('line-1').style.transform = 'translate(5px, 23px) rotate(45deg)';
        document.getElementById('line-3').style.transform = 'translate(5px, 23px) rotate(-45deg)';
        document.getElementById('star-header').style.opacity = 0;
        burgerMenuShown = true;
    }
    else {
        document.getElementById('burger-content').style.transform = 'translateX(100vw)';
        document.getElementById('line-2').style.opacity = 1;
        document.getElementById('line-1').style.transform = 'translate(5px, 10px) rotate(0)';
        document.getElementById('line-3').style.transform = 'translate(5px, 36px) rotate(0)';
        document.getElementById('star-header').style.opacity = 1;
        burgerMenuShown = false;
    }
}

/**
 * this function adds the stats in the closeup-card-modus
 * @param {t} stats 
 * @returns 
 */
function getSum(stats) {
    sum = 0;
    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i]['base_stat'];
        sum += stat;
    }
    return sum;
}

/**
 * this function is used to make sure that only the relevant elements are clickable in the closeup-card-modus
 */
function stopPropagation(event) {
    event.stopPropagation();
}

/**
 * this function toggles the like Modus
 */
function switchToLikedModus() {
    if (!justRendering) {
        if (likedModus) {
            justClicked = false;
            renderFromLogo();
            showStarAgain();
            likedModus = false;
        }
        else {
            showLiked();
            likedModus = true;
        }
}
}

/**
 * if clicked, the star is animated. 
 * @param {} withSearchBars the parameter distinguishes between the type search (without searchbars) 
 * or the searched Modus
 */
function animateStar(withSearchBars) {
    document.getElementById('loading-card').style.display = 'none';
    if (withSearchBars) {
        document.getElementById('about-header').style.opacity = '0';
        document.getElementById('search-box-name').style.opacity = '0';
    }
    document.getElementById('star-image-header').style.transform = 'rotate(1turn) scale(0.5)';
    setTimeout(() => {
        document.getElementById('star-image-header').style.transform = 'rotate(0) scale(1.2)';
        document.getElementById('star-image-header').src = './img/cancel.png';
    }, 125);
}

/**
 * here the star is shown again after the cancel cross
 */
function showStarAgain() {
    renderedStatsSorted = false;
    typeSearched = false;
    document.getElementById('type-header').innerHTML = '';
    document.getElementById('loading-card').style.display = 'flex';  
    document.getElementById('search-box-name').style.opacity = '1';
    document.getElementById('about-header').style.opacity = '1';
    document.getElementById('star-image-header').style.transform = 'rotate(1turn) scale(0.5)';
    setTimeout(() => {
        document.getElementById('star-image-header').src = './img/star_header.png';
        document.getElementById('star-image-header').style.transform = 'rotate(0) scale(1)';
    }, 125);
}

/**
 * this function is used to animate the hearts if the like-button in the closep-up-card-modus is clicked
 */
function animateHearts() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`heart${i}`).classList.add(`heart${i}`);
    }
}

/**
 * this function is triggered if the pokemon is unliked
 */
function dontAnimateHearts() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`heart${i}`).classList.remove(`heart${i}`);
    }
}

/**
 * this function pushes the first searched letter in an array
 * @param {} input 
 */
function pushOneLetterSearch(input) {
    for (let i = 0; i < names.length; i++) {
        let pokeName = names[i];
        let letter = pokeName.charAt(0);
        if (input == letter) {
            searchResults.push(i)
        }
    }
}

/**
 * this function is used if two letters are in the input search field
 * @param {} input 
 */
function pushTwoLettersSearch(input) {
    for (let i = 0; i < names.length; i++) {
        pokeName = names[i];
        let firstLetter = pokeName.charAt(0);
        let secondLetter = pokeName.charAt(1);
        if (input.charAt(0) == firstLetter && input.charAt(1) == secondLetter) {
            searchResults.push(i)
        }
    }
}

/**
 * this function searches the pokemons by name
 */
function searchByName() {
    let input = document.getElementById('search-input').value;
    let withSearchBars = false;
    animateStar(withSearchBars);
    likedModus = true;
    typeSearched = false;
    clear();
    searchResults = [];
    if (input.length == 1) {
        pushOneLetterSearch(input);
        renderSearchResults();
    }
    else {
        searchResults = [];
        pushTwoLettersSearch(input);
        renderSearchResults();

    }
}

/**
 * this basic function adds and removes classes
 * @param {*} idAdded 
 * @param {*} classListAdded 
 * @param {*} idRemoved 
 * @param {*} classListRemoved 
 */
function addRemove(idAdded, classListAdded, idRemoved, classListRemoved) {
    document.getElementById(`${idAdded}`).classList.add(`${classListAdded}`);
    document.getElementById(`${idRemoved}`).classList.remove(`${classListRemoved}`);
}



/**
 * this function sorts and renders the pokemons by the basestat
 */
function sortPokemonsByTotalBaseStats(kindofstats){
    if (!justClicked && !justRendering) {
        justClicked = true;
        pokemonsBasestats = [];
        renderedBaseStatEnd = 30;
        for (let i = 0; i < pokemons.length; i++) {
            let baseStat = getDifferentStats(kindofstats, i);
            let positionAndBasestat = {index: i, basestat: baseStat};
            pokemonsBasestats.push(positionAndBasestat);
        }
        pokemonsBasestats.sort((a,b) => b.basestat - a.basestat)
        clear();
        defaultBackground();
        for (let i = 0; i < 30; i++) {
            let pokemon = pokemonsBasestats[i].index;
            render(pokemon);
        }
        document.documentElement.scrollTop = 0;
        let withSearchBars = true;
        likedModus = true;
        renderedStatsSorted = true;
        typeSearched = false;
        animateStar(withSearchBars);
        document.getElementById('type-header').style.display = 'flex';
        document.getElementById('type-header').innerHTML = `<p id="type-header-stat">&darr; ${statsNames[kindofstats]}</p>`;
        backToSmallCards();
        justClicked = false;
    }
}

/**
 * this function gets the different stat or the sum of the basestat, depending on which stat is clicked
 * @param {*} kindofstats 
 * @param {*} index 
 * @returns 
 */
function getDifferentStats(kindofstats, index){
    if (kindofstats == 6) {
        let basestat = getSum(pokemons[index]['stats']);
        return basestat
    }
    else{
        let basestat = pokemons[index].stats[kindofstats].base_stat;
        return basestat
    }
}

/**
 * this function shows more of the loaded pokemons in sorted order, depending on the clicked stat
 */
function showMoreSortedByStats(){
    for (let i = 30; i < pokemons.length; i++) {
        let pokemon = pokemonsBasestats[i].index;
        render(pokemon);
    }
    document.getElementById('load-more-box').innerHTML = ``;
}

/**
 * this functions checks the index, so the arrow on the closeup-display is not shown
 * @param {} indexSeen 
 * @param {*} rightOrLeft 
 * @returns 
 */
function checkWhichIndex(indexSeen, rightOrLeft){
    if (renderedStatsSorted) {
        for (let i = 0; i < pokemonsBasestats.length; i++) {
            if (pokemonsBasestats[i].index == indexSeen) {
                if (rightOrLeft == 'right' && i < loadEnd-1) {
                    return pokemonsBasestats[i+1].index;
                }
                if(rightOrLeft == 'left' && i > 0){
                    return pokemonsBasestats[i-1].index;
                }
            }
        }
    }
    if(typeSearched){
        for (let i = 0; i < typeSearchResult.length; i++) {
            if (typeSearchResult[i] == indexSeen) {
                if (rightOrLeft == 'right' && i < loadEnd-1) {
                    return typeSearchResult[i+1];
                }
                if(rightOrLeft == 'left' && i > 0){
                    return typeSearchResult[i-1];
                }
            }
        }
    }
    else{
        if (rightOrLeft == 'right') {
            return indexSeen+1;
        }
        if (rightOrLeft == 'left') {
            return indexSeen -1;
        }
    }
}

/**
 * this function checks if just the next closeup-card is to be shown or if it has to be animated
 */
function checkIfalreadyCloseUpped() {
    if (notYetCloseUpped == true) {
        notYetCloseUpped = false;
        firstCloseUp();
    }
}

// ++++++++++++++++++++++++++++++++++++++++++ save liked +++++++++++++++++++++++++++++++++++++++

/**
 * this function saves the liked pokemons to the local storage
 */
function save() {
    let likedasText = JSON.stringify(liked);
    localStorage.setItem('likedasText', likedasText);
}

/**
 * this function loads the liked pokemons that are saved in the local stoarge 
 */
function load() {
    let likedText = localStorage.getItem('likedasText');
    if (likedText) {
        liked = JSON.parse(likedText);
    }
}

/**
 * this function chooses random Pokemons, to move at the loading start screen
 */
function choseRandomPokemonToMoveIt(){
    let randomPokemon = Math.floor(Math.random() * 11);
    document.getElementById('pokemon-start').src = `./img/pokemons/${randomPokemon}.png`
}