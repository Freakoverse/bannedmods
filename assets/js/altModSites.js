// Sample data for mod sites
const modSites = [
    {
        name: "DEG Mods",
        description: "The first censorship-resistant and permissionless mod site",
        image: "https://image.nostr.build/d7a8b7ccf2ecd02f0496cf95ff860309c87dcb053c5bc030557b9f47be7c2bd2.png",
        link: "https://degmods.com/"
    },
    
];

// Sample data for gated mod sites
const gatedModSites = [
    {
        name: "Modding Haven",
        description: "Modding Haven, a mod site for all mods.",
        image: "https://image.nostr.build/ba9fa5dd6aa2f8f7293f819c0052c255726307dd5c0e58dac549aa5bf9aaf6d3.png",
        link: "https://moddinghaven.com/mediawiki/index.php/Main_Page"
    },
    {
        name: "MODHQ",
        description: "text",
        image: "https://image.nostr.build/2b60f1f9dc115847c841d44ec79fc71272c14440e7cadb88c884786417fa257a.png",
        link: "https://modhq.org/"
    },
    {
        name: "Based Mods",
        description: "text",
        image: "https://image.nostr.build/6b5788888f2d0ec5e13e59196e888ac98ce8b7df966d26b66aebbd2072547c77.png",
        link: "https://basedmods.eth.limo"
    },
];

const itemsPerPage = 5;
let currentPageMod = 1;
let currentPageGated = 1;

// Function to render mod sites
function renderModSites() {
    const altModSites = document.getElementById('AltModSites');
    const insideDiv = altModSites.querySelector('.secMainInside2GridBoxInside');
    insideDiv.innerHTML = ''; // Clear existing content

    const startIndex = (currentPageMod - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, modSites.length);

    for (let i = startIndex; i < endIndex; i++) {
        const site = modSites[i];
        const cardHTML = `
            <div class="secMainInside2GridBoxInsideCard">
                <a class="secMainInside2GridBoxInsideCardLink" target="_blank" href="${site.link}">
                    <div class="secMainInside2GridBoxInsideCardLinkPic">
                        <img class="secMainInside2GridBoxInsideCardLinkPicImg" src="${site.image}" />
                    </div>
                    <div class="secMainInside2GridBoxInsideCardLinkDetails">
                        <h4 class="secMainInside2GridBoxInsideCardLinkDetailsHeading">${site.name}</h4>
                        <p class="secMainInside2GridBoxInsideCardLinkDetailsText">${site.description}</p>
                    </div>
                </a>
            </div>
        `;
        insideDiv.insertAdjacentHTML('beforeend', cardHTML);
    }

    renderPagination('mod', modSites.length);
}

// Function to render gated mod sites
function renderGatedModSites() {
    const altGatedModSites = document.getElementById('AltGatedModSites');
    const insideDiv = altGatedModSites.querySelector('.secMainInside2GridBoxInside');
    insideDiv.innerHTML = ''; // Clear existing content

    const startIndex = (currentPageGated - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, gatedModSites.length);

    for (let i = startIndex; i < endIndex; i++) {
        const site = gatedModSites[i];
        const cardHTML = `
            <div class="secMainInside2GridBoxInsideCard">
                <a class="secMainInside2GridBoxInsideCardLink" target="_blank" href="${site.link}">
                    <div class="secMainInside2GridBoxInsideCardLinkPic">
                        <img class="secMainInside2GridBoxInsideCardLinkPicImg" src="${site.image}" />
                    </div>
                    <div class="secMainInside2GridBoxInsideCardLinkDetails">
                        <h4 class="secMainInside2GridBoxInsideCardLinkDetailsHeading">${site.name}</h4>
                        <p class="secMainInside2GridBoxInsideCardLinkDetailsText">${site.description}</p>
                    </div>
                </a>
            </div>
        `;
        insideDiv.insertAdjacentHTML('beforeend', cardHTML);
    }

    renderPagination('gated', gatedModSites.length);
}

// Function to render pagination
function renderPagination(type, totalSites) {
    const paginationNumbers = type === 'mod' 
        ? document.querySelector('#AltModSites .paginationMainInsideNumbers') 
        : document.querySelector('#AltGatedModSites .paginationMainInsideNumbers');

    paginationNumbers.innerHTML = ''; // Clear existing pagination

    const totalPages = Math.ceil(totalSites / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const buttonClass = (type === 'mod' && i === currentPageMod) || (type === 'gated' && i === currentPageGated) 
            ? 'btnMain paginationMainInsideBtn paginationMainInsideBtnActive' 
            : 'btnMain paginationMainInsideBtn';
        const buttonHTML = `<button class="${buttonClass}" type="button" onclick="changePage('${type}', ${i})"><span>${i}</span></button>`;
        paginationNumbers.insertAdjacentHTML('beforeend', buttonHTML);
    }

    // Enable or disable arrow buttons based on the current page
    const prevButton = type === 'mod' 
        ? document.querySelector('#AltModSites .paginationMainInsideBtnArrowPrev') 
        : document.querySelector('#AltGatedModSites .paginationMainInsideBtnArrowPrev');

    const nextButton = type === 'mod' 
        ? document.querySelector('#AltModSites .paginationMainInsideBtnArrowNext') 
        : document.querySelector('#AltGatedModSites .paginationMainInsideBtnArrowNext');

    prevButton.disabled = (type === 'mod' ? currentPageMod : currentPageGated) === 1;
    nextButton.disabled = (type === 'mod' ? currentPageMod : currentPageGated) === totalPages;
}

// Function to change page
function changePage(type, page) {
    if (type === 'mod') {
        currentPageMod = page;
        renderModSites();
    } else {
        currentPageGated = page;
        renderGatedModSites();
    }
}

// Function to go to the previous page
function goToPreviousPage(type) {
    if (type === 'mod' && currentPageMod > 1) {
        currentPageMod--;
        renderModSites();
    } else if (type === 'gated' && currentPageGated > 1) {
        currentPageGated--;
        renderGatedModSites();
    }
}

// Function to go to the next page
function goToNextPage(type) {
    const totalPages = type === 'mod' 
        ? Math.ceil(modSites.length / itemsPerPage) 
        : Math.ceil(gatedModSites.length / itemsPerPage);

    if (type === 'mod' && currentPageMod < totalPages) {
        currentPageMod++;
        renderModSites();
    } else if (type === 'gated' && currentPageGated < totalPages) {
        currentPageGated++;
        renderGatedModSites();
    }
}

// Add event listeners to the arrow buttons for both lists
document.querySelector('#AltModSites .paginationMainInsideBtnArrowPrev').addEventListener('click', () => goToPreviousPage('mod'));
document.querySelector('#AltModSites .paginationMainInsideBtnArrowNext').addEventListener('click', () => goToNextPage('mod'));

document.querySelector('#AltGatedModSites .paginationMainInsideBtnArrowPrev').addEventListener('click', () => goToPreviousPage('gated'));
document.querySelector('#AltGatedModSites .paginationMainInsideBtnArrowNext').addEventListener('click', () => goToNextPage('gated'));

// Initial render
renderModSites();
renderGatedModSites();
