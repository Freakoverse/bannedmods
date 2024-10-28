(function() {
    const bannedMods = document.getElementById('bannedMods');
    const secMainInside2GridBoxInsideAlt = bannedMods.querySelector('.secMainInside2GridBoxInsideAlt');
    const paginationNumbers = bannedMods.querySelector('.paginationMainInsideNumbers');
    const prevButton = bannedMods.querySelector('.paginationMainInsideBtnArrowPrev');
    const nextButton = bannedMods.querySelector('.paginationMainInsideBtnArrowNext');

    const itemsPerPage = 8;
    let currentPage = 1;
    let items = [];

    // Function to fetch and parse CSV data
    async function fetchItems() {
        const response = await fetch('/db/bannedmods.csv'); // Update with the path to your CSV file
        const text = await response.text();
        const rows = text.split('\n').slice(1); // Skip header row

        items = rows.map(row => {
            const columns = row.split(',');

            // Parse takenDownFrom and takenDownFromLink
            const takenDownFrom = columns[4].replace(/"/g, '').split(',').map(name => name.trim());
            const takenDownFromLink = columns[5].replace(/"/g, '').split(',').map(link => link.trim());

            // Parse republishedOnName and republishedOnLink
            const republishedOnNames = columns[6].replace(/"/g, '').split(',').map(name => name.trim());
            const republishedOnLinks = columns[7].replace(/"/g, '').split(',').map(link => link.trim());

            return {
                featuredImg: columns[0].trim(),
                modTitle: columns[1].trim(),
                modDesc: columns[2].trim(),
                takeDownDate: columns[3].trim(),
                takenDownFrom: takenDownFrom.map((name, index) => ({
                    name: name,
                    link: takenDownFromLink[index] || ''
                })),
                republishedOn: republishedOnNames.map((name, index) => ({
                    name: name,
                    link: republishedOnLinks[index] || ''
                })),
                isCreatorBanned: columns[8].trim(),
                creatorName: columns[9].trim(),
                creatorLink: columns[10].trim(),
                isNSFW: columns[11].trim(),
                gameName: columns[12].trim(),
                gameLink: columns[13].trim()
            };
        });

        renderItems(currentPage);
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
                    <div class="sMI2GBIBRepub">
                        <p class="sMI2GBIBRepubText">Republished on</p>
                        <div class="sMI2GBIBRepubSites">
                            ${item.republishedOn.map(repub => `
                                <a class="sMI2GBIBRepubSite" href="${repub.link}" target="_blank">
                                    <p class="sMI2GBIBRepubSiteText">${repub.name}<br /></p>
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
                </div>
            `;
            secMainInside2GridBoxInsideAlt.appendChild(itemElement);
        });

        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(items.length / itemsPerPage);
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

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

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

    // Fetch items from CSV and render them
    fetchItems();
})();
