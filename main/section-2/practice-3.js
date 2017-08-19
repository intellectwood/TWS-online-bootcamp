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
    
    result.push({name:collectionExpended[0], summary:0});
   
    collectionExpended.forEach(itemStr=>{
          let flg=0;
          let count=0;
        result.forEach( itemObj=>{

           count++;
           
          if(itemObj.name==itemStr) {itemObj.summary++;      flg=1;     console.log(itemObj.summary);}
          if( flg==0  && count== result.length && itemObj.name!=itemStr)  result.push({name:itemStr, summary:1} );
            
         });


         
    });
    
    return result;
}

module.exports = function countSameElements(collection) {
   let collectionExpended=[];
   let result=[];
    
    
   collectionExpended= expand(collection);
 
   result=   getObjectSummary(collectionExpended);
    console.log(result);


    
    return result;
}
