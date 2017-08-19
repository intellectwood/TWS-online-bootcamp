'use strict';



module.exports = function collectSameElements(collectionA, objectB) {
    let result = [];
 
      result=collectionA.filter(item=>(objectB.value.includes(item)));
   console.log(result);

    return result;
}
