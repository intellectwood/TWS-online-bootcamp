'use strict';

function compare_collections(collection_a, collection_b) {
 let i;
 if (collection_a.length!=collection_b.length) return false;
 
 else{
     for(i=0;i<collection_a.length;i++){
         if (collection_a[i]!=collection_b[i]) return false;
     }
     return true;
 }
 
}

module.exports = compare_collections;


