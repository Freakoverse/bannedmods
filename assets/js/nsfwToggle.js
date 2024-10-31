document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.querySelector('.filtersMainFilterToggleCheckNSFW');

    function updateVisibility() {
        const elementsToToggle = document.querySelectorAll('.secMainInside2GridBoxInsideBox');
        
        elementsToToggle.forEach(function(element) {
            if (checkbox.checked) {
                // Show the element if it has the class sMI2GBIBFeaturedTopNSFWShow
                if (element.querySelector('.sMI2GBIBFeaturedTopNSFWShow')) {
                    element.style.filter = 'unset'; // Show the element
                    element.style.opacity = '0.25;'
                } else {
                    element.style.filter = 'unset'; // Keep other elements visible
                    element.style.opacity = '0.25;'
                }
            } else {
                // Hide only elements with the class sMI2GBIBFeaturedTopNSFWShow
                if (element.querySelector('.sMI2GBIBFeaturedTopNSFWShow')) {
                    element.style.filter = 'blur(10px)'; // Hide the element
                    element.style.opacity = '0.25;'
                } else {
                    element.style.filter = 'unset'; // Keep other elements visible
                    element.style.opacity = '1;'
                }
            }
        });
    }

    // Initial visibility update
    updateVisibility();

    // Add event listener to checkbox
    checkbox.addEventListener('change', updateVisibility);

    // Create a MutationObserver to watch for dynamically added elements
    const observer = new MutationObserver(() => {
        updateVisibility(); // Re-evaluate visibility when elements are added
    });

    // Observe changes in the target container
    const targetNode = document.querySelector('.secMainInside2GridBoxInsideAlt');
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    }
});
