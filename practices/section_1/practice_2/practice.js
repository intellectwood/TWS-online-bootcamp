function collect_same_elements(collection_a, collection_b) {
  let collection_intersected=[];
  
  for(let item_a of collection_a){
      for(let item_b of collection_b[0]){
          if(item_b==item_a)  collection_intersected.push(item_a);
      }  
  }
  return collection_intersected;
}

module.exports = collect_same_elements;
