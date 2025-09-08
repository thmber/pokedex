/**
 * this function renders a card with a pikachu-gif, in the case that the user hasnt liked any pokemons yet
 */
function renderDontLikeCard() {
    document.getElementById('content').innerHTML += `
            <div class="card loading" >
            <div class="small-data">
                    <span class="name-small loading">you don't like any <br>pokemons yet</span>
                    <div class="type-icon" id="type-small-fire">
                    </div>
            </div>
            <div class="card-small-image">
                <img src="img/angry-pikachu.gif" alt="">
            </div>  
    `;
}

/**
 * this function renders the startscreen with the using tips
 */
function renderStartScreen(tipNumber){
    document.getElementById('start-screen').innerHTML = `
        <div class="start-image image-tip${tipNumber}">
            <div class="mask-box${tipNumber}">
                <img src="./img/tips/mask.png" alt="">
            </div>
            <div class="arrow-box-startscreen arrow${tipNumber}">
                <img id="start-arrow" src="./img/tips/arrow.png" alt="">
            </div>  
            <div class="tip-message-box">
                <div>${tips[tipNumber-1]}</div>
            </div>
       </div>
       <div class="start-loading-message">
            <div>LOADING</div>
            <div class="start-point-1">.</div>
            <div class="start-point-2">.</div>
            <div class="start-point-3">.</div>
       </div>
    `
}

/**
 * this function renders the card at the bottom of the main content, which loads and renders more pokemons from the api
 */
function morePokemonCard() {
    document.getElementById('load-more-box').innerHTML += `
        <div class="card loading-card" id="loading-card"  onclick="loadMoreButtonClicked()">
            <p class="load-more-text" id="load-more-text">30 More</p>
            <div class="card-small-image loading-ball">
                <img src="./img/pokeball.png" alt="" id="poke-ball">
            </div>  
        </div>
    `;
}

/**
 * this function generates the small cards of pokemons
 * @param {*} name 
 * @param {*} id 
 * @param {*} image 
 * @param {*} type1 
 * @param {*} index 
 */
function generateSmallCards(name, id, image, type1, index) {
    document.getElementById('content').innerHTML += `
            <div class="card ${type1}" onclick="renderCloseUp(${index})" id="card${index}">
            <div class="small-data">
                    <span class="number-small">#${id}</span>
                    <span class="name-small">${name}</span>
                    <div class="type-icon" id="type-small${index}">
                    </div>
            </div>
            <div class="card-small-image">
                <img src="${image}" alt="">
            </div>
        </div> 
    `;
}

/**
 * this function generates the big cards that appear if the small cards are clicked
 * @param {*} index 
 * @param {*} name 
 * @param {*} id 
 * @param {*} image 
 * @param {*} type1 
 * @param {*} height 
 * @param {*} weight 
 * @param {*} bex 
 * @param {*} stats 
 */
