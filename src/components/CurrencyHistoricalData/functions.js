const objToArray = (obj) => {
    let result = [];
    for (let objKey in obj) {
        const newObj = {
            name: objKey,
            value : Object.values(obj[objKey])[0],
        }
        result.push(newObj)
    }
    return result;
}

export {objToArray}
