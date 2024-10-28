document.querySelectorAll('.filtersMainFilterToggleCheck').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        // Find the adjacent div with the class filtersMainFilterToggleDot
        const dot = this.nextElementSibling; // Assuming the div is the next sibling

        if (dot && dot.classList.contains('filtersMainFilterToggleDot')) {
            if (this.checked) {
                dot.classList.add('filtersMainFilterToggleDotChecked');
            } else {
                dot.classList.remove('filtersMainFilterToggleDotChecked');
            }
        }
    });
});
