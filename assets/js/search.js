      document.getElementById('blogSearch').addEventListener('input', function() {
        let filter = this.value.toLowerCase();
        let posts = document.querySelectorAll('.blog-post');
        posts.forEach(post => {
          let title = post.querySelector('h3').textContent.toLowerCase();
          let content = post.querySelector('p').textContent.toLowerCase();
          if (title.includes(filter) || content.includes(filter)) {
            post.style.display = '';
          } else {
            post.style.display = 'none';
          }
        });
      });