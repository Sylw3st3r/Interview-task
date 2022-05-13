export const getData = async url => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data
 }
 
 //1. Retrieves user, product and shopping cart data
export const getAllData = async (...urls) => {
    console.time("data fetching");
     const data = await Promise.all(urls.map(url => getData(url)))
     console.timeEnd("data fetching");
     return data;
} 