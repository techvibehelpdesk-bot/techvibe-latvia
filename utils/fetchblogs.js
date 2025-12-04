const fetchBlogs = async (path) => {
        try {
          const response = await fetch("undefined/api/projects/PVxo4T4QdVnzt6hpg2Ph" + path);
          
          if (!response.ok) {
            throw new Error("HTTP error!");
          }
          
          const data = await response.json();
      
          let docs = data.data.docs || data.data
      
          if (!Array.isArray(docs)) {
            docs = [docs];
          }
      
          const blogs = docs?.map(blog => { 
            return {
              id: blog.id,
              slug: blog.slug,
              title: blog.title,
              htmlContent:blog.htmlContent,
              url:"undefined" + blog.featuredImage?.url + "?show=true",
              alt: blog.featuredImage?.alt || 'Blog image'
            };
          }) || [];
      
          return blogs;
          
        } catch (error) {
          console.error('Error fetching blogs:', error);
          
          return null
        }
      };
      
      export default fetchBlogs;