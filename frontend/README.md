## Food Order

Food order app from multiple stores. Development time limit - 3 days.

### Functionality:

- Authorization and authentication
- Order the food from only 1 store at a time
- Shopping Cart
- Coupons
- Checkout and login forms
- Choose address on Google Map

## Deploy

https://elian-cheng-food-order.netlify.app/

## Front-End

https://github.com/elian-cheng/food-order/tree/front

## Back-End

https://github.com/elian-cheng/food-order/tree/server

## Install instructions:

### Front-End:

```bash
1. git clone https://github.com/elian-cheng/food-order.git
2. cd food-order
3. git checkout front
4. npm i
5. npm run dev
```

### Back-End:

```bash
1. git clone https://github.com/elian-cheng/food-order.git
2. cd food-order
3. git checkout server
4. npm i
5. npm run start
```

### Server requests:

- GET /products - get products list;
- GET /products/${id} - get products by it's ID;
- GET /products?store=${store} - get products by store name ${store};
- GET /users/${id}/tokens - get user's (ID) access token;
- POST /users - create(register) a user;
- POST /signin - login user;
- GET users/${userID}/orders - get user's (ID) orders;
- POST users/${userID}/orders - send (save) user's (ID) orders to the server;

### Used technologies

- React
- TypeScript
- React Router
- React Context
- Redux, Redux Toolkit
- MUI, SCSS
- Node.js, Node Express
- Mongoose, MongoDB
- JWT Authentication
- react-hook-form, yup
- Google Map
