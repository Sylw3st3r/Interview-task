export const getPrice = (id, products) => {
    return products.find(product => product.id === id).price;
}

export const getTotalPriceOfCart = (cart,products) =>{
    return cart.products.reduce((previousValue, currentValue) => {
        return previousValue + getPrice(currentValue.productId, products)*(currentValue.quantity);
    }, 0);
}
 
export const getFullNameOfUser = (id, users) => {
    const user = users.find(user => user.id === id);
    return user.name;
}

//Finds a cart with the highest value
export const getTheMostExpensiveCart = (carts, products) => {
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
export const findUserWithTheMostExpensiveCart = (users,carts,products) => {
    //Finds a cart with the highest value
    const cart = getTheMostExpensiveCart(carts,products);
    //Name of its owner
    const user = getFullNameOfUser(cart.userId, users);
    const {totalPrice, ...rest} = cart;
    const theMostExpensiveCart = {
        cart:rest,
        totalPrice:totalPrice,
        user: user
    }
   return theMostExpensiveCart;
}