export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function getSequentialRandonLength(minSequentialLength = 1, maxSequentialLength = 10) {

    

    const sequential = [];
    
    for(let i = 0; i < maxSequentialLength; i++){
        sequential.push(i + 1 );
    }

    const randomValue = getRandomArbitrary(minSequentialLength, sequential.length);
    return sequential.slice(0, Math.round(randomValue));
}