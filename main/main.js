const datbase= require('./datbase.js');
var loadAllItems=datbase.loadAllItems;
var loadPromotions=datbase.loadPromotions;
var discountAtNum=3;

/* #0 根据输入的条码，得到标准的标签数组，即不用在条码后面+‘_number’的形式表示数量
 * 输入：inputs:[String]
 * 处理：getStdBarCode()
 * 输出：barCodeArray:[String]
 */
function getStdBarCode(inputs){
    let barCodeArray=[];
    
    for (let item of inputs){
        
        let temp=item.split("-");
        
        if(temp.length>1){
            let times=temp[1];
            while(times>0){barCodeArray.push(temp[0]); times--;}
        }
        else barCodeArray.push(item);
    }
    return barCodeArray;
}
/* #1 根据输入的条码，得到购买商品的部分属性包括barcode、nums
 * 输入：barCodeArray:[String]
 * 处理：getItemBuyedArr()
 * 输出：itemBuyedArr:[{barcode:String, nums:number}]
 */
function getItemBuyedArr(barCodeArray){
    let itemBuyedArr=[];
    let flg;
    
    for(let itemBar of barCodeArray){
        flg=0;
        for(let item of itemBuyedArr){
            if(item.barcode==itemBar) {item.nums++;flg=1;}
        }
        if(flg==0) itemBuyedArr.push({barcode:itemBar, nums:1});
        
    }
    return itemBuyedArr;
}

/* #2 根据商城的所有商品信息，补充购买商品的部分属性包括name、unit、unitPrice、totalPrice
 * 输入：itemBuyedArr:               [{barcode:String, nums:number}],
         allItemsArray=loadAllItems():[ item1, item2, item3, ..., itemN ]
          itemx:      
         {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        }
 * 处理：addAtributeItemBuyedArr()
 * 输出：itemBuyedArrAdded:[{barcode:String, nums:number,name: String, unit: String,unitPrice: number,totalPrice: number}]
 */
function addAtributeItemBuyedArr(itemBuyedArr){
    
    let itemBuyedArrAdded=itemBuyedArr;
    let allItemsArray =loadAllItems();
    
    for(let itemBuyed of itemBuyedArrAdded){
        for (let itemFromAll of allItemsArray){
            if(itemFromAll.barcode==itemBuyed.barcode){
                itemBuyed.name=itemFromAll.name;
                itemBuyed.unit=itemFromAll.unit;
                itemBuyed.unitPrice=itemFromAll.price;
                itemBuyed.totalPrice=itemFromAll.price  * itemBuyed.nums ;
                break;
            }
        }

    }
    
    return itemBuyedArrAdded;
    
}

/* #3 根据商城的营销商品列表、购买商品列表，输出赠送商品列表
 * 输入：itemBuyedArrAdded:[{barcode:String, nums:number,name: String, unit: String,unitPrice: number,totalPrice: number}],
         promotionsObj=loadPromotions():{type:String, barcodes:[String]}
 
        {
            type: 'BUY_THREE_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
 * 处理：getItemDiscountArr()
 * 输出：itemDiscountArr:[{barcode:String, name:String, nums:number, unit:String, totalPrice:number}]
 *      
 */
function getItemDiscountArr(itemBuyedArrAdded){
 
    let promotionsObj=loadPromotions();
    let itemDiscountArr=[];
    
    for(let itemBuyed of itemBuyedArrAdded){
        for (let barcodePromoted of promotionsObj[0].barcodes){
            if(itemBuyed.barcode==barcodePromoted){
                if(itemBuyed.nums>=discountAtNum){
                    let discountNums=parseInt(itemBuyed.nums/discountAtNum);
                    itemDiscountArr.push({barcode:barcodePromoted, name:itemBuyed.name, 
                        nums:discountNums, unit: itemBuyed.unit,
                        totalPrice:discountNums*itemBuyed.unitPrice,
                        });
                    
                }
            }
        }
    }
    return itemDiscountArr;
}

