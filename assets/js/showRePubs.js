// Function to handle the click event on the sMI2GBIBActionsButton
function handleActionsButtonClick(event) {
    // Check if the clicked element matches the button class
    if (event.target.matches('.sMI2GBIBActionsButton')) {
        // Find the closest secMainInside2GridBoxInsideBox parent
        const parentBox = event.target.closest('.secMainInside2GridBoxInsideBox');

        if (parentBox) {
            // Find the sMI2GBIBRepub element within the same parent
            const repubElement = parentBox.querySelector('.sMI2GBIBRepub');
            
            if (repubElement) {
                // Add the class sMI2GBIBRepubShow
                repubElement.classList.add('sMI2GBIBRepubShow');
            }
        }
    }
}

// Function to handle the click event on the sMI2GBIBRepubTopBtn
function handleRepubTopBtnClick(event) {
    // Check if the clicked element is the button or a child of the button
    const button = event.target.closest('.sMI2GBIBRepubTopBtn');
    if (button) {
        // Find the closest secMainInside2GridBoxInsideBox parent
        const parentBox = button.closest('.secMainInside2GridBoxInsideBox');

        if (parentBox) {
            // Find the sMI2GBIBRepub element within the same parent
            const repubElement = parentBox.querySelector('.sMI2GBIBRepub');
            
            if (repubElement) {
                // Remove the class sMI2GBIBRepubShow
                repubElement.classList.remove('sMI2GBIBRepubShow');
            }
        }
    }
}

// Add event listeners to a parent element that exists on page load
document.addEventListener('click', function(event) {
    handleActionsButtonClick(event);
    handleRepubTopBtnClick(event);
});