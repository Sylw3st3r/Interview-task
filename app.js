const usersUrl = "https://fakestoreapi.com/users";
const cartsUrl = "https://fakestoreapi.com/carts";
const productsUrl = "https://fakestoreapi.com/products"

//1. Retrieves user, product and shopping cart data
const getAllData = async () => {
    const requests = [getData(usersUrl),getData(cartsUrl),getData(productsUrl)];
    const data = await Promise.all(requests)
    return data;
 } 

 const getData = async url => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data
}

const doSmthing = async () =>{
    const [users, carts, products] = await getAllData();
    console.log(users);
    console.log(carts);
    console.log(products);
    findUserWithTheMostExpensiveCart(users,carts,products);
    splitProductsIntoCategories(products);
    console.log(countTotalPriceOfEachCategory(products));
    console.log(findFurthestUsers(users));
}

const splitProductsIntoCategories = products =>{
    const categories = new Set()
    products.forEach(product => categories.add(product.category));
    const categoryDataSets = [...categories].map(category => {
        return {name:category, totalPrice: 0};
    })
    return categoryDataSets;
}

//Creates a data structure containing all available product categories and the total value of products of a given category
const countTotalPriceOfEachCategory = products =>{
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

const getPrice = (id, products) => {
    return products.find(product => product.id === id).price;
}

const getTotalPriceOfCart = (cart,products) =>{
    return cart.products.reduce((previousValue, currentValue) => {
        return previousValue + getPrice(currentValue.productId, products)*(currentValue.quantity);
    }, 0);
}
 
const getFullNameOfUser = (id, users) => {
    const user = users.find(user => user.id === id);
    return user.name;
}

//Finds a cart with the highest value
const getTheMostExpensiveCart = (carts, products) => {
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
const findUserWithTheMostExpensiveCart = (users,carts,products) => {
    //Finds a cart with the highest value
    const cart = getTheMostExpensiveCart(carts,products);
    //Name of its owner
    const user = getFullNameOfUser(cart.userId, users);
    console.log(`The Most Expensive Cart's id: ${cart.id}, Total price: ${cart.totalPrice}, User: ${user.firstname} ${user.lastname}`)
}

//Haversine formula
const getDistance = (A, B) => {
    
    const {lat:lat1,long:lon1} = A;
    const {lat:lat2,long:lon2} = B;

    const radius = 6371; 
    const dLat = deg2rad(lat2-lat1);
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = radius * c;
    return d;
}
  
const deg2rad = deg => {
    return deg * (Math.PI/180) 
}

const getAllUserDistanceCombinations = (users) => {

    console.log(users);
    const allCombinations = [];

    for(let i = 0; i<users.length;i++){
        for(let j = i; j<users.length;j++){
            const user1 = users[i];
            const user2 = users[j];
            const A = user1.address.geolocation;
            const B = user2.address.geolocation;

            const combination = {
                user1:user1,
                user2:user2,
                distance:getDistance(A, B)
            }
            console.log(combination);
            allCombinations.push(combination);
        }
    }
    return allCombinations;
}

//4. Finds the two users living furthest away from each other
const findFurthestUsers = users => {
    const allCombinations = getAllUserDistanceCombinations(users);
    return closestPar = allCombinations.reduce((previousValue, currentValue) => {
        return currentValue.distance > previousValue.distance ? currentValue : previousValue;
    })
}


doSmthing();