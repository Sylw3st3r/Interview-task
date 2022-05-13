export const splitProductsIntoCategories = products =>{
    if(products[0]?.category){
        const categories = new Set()
        products.forEach(product => categories.add(product.category));
        const categoryDataSets = [...categories].map(category => {
            return {name:category, totalPrice: 0};
        })
        return categoryDataSets;
    }
    return [];
}
   

//2. Creates a data structure containing all available product categories and the total value of products of a given category
export const countTotalPriceOfEachCategory = products =>{
    const categories = splitProductsIntoCategories(products);
    products.forEach(product => {
        categories.forEach(category => {
            if(category.name === product.category){
                category.totalPrice+= +product.price;
            }
        })
    })
    categories.forEach(category => {
        category.totalPrice = +category.totalPrice.toFixed(2);
    })
    return categories;
}