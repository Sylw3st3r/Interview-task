import { getDistance, getAllUserDistanceCombinations, findFurthestUsers} from "./findFurthestUsers.js";
import {test, expect, describe} from "vitest"


describe("function - getDistance",()=>{

    const a = {
        lat: "-37.3159",
        long: "81.1496"
    }
    const b = {
        lat: "40.3467",
        long: "-40.1310"
    }

    test("Check if distance equals 0 when both points are in the same lat and long", () => {
        expect(getDistance(a,a)).toBe(0);
    })
    
    test("Check if correct distance is found", () => {
        expect(getDistance(a,b)).toBe(15012.08); 
    })
})

const user1 = {
    address: {geolocation: {lat: "-37.3159", long: "81.1496"}, city: 'kilcoole', street: 'new road', number: 7682, zipcode: '12926-3874'},
    email: "john@gmail.com",
    id: 1,
    name: {firstname: 'john', lastname: 'doe'},
    password: "m38rmF$",
    phone: "1-570-236-7033",
    username: "johnd",
}
const user2 = {
    address: {geolocation: {lat: "-37.3159", long: "81.1496"}, city: 'Cullman', street: 'Frances Ct', number: 86, zipcode: '29567-1452'},
    email: "kevin@gmail.com",
    id: 3,
    name: {firstname: 'kevin', lastname: 'ryan'},
    password: "kev02937@",
    phone: "1-567-094-1345",
    username: "kevinryan",
}
const user3 = {
    address: {geolocation: {lat: "-37.3159", long: "81.1496"}, city: 'Cullman', street: 'Frances Ct', number: 86, zipcode: '29567-1452'},
    email: "jimmie@gmail.com",
    id: 10,
    name: {firstname: 'jimmie', lastname: 'klein'},
    password: "klein*#%*",
    phone: "1-104-001-4567",
    username: "jimmie_k",
}

const user4 = {
    address: {geolocation: {lat: "40.3467",long: "-40.1310" }, 
    city: 'Cullman', street: 'Frances Ct', number: 86, zipcode: '29567-1452'},
    email: "jimmie@gmail.com",
    id: 10,
    name: {firstname: 'jimmie', lastname: 'klein'},
    password: "klein*#%*",
    phone: "1-104-001-4567",
    username: "jimmie_k",
}

describe("function - getAllUserDistanceCombinations",()=>{
    
    test("Check if all posible combinations are created", () => {
        const allCombinations =[{user1:user1, user2:user2, distance:0}, {user1:user1, user2:user3, distance:0}, {user1:user2, user2:user3, distance:0}]
        expect(getAllUserDistanceCombinations([user1,user2,user3])).toEqual(allCombinations);
    })

    test("Passing empty array or array with only one value returns empty array",()=>{
        expect(getAllUserDistanceCombinations([])).toEqual([]);
    })

    test("Passing empty array or array with only one value returns empty array",()=>{
        expect(getAllUserDistanceCombinations([user2])).toEqual([]);
    })
})

describe("function - findFurthestUsers",()=>{
    test("Check if finds the furthest par of users",()=>{
        const users =[user1,user2,user3,user4]
        expect(findFurthestUsers(users)).toEqual({user1:user1, user2:user4, distance:15012.08})
    })
   
})

