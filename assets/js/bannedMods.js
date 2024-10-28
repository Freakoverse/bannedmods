(function() {
    const bannedMods = document.getElementById('bannedMods');
    const secMainInside2GridBoxInsideAlt = bannedMods.querySelector('.secMainInside2GridBoxInsideAlt');
    const paginationNumbers = bannedMods.querySelector('.paginationMainInsideNumbers');
    const prevButton = bannedMods.querySelector('.paginationMainInsideBtnArrowPrev');
    const nextButton = bannedMods.querySelector('.paginationMainInsideBtnArrowNext');

    let items = []; // Initialize items as an empty array
    const itemsPerPage = 8;
    let currentPage = 1;

    // Function to fetch and parse CSV data
    async function fetchCSVData() {
        const response = await fetch('/db/bannedmods.csv'); // Adjust the path as necessary
        const text = await response.text();
        parseCSV(text);
    }

    // Function to parse CSV text into items array
    function parseCSV(text) {
        const rows = text.split('\n').slice(1); // Skip header row
        items = rows.map(row => {
            const columns = row.split(',');
            return {
                featuredImg: columns[0],
                modTitle: columns[1],
                modDesc: columns[2],
                takeDownDate: columns[3],
                takenDownFrom: columns[4].split(';').map((name, index) => ({
                    name: name.trim(),
                    link: columns[5].split(';')[index].trim()
                })),
                republishedOn: {
                    name: columns[6].trim(),
                    link: columns[7].trim()
                },
                isCreatorBanned: columns[8].trim(),
                creatorName: columns[9].trim(),
                creatorLink: columns[10].trim(),
                isNSFW: columns[11].trim(),
                gameName: columns[12].trim(),
                gameLink: columns[13].trim()
            };
        });
        renderItems(currentPage); // Render items after fetching
    }

    function renderItems(page) {
        secMainInside2GridBoxInsideAlt.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = items.slice(start, end);

        paginatedItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'secMainInside2GridBoxInsideBox';
            itemElement.innerHTML = `
                <div class="sMI2GBIBFeatured">
                    <img class="sMI2GBIBFeaturedImg" src="${item.featuredImg}" />
                    <div class="sMI2GBIBFeaturedTop">
                        <div class="sMI2GBIBFeaturedTopNSFW ${item.isNSFW === "yes" ? 'sMI2GBIBFeaturedTopNSFWShow' : ''}">
                            <p class="sMI2GBIBFeaturedTopNSFWText">NSFW</p>
                        </div>
                    </div>
                    <div class="sMI2GBIBFeaturedBottom">
                        <a class="sMI2GBIBFeaturedBottomCreator" href="${item.creatorLink}" target="_blank">
                            <span class="sMI2GBIBFeaturedBottomCreatorBanned">${item.isCreatorBanned === "yes" ? 'Banned' : 'Safe'}</span>
                            <div class="sMI2GBIBFeaturedBottomCreatorDivider"></div>
                            <span class="sMI2GBIBFeaturedBottomCreatorName">${item.creatorName}</span>
                                                    </a>
                    </div>
                </div>
                <div class="sMI2GBIBDetails">
                    <div class="sMI2GBIBInfo">
                        <h3 class="sMI2GBIBInfoHeading">${item.modTitle}</h3>
                        <p class="sMI2GBIBInfoSub">${item.modDesc}</p>
                    </div>
                    <div class="sMI2GBIBDate">
                        <p class="sMI2GBIBDateText">Removed on: <span class="sMI2GBIBDateSpan">${item.takeDownDate}</span></p>
                    </div>
                    <div class="sMI2GBIBBans">
                        <p class="sMI2GBIBBansText">Taken down from</p>
                        <div class="sMI2GBIBBansSites">
                            ${item.takenDownFrom.map(site => `
                                <a class="sMI2GBIBBansSitesSite" href="${site.link}" target="_blank">
                                    <p class="sMI2GBIBBansSitesSiteText">${site.name}<br /></p>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    <div class="sMI2GBIBGame">
                        <p class="sMI2GBIBGameText">Game</p>
                        <div class="sMI2GBIBGameGame">
                            <a class="sMI2GBIBGameGameLink" href="${item.gameLink}" target="_blank">
                                <p class="sMI2GBIBGameGameLinkText">${item.gameName}<br /></p>
                            </a>
                        </div>
                    </div>
                    <div class="sMI2GBIBActions">
                        <button class="btnMain sMI2GBIBActionsButton" type="button">Find</button>
                    </div>
                    <div class="sMI2GBIBRepub">
                        <div class="sMI2GBIBRepubTop">
                            <button class="btnMain sMI2GBIBRepubTopBtn" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-96 0 512 512" width="1em" height="1em" fill="currentColor">
                                    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="sMI2GBIBRepubMidDivider"></div>
                        <div class="sMI2GBIBRepubMid">
                            <a class="btnMain sMI2GBIBRepubMidBtn" role="button" href="${item.republishedOn.link}" target="_blank">
                                <span class="sMI2GBIBRepubMidBtnSpan">${item.republishedOn.name}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `;
            secMainInside2GridBoxInsideAlt.appendChild(itemElement);
        });

        renderPagination();
    }

function renderPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage); // Declare totalPages once
    paginationNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `btnMain paginationMainInsideBtn ${i === currentPage ? 'paginationMainInsideBtnActive' : ''}`;
        button.type = 'button';
        button.innerHTML = `<span>${i}</span>`;
        button.addEventListener('click', () => {
            currentPage = i;
            renderItems(currentPage);
        });
        paginationNumbers.appendChild(button);
    }

    // Enable/disable Previous button
    prevButton.disabled = currentPage === 1;

    // Enable/disable Next button
    nextButton.disabled = currentPage === totalPages; // Use totalPages without redeclaring
}


        // Enable/disable Previous button
        prevButton.disabled = currentPage === 1;

        // Enable/disable Next button
        const totalPages = Math.ceil(items.length / itemsPerPage);
        nextButton.disabled = currentPage === totalPages;
    }

    // Event listeners for Previous and Next buttons
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderItems(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderItems(currentPage);
        }
    });

    // Initial fetch and render
    fetchCSVData();
})();
