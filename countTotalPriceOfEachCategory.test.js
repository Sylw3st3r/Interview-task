import { splitProductsIntoCategories, countTotalPriceOfEachCategory} from "./countTotalPriceOfEachCategory.js";
import {test, expect, describe} from "vitest"

const products = [
    {
        category: "Shoes",
        price: 200
    },{
        category: "Shoes",
        price: 120,
    },{
        category: "Underwere",
        price: 30,
    }
]

describe("function - splitProductsIntoCategories",()=>{
    test("Check if all categories were extracted into new data set, without duplicates", () => {
        expect(splitProductsIntoCategories(products)).toEqual([{name:"Shoes",totalPrice:0},{name:"Underwere",totalPrice:0}]);
    })
    
})

describe("function - countTotalPriceOfEachCategory",()=>{
    test("Check if value of all categories were calculated corectl", () => {
        expect(countTotalPriceOfEachCategory(products)).toEqual([{name:"Shoes",totalPrice:320},{name:"Underwere",totalPrice:30}]);
    })
})
