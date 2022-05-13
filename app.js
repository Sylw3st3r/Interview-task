import { getAllData } from "./getAllData.js";
import { findUserWithTheMostExpensiveCart } from "./findUserWithTheMostExpensiveCart.js";
import { countTotalPriceOfEachCategory } from "./countTotalPriceOfEachCategory.js"
import { findFurthestUsers } from "./findFurthestUsers.js"

const usersUrl = "https://fakestoreapi.com/users";
const cartsUrl = "https://fakestoreapi.com/carts";
const productsUrl = "https://fakestoreapi.com/products"
   
getAllData(usersUrl, cartsUrl, productsUrl)
    .then(response=>{
    const [users, carts, products] = response;
    console.log("Users:")
    console.log(users);
    console.log("Carts:")
    console.log(carts);
    console.log("Products:")
    console.log(products);
    console.log("The most expensive Cart:")
    console.log(findUserWithTheMostExpensiveCart(users,carts,products));
    console.log("Categories with total price:")
    console.log(countTotalPriceOfEachCategory(products));
    console.log("Furthest users:")
    console.log(findFurthestUsers(users));
    }).catch(err => {
        console.log(err.message)
    })