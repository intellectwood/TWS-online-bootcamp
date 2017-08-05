const loadAllItemsDatbase= require('./items.js');
const loadPromotionsDatbase= require('./promotions.js');
let allItemsArray=loadAllItemsDatbase.loadAllItems();
let promotionsArray=loadPromotionsDatbase.loadPromotions();

/* #1 根据待售商品列表，将输入信息变成购买商品数组
 * 输入：inputs:[String]
 *       allItemsArray:[{id:String, name:String, price:number}]
 * 处理：getItemArray()
 * 输出：ItemArray:[{id:String, name:String, price:number, nums:number, totalPrice:number}]
 */
function getItemArray(inputs,allItemsArray){
    
    let ItemArray=[];
    
    for (let itemInputs of inputs){
        
        let temp=itemInputs.split(" x ");   
        if(temp.length>1){
           ItemArray.push({id:temp[0], nums:temp[1]}); 
        }
    }
   for(let item of ItemArray){
        for(let itemFromAll of allItemsArray){
        if(item.id == itemFromAll.id) {
            item.name = itemFromAll.name;
            item.price = itemFromAll.price;
            
            item.totalPrice = item.price*item.nums;  
            
        }
     }
     
   }

    return ItemArray;
}
/* #2 根据购买商品列表和优惠方式列表,输出优惠方案
 * 输入：ItemArray:[{id:String, name:String, price:number, nums:number, totalPrice:number}]
 *       promotionsArray:[{type:String}, {type:String, item:[String]}]
 * 处理：choosePromotion()
 * 输出：
         PromotionPlan:{type:String, planTwoIitemsStr:String, finalPlanCutted:number}
                  type--'满30减6元'
                        '指定菜品半价'
                        'NO DISCOUNT'      
 */
function choosePromotion(ItemArray, promotionsArray){
    
    
    let ItemArrayPromoted=ItemArray;
    let totalPrice=0;   
    let planOneDiscount=0;//所有加在一起满30减6
    let planTwoDiscount=0;//'ITEM0001', 'ITEM0022'半价

    let PromotionPlan={};//记得初始化
    PromotionPlan.planTwoIitemsStr='';
 
    for (let item of ItemArray){
     
         totalPrice+=item.totalPrice;
         for(let itemProTwo of promotionsArray[1].items){
             if(item.id==itemProTwo) {
    	       planTwoDiscount+=(item.totalPrice/2);
    	       PromotionPlan.planTwoIitemsStr+=(item.name)+'，';
    	       //console.log(PromotionPlan.planTwoIitemsStr);
    	       }
         }
     }
     let str=PromotionPlan.planTwoIitemsStr;
    PromotionPlan.planTwoIitemsStr = str.substring(0,str.length-1);
    
	if(totalPrice>30) planOneDiscount=6;
	else planOneDiscount=0;

    if(planOneDiscount==0 && planTwoDiscount==0){
		PromotionPlan.type='NO DISCOUNT';
		PromotionPlan.finalPlanCutted=0;		
	} 
	if(planOneDiscount>=planTwoDiscount && planOneDiscount!=0){
		PromotionPlan.type='满30减6元';
		PromotionPlan.finalPlanCutted=planOneDiscount;

	} 
    if(planTwoDiscount>planOneDiscount){
		PromotionPlan.type='指定菜品半价';
		PromotionPlan.finalPlanCutted=planTwoDiscount;
	}  



    return PromotionPlan;
}
/* #3 根据购买商品列表和优惠方案,得出recieptStr
 * 输入：ItemArray:[{id:String, name:String, price:number, nums:number, totalPrice:number}]
         PromotionPlan:{type:String, planTwoIitemsStr:String, finalPlanCutted:number}
       
 * 处理：getRecieptStr()
 * 输出：recieptStr:String
示例：
`============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`    
 */

function getRecieptStr(ItemArray, PromotionPlan){
    let recieptStr;
    let ItemArrayStr='';
    let PromotionPlanStr='';
    let totalPriceCutted=0;

    for(let item of ItemArray){
		ItemArrayStr+=item.name+' x '+item.nums+' = '+ item.totalPrice+'元\n';
		totalPriceCutted+=item.totalPrice;
	} 
	totalPriceCutted-=PromotionPlan.finalPlanCutted;

	if(PromotionPlan.type=='满30减6元')
	{
		PromotionPlanStr=PromotionPlan.type+'，'+'省'+PromotionPlan.finalPlanCutted+'元\n';

	}
	if(PromotionPlan.type=='指定菜品半价')
	{
		PromotionPlanStr=PromotionPlan.type+'('+PromotionPlan.planTwoIitemsStr+')，'+'省'+PromotionPlan.finalPlanCutted+'元\n';
	}


	if(PromotionPlan.type!='NO DISCOUNT'){
	recieptStr='============= 订餐明细 =============\n'+
	ItemArrayStr	+'-----------------------------------\n'+
	'使用优惠:\n'+PromotionPlanStr+
	'-----------------------------------\n总计：'+totalPriceCutted+'元\n'+
	'==================================='
	}
	else{
	recieptStr='============= 订餐明细 =============\n'+
	ItemArrayStr	+'-----------------------------------\n'+
	'总计：'+totalPriceCutted+'元\n'+
	'==================================='
	}


    return recieptStr;
}


function bestCharge(selectedItems) {
  

   let ItemArray=getItemArray(selectedItems, allItemsArray);
   let PromotionPlan=choosePromotion(ItemArray, promotionsArray);
   let test=getRecieptStr(ItemArray, PromotionPlan);
   console.log(test);
    
  return test;
}
module.exports = bestCharge;