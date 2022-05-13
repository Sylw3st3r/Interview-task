//Returns 0 if products doesnt exist.
export const getPrice = (productId, products) => {
    const id = +productId;
    const price = products.find(product => product.id === id)?.price;
    return price ?? 0;
};

export const getTotalPriceOfCart = (cart, listOfAllProducts) => {
    if (!listOfAllProducts.length || !cart?.products.length) {
        return 0;
    }

    return cart.products.reduce((previousValue, currentValue) => {
        return (
            +previousValue +
            getPrice(currentValue.productId, listOfAllProducts) *
                +currentValue.quantity
        );
    }, 0);
};

export const getFullNameOfUser = (id, users) => {
    const userName = users.find(user => +user.id === +id)?.name;
    return userName ?? { firstname: "unknown", lastname: "unknown" };
};

//3. Finds a cart with the highest value, determines its value and full name of its owner
export const getTheMostExpensiveCart = (users, carts, products) => {
    //Get total price for each cart
    const data = carts.map(cart => ({
        ...cart,
        totalPrice: getTotalPriceOfCart(cart, products),
    }));

    //Find the most expensive cart
    const theMostExpensiveCart = data.reduce((previousValue, currentValue) =>
        previousValue.totalPrice > currentValue.totalPrice
            ? previousValue
            : currentValue
    );

    const user = getFullNameOfUser(theMostExpensiveCart.userId, users);

    const { totalPrice, ...rest } = theMostExpensiveCart;

    return {
        cart: rest,
        totalPrice: totalPrice,
        user: user,
    };
};
