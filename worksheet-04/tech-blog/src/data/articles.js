// src/data/articles.js
export const articles = [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          title: 'Getting Started with Vue 3 Composition API',
          author: 'Maria Santos',
          excerpt:
            "Learn the fundamentals of Vue 3's Composition API and how it can improve your code organization and reusability.",
          content: `
            The Composition API is one of the most exciting features introduced in Vue 3. 
            It provides a new way to organize component logic, making it more flexible and 
            easier to reuse across components. In this article, we'll explore the basics 
            of the Composition API and see how it compares to the Options API.
            
            The main advantage of the Composition API is that it allows you to group related 
            logic together, rather than splitting it across different options like data, 
            methods, and computed. This makes your code more maintainable, especially in 
            larger components.
          `,
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          title: 'Understanding JavaScript Closures',
          author: 'João Pedro',
          excerpt:
            "Dive deep into one of JavaScript's most powerful and misunderstood features: closures.",
          content: `
            Closures are a fundamental concept in JavaScript that every developer should 
            understand. A closure is created when a function is defined inside another 
            function, and the inner function has access to the outer function's variables.
            
            This might sound simple, but closures enable powerful patterns like data privacy, 
            function factories, and the module pattern. Understanding closures will make you 
            a better JavaScript developer and help you write more elegant code.
          `,
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          title: 'CSS Grid vs Flexbox: When to Use Each',
          author: 'Ana Costa',
          excerpt:
            'A comprehensive guide to choosing between CSS Grid and Flexbox for your layouts.',
          content: `
            CSS Grid and Flexbox are both powerful layout tools, but they excel in different 
            scenarios. Flexbox is perfect for one-dimensional layouts - when you're arranging 
            items in a single row or column. It's great for navigation bars, card layouts, 
            and centering content.
            
            CSS Grid, on the other hand, shines in two-dimensional layouts where you need to 
            control both rows and columns. It's ideal for page layouts, image galleries, and 
            complex grid systems. In many cases, you'll use both together in the same project.
          `,
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440004',
          title: 'Building RESTful APIs with Node.js and Express',
          author: 'Ricardo Silva',
          excerpt:
            'Learn how to create robust and scalable REST APIs using Node.js and Express framework.',
          content: `
            Node.js and Express have become the de facto standard for building REST APIs in 
            the JavaScript ecosystem. Express provides a minimal and flexible framework that 
            makes it easy to build web applications and APIs.
            
            In this article, we'll cover the basics of creating a REST API, including setting 
            up routes, handling different HTTP methods, implementing middleware, and connecting 
            to a database. We'll also discuss best practices for API design, error handling, 
            and security considerations.
          `,
        },
      ];

// Helper para conseguir o artible by Id
export function getArticleById(id) {
  return articles.find((article) => article.id === id);
}