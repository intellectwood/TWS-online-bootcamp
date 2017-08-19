'use strict';



module.exports = function collectSameElements(collectionA, objectB) {
    let result = [];
    
    result=collectionA.filter(item=>(objectB.value.includes(item.key)));
    result=result.map(item=>item.key);
    console.log(result);
    return result;
}
