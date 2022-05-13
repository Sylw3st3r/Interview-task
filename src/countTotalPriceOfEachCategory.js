export const splitProductsIntoCategories = products => {
    if (!products.length || !products[0]?.category) {
        return [];
    }

    const categories = new Set();

    for (const product of products) {
        categories.add(product.category);
    }

    return [...categories].map(category => ({
        name: category,
        totalPrice: 0,
    }));
};

//2. Creates a data structure containing all available product categories and the total value of products of a given category
export const countTotalPriceOfEachCategory = products => {
    const categories = splitProductsIntoCategories(products);

    products.forEach(product => {
        categories.forEach(category => {
            if (category.name === product.category) {
                category.totalPrice += +product.price;
            }
        });
    });

    categories.forEach(category => {
        category.totalPrice = +category.totalPrice.toFixed(2);
    });

    return categories;
};
