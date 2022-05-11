const usersUrl = "https://fakestoreapi.com/users";
const cartsUrl = "https://fakestoreapi.com/carts";
const productsUrl = "https://fakestoreapi.com/products"

//1. Retrieves user, product and shopping cart data
function getAllData() {
    const requests = [getData(usersUrl),getData(cartsUrl),getData(productsUrl)];

    Promise.all(requests)
        .then((responses) => Promise.all(responses.map(response => response.json())))
        .then(([users,carts,products]) => doSmthing(users,carts,products))
        .catch(err => {
            console.log(`Something went wrong. ${err.message}`)
        })
    }
    
async function getData(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

function doSmthing(users,carts,products){
    console.log(users);
    console.log(carts);
    console.log(products);
    findUserWithTheMostExpensiveCart(users,carts,products);
    splitProductsIntoCategories(products);
    console.log(countTotalPriceOfEachCategory(products));
}

function splitProductsIntoCategories(products){
    const categories = new Set()
    products.forEach(product => categories.add(product.category));
    const categoryDataSets = [...categories].map(category => {
        return {name:category, totalPrice: 0};
    })
    return categoryDataSets;
}

//Creates a data structure containing all available product categories and the total value of products of a given category
function countTotalPriceOfEachCategory(products){
    const categories = splitProductsIntoCategories(products);
    products.forEach(product => {
        categories.forEach(category => {
            if(category.name === product.category){
                category.totalPrice+=product.price;
            }
        })
    })
    categories.forEach(category => {
        category.totalPrice = category.totalPrice.toFixed(2);
    })
    return categories;
}

function getPrice(id, products){
    return products.find(product => product.id === id).price;
}

function getTotalPriceOfCart(cart,products){
    return cart.products.reduce((previousValue, currentValue) => {
        return previousValue + getPrice(currentValue.productId, products)*(currentValue.quantity);
    }, 0);
}
 
function getFullNameOfUser(id, users){
    const user = users.find(user => user.id === id);
    return user.name;
}

//Finds a cart with the highest value
function getTheMostExpensiveCart(carts, products){
    //Get total price for each cart
    const data = carts.map(cart => {
        return {...cart, totalPrice:getTotalPriceOfCart(cart, products)}
    });
    //Find the most expensive cart
    const theMostExpensiveCart = data.reduce((previousValue, currentValue) => {
        return previousValue.totalPrice > currentValue.totalPrice ? previousValue : currentValue;
    })
    
    return theMostExpensiveCart;
}

//3. Finds a cart with the highest value, determines its value and full name of its owner
function findUserWithTheMostExpensiveCart(users,carts,products){
    //Finds a cart with the highest value
    const cart = getTheMostExpensiveCart(carts,products);
    //Name of its owner
    const user = getFullNameOfUser(cart.userId, users);
    console.log(`The Most Expensive Cart's id: ${cart.id}, Total price: ${cart.totalPrice}, User: ${user.firstname} ${user.lastname}`)
}

getAllData();