function generateCloseUpCard(index, name, id, image, type1, height, weight, bex, stats) {
    document.getElementById('closeup-main-content').innerHTML = `
    <div class="closeup-card box-shadow" id="closeup-card" onclick="stopPropagation(event)">
                <div class="back d-none" id="back">
                   <div class="back-body">
                        <div class="back-image-box">
                            <img src="${image}" alt="" id="image-popup">
                        </div>
                        <div class="arrow-box-back">
                            <img onclick="rotateCloseUpCard()" src="icons/flip_black.png" alt="">
                        </div>
                        <div class="base-ex-box">
                            <span>Moves</span>
                        </div>
                        <div class="moves" id="moves">
                        </div>
                   </div>
                </div>
                <div class="closeup-card-head ${type1} bg-closeup-${type1}" id="closeup-head">
                    <div class="closeup-img-box ${checkFirstCloseUp()}-img" id="closeup-img">
                        <img src="${image}" alt="" id="closeup-image">
                        <div class="heart-container">
                        <div class="heart-box">
                            <img class="heart" src="img/heart.svg" id="heart1">
                        </div>
                        <div class="heart-box">
                            <img class="heart" src="img/heart.svg" id="heart2">
                        </div>
                        <div class="heart-box">
                            <img class="heart" src="img/heart.svg" id="heart3">
                        </div>
                        <div class="heart-box">
                            <img class="heart" src="img/heart.svg" id="heart4">
                        </div>
                </div>
                    </div>
                    <div class="arrow-box ${checkFirstCloseUp()}-head">
                        <img src="icons/left.png" onclick="renderCloseUp(${checkWhichIndex(index, 'left')})" alt="" id="arrow-left" class="arrow-close-up">
                        <img onclick="rotateCloseUpCard(event)" src="icons/flip.png" alt="" class="arrow-close-up">
                        <img src="icons/right.png" onclick="renderCloseUp(${checkWhichIndex(index, 'right')})" alt="" id="arrow-right" class="arrow-close-up">
                    </div>
                    <div class="closeup-name-number ${checkFirstCloseUp()}-head">
                        <span>${name}</span>
                        <span>#${id}</span>
                        <img src="img/star${checkLiked(index)}.png" id="star" alt="" onclick="like(${index})">
                    </div>
                    <div class="closeup-type-box ${checkFirstCloseUp()}-head">
                           <div class="type-box-before-shiny">   
                                <span class="closeup-type ${type1}-lighter">${type1}</span>
                                    ${getMoreThanOneTypes(index)}
                           </div>
                           <div onclick="toggleShinyMode(${index})" class="shiny-box shiny${currentPokemonImage}" id="shiny-box">
                                <span class="closeup-type" id="shiny-status">${imageStates[currentPokemonImage]}</span>
                           </div>
                    </div>
                    <div class="closeup-height ${checkFirstCloseUp()}-head">
                        <span>${(height / 10)} m</span>
                    </div>
                    <div class="closeup-weight ${checkFirstCloseUp()}-head">
                        <span>${(weight / 10)} kg</span>
                    </div>
                    <div class="closeup-weight ${checkFirstCloseUp()}-head"">
                        <span>${bex} base-xp</span>
                    </div>
                </div>
                <div class="closeup-card-body ${checkFirstCloseUp()}-body" id="closeup-body">
                    <div class="basestats-headline-box">
                        <span>Base Stats</span>
                    </div>
                    <div class="stats-table">
                        <div class="stat-name">
                            <p class="stat" onclick="sortPokemonsByTotalBaseStats(0)">hp</p>
                            <p class="stat" onclick="sortPokemonsByTotalBaseStats(1)">attack</p>
                            <p class="stat" onclick="sortPokemonsByTotalBaseStats(2)">defense</p>
                            <p class="stat" onclick="sortPokemonsByTotalBaseStats(3)">special-attack</p>
                            <p class="stat" onclick="sortPokemonsByTotalBaseStats(4)">special-defense</p>
                            <p class="stat" onclick="sortPokemonsByTotalBaseStats(5)">speed</p>
                            <p class="stat" onclick="sortPokemonsByTotalBaseStats(6)"><b>total</b></p>
                        </div>
                        <div class="stat-number">
                            <p>${stats[0]['base_stat']}</p>
                            <p>${stats[1]['base_stat']}</p>
                            <p>${stats[2]['base_stat']}</p>
                            <p>${stats[3]['base_stat']}</p>
                            <p>${stats[4]['base_stat']}</p>
                            <p>${stats[5]['base_stat']}</p>
                            <p><b>${getSum(stats)}</b></p>
                        </div>
                        <div class="stat-bar">
                            <div class="bar"><div class="color-bar ${type1}" id="color-bar0"></div></div>
                            <div class="bar"><div class="color-bar ${type1}" id="color-bar1"></div></div>
                            <div class="bar"><div class="color-bar ${type1}" id="color-bar2"></div></div>
                            <div class="bar"><div class="color-bar ${type1}" id="color-bar3"></div></div>
                            <div class="bar"><div class="color-bar ${type1}" id="color-bar4"></div></div>
                            <div class="bar"><div class="color-bar ${type1}" id="color-bar5"></div></div>
                            <div class="bar"><div class="color-bar bg-total-bar" id="color-bar6"></div></div>
                        </div>
                    </div>
                    <div class="basestats-box">
                        <span>Abilities</span>
                    </div>
                    <div class="closeup-abilities" id="ability-content">
                    </div>
                </div>
            </div>                
            </div>
    `;
}

/**
 * this function renders the imprint on the imprint-card
 */
function renderImprint(){
    document.getElementById('imprint-card-content').innerHTML = ``;
    document.getElementById('imprint-card-content').innerHTML += `
            <img src="./img/bg_wht.png" alt="" class="imprint-img">
            <img src="./img/pikachu_1.png" alt="" class="imprint-poke">
             <div class="imprint-headline">Imprint</div>
            <div class="imprint-text">Thomas Mahler</div>
            <div class="imprint-text">Weserstraße 191</div>
            <div class="imprint-text">12045 Berlin</div>
            <div class="imprint-text">E-Mail: thmahler@gmx.net</div>
            <div class="imprint-text">Phone: 0172 - 9162309</div>
            <div class="imprint-message-box">
                <div class="imprint-message" onclick="renderTips()">&leftarrow; back</div>
            </div>
    `
}

/**
 * this function renders the Tips, if the users clicks on the question mark in the header
 */
function renderTips(){
    document.getElementById('imprint-card-content').innerHTML = ``;
    document.getElementById('imprint-card-content').innerHTML += `
            <img src="./img/bg_wht.png" alt="" class="imprint-img">
            <div class="imprint-headline">Tips:</div>
            <div class="imprint-text">&#9733; click on type to sort by type!</div>
            <div class="imprint-text">&#9733; click the star to like a pokemon!</div>
            <div class="imprint-text">&#9733; click on base stats to sort by stats!</div>
            <div class="imprint-text">&#9733; compare all kinds of pokemons!</div>
            <div class="imprint-text">&#9733; choose your favourite!</div>
            <div class="imprint-message-box">
                    <div class="imprint-message" onclick="renderImprint()">&rightarrow; Imprint</div>
                    <div class="imprint-message" onclick="renderCredits()">&rightarrow; Credits</div>
            </div>
    `
}

/**
 * this function renders the Credits, if the users clicks on the popup-card, opened by clicking
 * on the question mark
 */
function renderCredits(){
    document.getElementById('imprint-card-content').innerHTML = ``;
    document.getElementById('imprint-card-content').innerHTML += `
             <img src="./img/bg_wht.png" alt="" class="imprint-img">
            <img src="./img/pikachu_1.png" alt="" class="imprint-poke">
             <div class="imprint-headline">Credits</div>
            <div class="imprint-text">Images by <a href="https://unsplash.com/de">unsplash.com</a></div>
            <div class="imprint-text">Icons by <a href="https://www.cleanpng.com/">cleanpng.com</a></div>
            <div class="imprint-message-box">
                    <div class="imprint-message" onclick="renderTips()">&leftarrow; back</div>
            </div>
    `
}