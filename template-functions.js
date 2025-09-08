/**
 * this function deals with the fact that some pokemons have two, some only one type. 
 * @param {*} index 
 * @returns 
 */
function getMoreThanOneTypes(index) {
    let types = pokemons[index]['types'];
    if (types.length == 2) {
        return `<span class="closeup-type ${types[1]['type']['name']}-lighter">${types[1]['type']['name']}</span>
        `;
    }
    if (types.length == 3) {
        return `<span class="closeup-type ${types[1]['type']['name']}-lighter">${types[1]['type']['name']}</span>
        <span class="closeup-type ${types[2]['type']['name']}-lighter">${types[2]['type']['name']}</span>
        `;
    }
    else {
        return ``;
    }
}

/**
 * this function shows the StartScreen
 */
function showStartScreen(){
    renderStartScreen(currentTip);
}

/**
 * this function changes the tips on the start screen
 */
function changeStartScreenTips(){
    if (currentTip == 3) {
        currentTip = 0;   
    }
    currentTip ++;
    renderStartScreen(currentTip);
}

/**
 * this function 
 * @param {*} index 
 * @returns 
 */
function checkLiked(index) {
    if (liked.indexOf(index) > -1) {
        return `_filled`;
    } else {
        return ``;
    }
}

/**
 * this function checks the moves of the pokemons to display them at the backside of the closeup-card
 * @param {*} index 
 */
function getMoves(index) {
    let moves = pokemons[index]['moves'];
    for (let i = 0; i < moves.length; i++) {
        let move = moves[i]['move']['name'];
        let content = document.getElementById('moves');
        content.innerHTML += `<span>${move}</span>`;
    }
}

/**
 * this function checks the abilities of the pokemon
 * @param {} index 
 */
function getAbilities(index) {
    let abilities = pokemons[index]['abilities'];
    for (let i = 0; i < abilities.length; i++) {
        let abil = abilities[i]['ability']['name'];
        let c = document.getElementById('ability-content');
        c.innerHTML += `<span class="ability-close ${checkHidden(index, i)}">${abil}</span>`;
    }
}

/**
 * this function makes sure that in the closeup-view, the last or first pokemon doesnt have an arrow to the right/left side.
 * @param {*} id 
 * @param {*} endorBeginning 
 * @param {*} direction 
 */
function checkBeginningEnd(id, endorBeginning, direction) {
    if (id == endorBeginning && renderedStatsSorted == false) {
        document.getElementById(`arrow-${direction}`).style.opacity = "0";
        document.getElementById(`arrow-${direction}`).style.pointerEvents = "none";
    }
}

/**
 * this function checks if an ability is hidden, then it is highlighted in a special way
 * @param {*} index 
 * @param {*} i 
 * @returns 
 */
function checkHidden(index, i) {
    if (pokemons[index]['abilities'][i]['is_hidden'] == true) {
        return `hidden`;
    }
}


/**
 * this function checks the current tip on the start screen to return in in the tip-box, that is rendered
 * @param {} tipNumber 
 * @returns 
 */
function getStartScreenNumber(tipNumber){
    if (tipNumber == 3) {
        tipNumber = 0
    }
    return tipNumber +1;
}

/**
 * if the user hasnt liked any pokemon a gif with pikachu is displayed
 */
function youDontLikeAnyPokemonsYet() {
    renderDontLikeCard();
}

/**
 * this function toggles the imprint, when the question is 
 * @param {*} hideOrShow 
 */
function toggleImprint(hideOrShow){
    document.getElementById('about-box').style.display = `${hideOrShow}`;
    renderTips();
}

/**
 * this function hides the arrows on the closeup-card so the user cannot click further
 * @param {*} direction 
 */
function hideArrows(direction){
    document.getElementById(`arrow-${direction}`).style.opacity = "0";
    document.getElementById(`arrow-${direction}`).style.pointerEvents = "none";
}
/**
 * this function controls the width of the stats-bar in the closeup-view
 * @param {*} index 
 */
function checkStatsWidth(index) {
    for (let i = 0; i < 6; i++) {
        let bar = document.getElementById(`color-bar${i}`);
        let stat = pokemons[index]['stats'][i]['base_stat'];
        let correctBar = stat / maxStats[i] * 100;
        bar.style.width = `${correctBar}px`;
    }
    let totalbar = document.getElementById(`color-bar6`);
    let totalbarC = sum / 780 * 100;
    totalbar.style.width = `${totalbarC}px`;
}

/**
 * this functions lets the arrow disappear on the closeup card and checks the index of the sorted pokemons
 * @param {*} index 
 */
function getSortedBeginning(index){
    if (renderedStatsSorted && pokemonsBasestats[0].index == index) {
        hideArrows('left');
    }
    if (renderedStatsSorted && pokemonsBasestats[pokemons.length-1].index == index) {
        hideArrows('right');
    }
    if (typeSearched && typeSearchResult[0] == index) {
        hideArrows('left');
    }
    if (typeSearched && typeSearchResult[typeSearchResult.length-1] == index) {
        hideArrows('right');
    }
}

/**
 * this function toggles the shiny mode
 */
function toggleShinyMode(index){
    if (currentPokemonImage == 0) {
        currentPokemonImage = 1;
        document.getElementById('shiny-status').innerHTML = imageStates[currentPokemonImage];
        document.getElementById('closeup-image').src = pokemons[index]['sprites']['other']['official-artwork']['front_default'];
        document.getElementById('shiny-box').classList.remove('shiny0');
    }
    else{
        currentPokemonImage = 0;
        document.getElementById('shiny-status').innerHTML = imageStates[currentPokemonImage];
        document.getElementById('closeup-image').src = pokemons[index]['sprites']['other']['official-artwork']['front_shiny'];
        document.getElementById('shiny-box').classList.add('shiny0');
    }
}