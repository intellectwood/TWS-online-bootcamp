'use strict';

const LongLength=1; //设定length超过多少算一个长的str

function judgeLongItem(str){
    if(str.length>LongLength) return true;
    else return false;
}

function getItemTimes(str){
    
    let result;
    if(judgeLongItem(str)){
      result= parseInt(str.replace(/[^0-9]/ig,""));
    }
    else result=1;
    
    return result;
}

function expand(collection) {
    let result = [];
    
    collection.forEach(item=>{
       let times = getItemTimes(item);
       
       while(times>0){      
        result.push(item[0]);
        times--;
       }

    });

    return result;
}

function getObjectSummary(collectionExpended){
    let result=[];
    
     result.push({key:collectionExpended[0], count:0});
   
    collectionExpended.forEach(itemStr=>{
          let flg=0;
          let count=0;
        result.forEach( itemObj=>{

           count++;
           
          if(itemObj.key==itemStr) {itemObj.count++;      flg=1;     }
          if( flg==0  && count== result.length && itemObj.key!=itemStr)  result.push({key:itemStr, count:1} );
            
         });


         
    });
    
    return result;
}


module.exports = function createUpdatedCollection(collectionA, objectB) {
   let arrC= getObjectSummary(collectionA); 
   let result=[];
 
                   
   result=arrC.map(itemObj=>{
        objectB.value.forEach(item=>{
            if(item==itemObj.key) {
                 itemObj.count =  itemObj.count  - Math.floor( itemObj.count  / 3);

            }
        });
  
        return itemObj;
    });  

         console.log(result);        

 
    return result;
}
