## Plaza Backend API
* Live Link: todo
* [Frontend - Client side](https://github.com/AlFahimBinFaruk/Plaza_Client)
* [Admin panel](https://github.com/AlFahimBinFaruk/Adminpanel_plaza)

### Client Requirements

As a guest user, I can

* View Homepage,Products
* Signup to be an customer
* Search for products

As an Admin user, I can

* Login
* View & edit profile(first,last name,email,password)
* CRUD Users
* CRUD roles(only 2 roles: admin,customer)
* CRUD Products
* Logout

As a Customer, I can

* Login
* View & edit profile(first,last name,email,password)
* Purchase new products if available quantity.
* Cancel purchase.
* See my purchase history
* Checkout - currently we only have COD feature.

### Technology

* Language: Node
* Express
* Database: MongoDB

### Database Models
![Database model image](https://drive.google.com/uc?export=view&id=1Vd6seuWdWvJxx1bG3hBQIIUso75_--_W)

### Screenshots
* Home page
![image](https://drive.google.com/uc?export=view&id=1e746_8xASRpl4hcH56PQW-b4yODdvYNx)
* Product Details page
![image](https://drive.google.com/uc?export=view&id=1Pt0ChzYn6h_w5PGTerMhDLBX2hLfU2_z)
* Cart
![image](https://drive.google.com/uc?export=view&id=1GsInLjFN7V_HgAL_uVZRvhome1YvMdSf)
* Order History
![image](https://drive.google.com/uc?export=view&id=1FbCOOoisjFSjS_tdKUFm66PS30S2AUeD)
* Order Details
![image](https://drive.google.com/uc?export=view&id=1jNlv49Q4nXshQFXtxfIi39kn0pCpyjX6)
* Profile
![image](https://drive.google.com/uc?export=view&id=1vrYWtNp9M_fUnwyI3ZYvL1uzYodXqfgl)
* Register
![image](https://drive.google.com/uc?export=view&id=1rfM9XqQkidqiC2F8wlsDIcG4D_MxJxq0)
* Login
![image](https://drive.google.com/uc?export=view&id=1v-nD-FlNmisglmWsfC1RWNnpu0YKYPBl)


### API Routes
* To register - POST
```text
/api/user/register
```

* To login : will get and jwt token. - POST
```text
/api/user/login
```

* To Logout - will logout user/admin - GET
```text
/api/user/logout
```

* Get all user list : secured, authorized to admin only - GET
```text
/api/user/all
```

* Get individual user details : secured, only authorized admin and user himself and access it - GET
```text
/api/user/details/{user_id}
```

* Update user information : secured, only authorized admin and user himself and access it - PUT
```text
/api/user/update/{user_id}
```

* Delete a user : secured, only authorized admin and user himself and access it - DELETE
```text
/api/user/delete/{user_id}
```

* Get all category - all visitors can access it - GET
```text
/api/category/all?page=1&limit=10
```

* Get category details - all visitors can access it - GET
```text
/api/category/details/{category_id}
```

* Add new category : only admin can access it - POST
```text
/api/category/add-new
```

* Update category : only admin can access it - PUT
```text
/api/category/update/{category_id}
```

* Delete category : only admin can access it - DELETE
```text
/api/category/delete/{category_id}
```


* Get all product of a single category - all visitors can access it, it will have pagination - GET
```text
/api/products/all?page=1&limit=10&categoryIds=categoryId1,categoryId2
```

* Search for products - all visitors can access it , it will have pagination - GET
```text
/api/products/search?page=1&limit=10&query=searchTerm
```

* Get product Details - all visitors can access it - GET
```text
/api/product/details/{product_id}
```

* Add new product : only authorized admin can access it - POST
```text
/api/product/add-new
```

* Update product : only authorized admin can access it - PUT
```text
/api/product/update/{product_id}
```

* Delete product : only authorized admin can access it - DELETE
```text
/api/product/delete/{product_id}
```

* Purchase product : only authorized users can buy product - POST
```text
/api/order/place-order
```

* Get all order list : only admin can access it
```text
/api/order/all
```
* Get order details : only admin  can access it
```text
/api/order/details/{order_id}
```

* Get my order details
```text
/api/order/my-order-details/{order_id}
```

* Show my order list : it will have pagination - GET
```text
/api/order/my-order-list
```

* Cancel order : only admin or user himself can access it - PUT
```text
/api/order/delete/{order_id}
```

* Update order : only authorized admin and user himself can do it - PUT
```text
/api/order/update/{order_id}
```



### How to Build & Run