/* #4 根据商城的营销商品列表，修改购买商品的部分属性包括totalPrice;
 * 输入：itemBuyedArrAdded:[{barcode:String, nums:number,name: String, unit: String,unitPrice: number,totalPrice: number}],
         promotionsObj=loadPromotions():{type:String, barcodes:[String]}
 
        {
            type: 'BUY_THREE_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }        
 * 处理：printReciept()
 * 输出：itemBuyedArrPromoted:[{barcode:String, nums:number,name: String, unit: String,unitPrice: number,totalPrice: number}]
 *     
 */
function getItemBuyedArrPromoted(itemBuyedArrAdded){
    let itemBuyedArrPromoted=itemBuyedArrAdded;
    let promotionsObj=loadPromotions();
    
    for(let itemBuyed of itemBuyedArrPromoted){
        for (let barcodePromoted of promotionsObj[0].barcodes){
            if(itemBuyed.barcode==barcodePromoted){
                if(itemBuyed.nums>=discountAtNum){
                    let discountNums=parseInt(itemBuyed.nums/discountAtNum);
                    itemBuyed.totalPrice-=discountNums*itemBuyed.unitPrice;   
                }
            }
        }
    }
    return itemBuyedArrPromoted;
}

/* #5 根据商城的赠送商品列表，考虑了营销的商品列表;
 * 输入：itemBuyedArrPromoted:[{barcode:String, nums:number,name: String, unit: String,unitPrice: number,totalPrice: number}]
         itemDiscountArr:[{barcode:String, name:String, nums:number, unit:String, totalPrice:number}]
 * 处理：printReciept()
 * 输出：   expectText:String
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';
 */
function printReciept(itemDiscountArr ,itemBuyedArrPromoted)
{

    let totalPrice=0;
    let discountPrice=0;
    let itemDiscountArrInfo="";
    let itemBuyedArrPromotedInfo="";
    let str;
    
    for(let itemBuyed of itemBuyedArrPromoted){
	itemBuyedArrPromotedInfo+=("名称："+itemBuyed.name+
    "，数量："+itemBuyed.nums+itemBuyed.unit+
    "，单价："+itemBuyed.unitPrice.toFixed(2).toString()+
    "(元)，小计："+itemBuyed.totalPrice.toFixed(2).toString()+"(元)\n");
	totalPrice+=itemBuyed.totalPrice;
    }
    
    for(let itemDiscount of itemDiscountArr){
	itemDiscountArrInfo+=("名称："+itemDiscount.name+
    "，数量："+itemDiscount.nums+itemDiscount.unit+"\n" );
	discountPrice+= (itemDiscount.totalPrice); 
    }
    /*
      console.log(itemBuyedArrPromotedInfo);   
      console.log(itemDiscountArrInfo); 
      console.log(totalPrice);  
      console.log(discountPrice); 
      */
 str= '***<没钱赚商店>购物清单***\n' +
	itemBuyedArrPromotedInfo+
	'----------------------\n' +
      '挥泪赠送商品：\n' +
	itemDiscountArrInfo+
	'----------------------\n' +
      '总计：'+totalPrice.toFixed(2)+'(元)\n' +
      '节省：'+discountPrice.toFixed(2)+'(元)\n' +
      '**********************';	
 
  
    console.log(str);

}


module.exports = function printInventory(inputs) {
   
   

    let barCodeArray=getStdBarCode(inputs);
    let itemBuyedArr=getItemBuyedArr(barCodeArray);
    let itemBuyedArrAdded=addAtributeItemBuyedArr(itemBuyedArr);
    let itemDiscountArr=getItemDiscountArr(itemBuyedArrAdded);
    let itemBuyedArrPromoted=getItemBuyedArrPromoted(itemBuyedArrAdded);
    
    printReciept(itemDiscountArr, itemBuyedArrPromoted);
    
  //  let printStuff=itemBuyedArrPromoted[0].totalPrice;
   // console.log(expectText);
   // console.log(printStuff);
   // console.log(itemBuyedArrAdded[0].name);
    
  //  return printStuff;
};