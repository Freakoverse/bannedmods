// Function to handle the click event on the sMI2GBIBActionsButton
function handleActionsButtonClick(event) {
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

// Function to handle the click event on the sMI2GBIBRepubTopBtn
function handleRepubTopBtnClick(event) {
    // Find the closest secMainInside2GridBoxInsideBox parent
    const parentBox = event.target.closest('.secMainInside2GridBoxInsideBox');
    
    if (parentBox) {
        // Find the sMI2GBIBRepub element within the same parent
        const repubElement = parentBox.querySelector('.sMI2GBIBRepub');
        
        if (repubElement) {
            // Remove the class sMI2GBIBRepubShow
            repubElement.classList.remove('sMI2GBIBRepubShow');
        }
    }
}

// Add event listeners to the buttons
document.querySelectorAll('.sMI2GBIBActionsButton').forEach(button => {
    button.addEventListener('click', handleActionsButtonClick);
});

document.querySelectorAll('.sMI2GBIBRepubTopBtn').forEach(button => {
    button.addEventListener('click', handleRepubTopBtnClick);
});
