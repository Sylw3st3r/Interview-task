import { unlink } from "fs";

//Returns 0 if products doesnt exist. 
export const getPrice = (productId, products) => {
    const id = +productId;
    const product = products.find(product => product.id === id);
    return product?.price ? +product.price : 0;
}

export const getTotalPriceOfCart = (cart,products) =>{
    const price = cart?.products?.reduce((previousValue, currentValue) => {
        return previousValue + getPrice(currentValue.productId, products)*(currentValue.quantity);
    }, 0)

    return price ? price : 0 ;
}
 
export const getFullNameOfUser = (id, users) => {
    const user = users.find(user => +user.id === +id);
    return user?.name ? user.name : {firstname: undefined, lastname: undefined};
}


//3. Finds a cart with the highest value, determines its value and full name of its owner
export const getTheMostExpensiveCart = (users, carts, products) => {
    //Get total price for each cart
    const data = carts.map(cart => {
        return {...cart, totalPrice:getTotalPriceOfCart(cart, products)}
    });
    //Find the most expensive cart
    const theMostExpensiveCart = data.reduce((previousValue, currentValue) => {
        return previousValue.totalPrice > currentValue.totalPrice ? previousValue : currentValue;
    })

    const user = getFullNameOfUser(theMostExpensiveCart.userId, users);

    const {totalPrice, ...rest} = theMostExpensiveCart;

    return {
        cart:rest,
        totalPrice:totalPrice,
        user: user
    }
}
