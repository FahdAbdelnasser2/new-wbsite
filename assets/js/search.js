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
            
            // Find the parent element - for new layout it's the blog-post itself inside blog-articles-container
            const parentContainer = post.closest('.blog-articles-container') ? post : post.closest('.col-lg-4, .col-md-6');
            
            if (title.includes(searchTerm) || desc.includes(searchTerm) || category.includes(searchTerm)) {
                post.style.display = ''; // Reset display
                if (parentContainer && parentContainer !== post) {
                    parentContainer.style.display = '';
                }
                post.classList.add('fade-in'); // Add animation if desired
                visibleCount++;
            } else {
                post.style.display = 'none';
                if (parentContainer && parentContainer !== post) {
                    parentContainer.style.display = 'none';
                }
                post.classList.remove('fade-in');
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
