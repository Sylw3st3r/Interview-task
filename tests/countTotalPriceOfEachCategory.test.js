import {
    splitProductsIntoCategories,
    countTotalPriceOfEachCategory,
} from "../src/countTotalPriceOfEachCategory.js";
import { test, expect, describe } from "vitest";

const products = [
    {
        category: "Shoes",
        price: 200,
    },
    {
        category: "Shoes",
        price: 120,
    },
    {
        category: "Underwear",
        price: 30,
    },
];

describe("function - splitProductsIntoCategories", () => {
    test("Check if all categories were extracted into new data set without duplicates", () => {
        expect(splitProductsIntoCategories(products)).toEqual([
            { name: "Shoes", totalPrice: 0 },
            { name: "Underwear", totalPrice: 0 },
        ]);
    });

    test("If passed array's elements dont have category field then it should return empty array", () => {
        expect(splitProductsIntoCategories([1, 2, 3, 4])).toEqual([]);
    });
});

describe("function - countTotalPriceOfEachCategory", () => {
    test("Check if value of all categories were calculated corectl", () => {
        expect(countTotalPriceOfEachCategory(products)).toEqual([
            { name: "Shoes", totalPrice: 320 },
            { name: "Underwear", totalPrice: 30 },
        ]);
    });

    test("If price of product is of type string then it should be valid", () => {
        expect(
            countTotalPriceOfEachCategory([{ category: "Rings", price: "200" }])
        ).toEqual([{ name: "Rings", totalPrice: 200 }]);
    });
});
