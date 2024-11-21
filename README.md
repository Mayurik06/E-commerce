1. Clone the Repository:

        git clone https://github.com/Mayurik06/E-commerce.git

2. Install dependencies:

        npm install

3.Set up environment variables: 

    PORT=4000

    MONGODB_URI=your_mongodb_connection_string

4.start the server:

    npm start

5. Schema Design and Relationships
1. Category Schema
   
     *Feilds
   
         1. name: String (unique, required)
   
         2. description: String
   
         3. products: Array of product IDs (relationship with Product)
   

3. Product Schema
   
     *Feilds
   
         1. name: String (required)
   
         2. price: Number (required, must be positive)
   
         3. stock: Number (default: 0)
   
         4. categoryId: Reference to the Category schema (required)
   

   Relationships:

         1. Each product belongs to a single category (categoryId).
   
         2. Each category can have multiple products.

6. List of APIs and Usage
   
  1.Category
   
     1.create category: /api/category/create
   
     2. get all category: /api/category/getAll
        
     3. get category by ID: /api/category/get/:id
        
     4. update category: /api/category/update/:id
  
     5. delete category: /api/category/delete/:id
        

  2. Product
       
         1.create product :/api/product/create
       
         2.get all product: /api/product/getAll
       
         3.get product by ID: /api/product/get/:id
       
         4. update product : /api/product/update/:id
      
         5. delete product: /api/product/delete/:id
      
