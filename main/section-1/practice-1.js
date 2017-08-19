'use strict';


module.exports = function collectSameElements(collectionA, collectionB) {
    let result = [];
    result=collectionA.filter(item=>(collectionB.includes(item)));
   console.log(result);
    return result;
}
