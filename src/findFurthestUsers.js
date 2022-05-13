//Haversine formula
export const getDistance = (A, B) => {
    const R = 6371.008; // Radius of the Earth in Km
    const rlat1 = A.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = B.lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (B.long - A.long) * (Math.PI / 180); // Radian difference (longitudes)

    const d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                        Math.cos(rlat2) *
                        Math.sin(difflon / 2) *
                        Math.sin(difflon / 2)
            )
        );
    return +d.toFixed(2);
};

export const getAllUserDistanceCombinations = users => {
    const allCombinations = [];

    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            const user1 = users[i];
            const user2 = users[j];
            const A = user1.address.geolocation;
            const B = user2.address.geolocation;

            const combination = {
                user1: user1,
                user2: user2,
                distance: getDistance(A, B),
            };
            allCombinations.push(combination);
        }
    }

    return allCombinations;
};

//4. Finds the two users living furthest away from each other
export const findFurthestUsers = users => {
    const allCombinations = getAllUserDistanceCombinations(users);

    const furthestPar = allCombinations.reduce(
        (previousValue, currentValue) => {
            return currentValue.distance > previousValue.distance
                ? currentValue
                : previousValue;
        }
    );

    return furthestPar;
};
