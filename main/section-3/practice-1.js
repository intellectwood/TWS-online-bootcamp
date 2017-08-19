'use strict';


module.exports = function createUpdatedCollection(collectionA, objectB) {
    let result = [];

    result=collectionA.map(itemObj=>{
        objectB.value.forEach(item=>{
            if(item==itemObj.key) itemObj.count--;
        });
        return itemObj;
    });
    
    console.log(result);

    return result;
}
