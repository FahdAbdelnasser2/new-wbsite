document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blogSearch');
    const noResults = document.getElementById('no-results');
    
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let visibleCount = 0;

        // Iterate over all blog posts
        document.querySelectorAll('.blog-post').forEach(post => {
            const title = post.querySelector('h3') ? post.querySelector('h3').textContent.toLowerCase() : '';
            const desc = post.querySelector('p') ? post.querySelector('p').textContent.toLowerCase() : '';
            const category = post.querySelector('.post-category') ? post.querySelector('.post-category').textContent.toLowerCase() : '';
            
            // Find the parent column to hide/show
            // We look for the direct parent column div (col-lg-4, col-md-6)
            const parentCol = post.closest('.col-lg-4, .col-md-6') || post.parentElement;
            
            if (title.includes(searchTerm) || desc.includes(searchTerm) || category.includes(searchTerm)) {
                parentCol.style.display = ''; // Reset display
                parentCol.classList.add('fade-in'); // Add animation if desired
                visibleCount++;
            } else {
                parentCol.style.display = 'none';
                parentCol.classList.remove('fade-in');
            }
        });

        // Toggle No Results Message
        if (visibleCount === 0) {
            if(noResults) {
                noResults.classList.remove('d-none');
            }
        } else {
             if(noResults) {
                noResults.classList.add('d-none');
            }
        }
    });
});
