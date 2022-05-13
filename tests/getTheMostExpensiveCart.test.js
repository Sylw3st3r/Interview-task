import {
    getPrice,
    getFullNameOfUser,
    getTheMostExpensiveCart,
    getTotalPriceOfCart,
} from "../src/getTheMostExpensiveCart.js";
import { test, expect, describe } from "vitest";

const users = [
    {
        id: 1,
        name: { firstname: "tom", lastname: "cat" },
    },
    {
        id: 2,
        name: { firstname: "jon", lastname: "doe" },
    },
];

const carts = [
    {
        id: 1,
        products: [
            { productId: 1, quantity: 4 },
            { productId: 2, quantity: 1 },
            { productId: 3, quantity: 6 },
        ],
        userId: 1,
    },
    {
        id: 2,
        products: [
            { productId: 1, quantity: 4 },
            { productId: 2, quantity: 1 },
        ],
        userId: 2,
    },
];

const products = [
    {
        id: 1,
        price: 109.95,
    },
    {
        id: 2,
        price: 22.3,
    },
    {
        id: 3,
        price: 55.99,
    },
];

describe("function - getPrice()", () => {
    test("Check if price of product is correct", () => {
        expect(getPrice(1, products)).toBe(109.95);
    }),
        test("Price of product that doesnt exist should be 0", () => {
            expect(getPrice(7, products)).toBe(0);
        }),
        test("Id passed as string should be valid", () => {
            expect(getPrice("1", products)).toBe(109.95);
        }),
        test("When id passed as string is equal NaN then the price should be equal 0", () => {
            expect(getPrice("gsa1", products)).toBe(0);
        }),
        test("When id isn't neither number or string then the price should be 0", () => {
            expect(getPrice({}, products)).toBe(0);
        }),
        test("When products is an array which values don't have price field then the price should be 0", () => {
            expect(getPrice({}, carts)).toBe(0);
        });
});

describe("function - getTotalPriceOfCart", () => {
    test("Check if the correct total price is calculated", () => {
        expect(getTotalPriceOfCart(carts[1], products)).toBe(462.1);
    }),
        test("When products is an array which items don't have price field then the total price should be 0", () => {
            expect(getTotalPriceOfCart(carts[1], carts)).toBe(0);
        }),
        test("When products is an array which items don't have id field then the total price should be 0", () => {
            expect(getTotalPriceOfCart(carts[1], [1, 2, 3])).toBe(0);
        }),
        test("When products is an array which items don't have id field then the total price should be 0", () => {
            expect(getTotalPriceOfCart(carts[1], [1, 2, 3])).toBe(0);
        });
});

describe("function - getFullNameOfUser", () => {
    test("Check if the correct name is found", () => {
        expect(getFullNameOfUser(1, users)).toEqual({
            firstname: "tom",
            lastname: "cat",
        });
    }),
        test("When products is an array which items don't have name field then the firstname and lastname should be unknown", () => {
            expect(getFullNameOfUser(1, carts)).toEqual({
                firstname: "unknown",
                lastname: "unknown",
            });
        }),
        test("Id passed as string should be valid", () => {
            expect(getFullNameOfUser("1", users)).toEqual({
                firstname: "tom",
                lastname: "cat",
            });
        }),
        test("When id passed as string is equal NaN then the firstname and lastname should be unknown", () => {
            expect(getFullNameOfUser("1sda", users)).toEqual({
                firstname: "unknown",
                lastname: "unknown",
            });
        }),
        test("When id isn't neither number or string then the firstname and lastname should be unknown", () => {
            expect(getFullNameOfUser({}, users)).toEqual({
                firstname: "unknown",
                lastname: "unknown",
            });
        });
});

describe("function - getTheMostExpensiveCart", () => {
    test("Find corectly the most expensive cart", () => {
        expect(getTheMostExpensiveCart(users, carts, products)).toEqual({
            cart: carts[0],
            user: users[0].name,
            totalPrice: 798.04,
        });
    });
});
