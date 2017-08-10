const barCodeStrTable=[
'||:::', //0
':::||', //1
'::|:|', //2
'::||:', //3
':|::|', //4
':|:|:', //5
':||::', //6
'|:::|', //7
'|::|:', //8
'|:|::', //9
];
/* #0 根据输入字符串，判断是邮政编码还是条码
 * 输入：input:String 例如"88595-0001" or "| |::|: |::|: :|:|: |:|:: :|:|: ||::: ||::: ||::: :::|| |"
 * 处理：judgeCodeType()
 * 输出：codeType:String 两种情况：barCode or ZIPCode
         
 */
function judgeCodeType(input){
	let codeType;

	if(input.charAt(0)<="9" && input.charAt(0)>="0"){
	   codeType='ZIPCode';
	}

	
	else{
	codeType="barCode";
		
	}

	return codeType;
}
/* #1.1 输入字符串表示邮政编码，输出一个数组保存每位数字（若其中有'-'要剔除掉）
 * 输入：input:String 例如"88595-0001"
 * 处理：inputToZIPCodeNumArray()
 * 输出：ZIPCodeNumArray:[number]
 */
function inputToZIPCodeNumArray(input){
	let strArr=[];
	let ZIPCodeNumArray=[];

	strArr=input.split("");

	for(let item of strArr){
		if(item!="-"){
		ZIPCodeNumArray.push(parseInt(item));
		}
	}
	return ZIPCodeNumArray;
}
/* #1.2 根据邮政编码数字数组，输出一个数组保存每位数字对应的barCode
 * 输入：ZIPCodeNumArray:[number]
 * 处理：ZIPToBarCodeStrArray()
 * 输出：barCodeStrArray:[String]
 */
function ZIPToBarCodeStrArray(ZIPCodeNumArray){

	let barCodeStrArray=[];

	
	for(let item of ZIPCodeNumArray){
		
		barCodeStrArray.push(barCodeStrTable[item]);
		
	}
	return barCodeStrArray;
}


/* #1.3 得到barCodeInfo用于后面的打印
 * 输入：barCodeStrArray:[String]
 * 处理：getBarCodeInfo()
 * 输出：barCodeInfo:String
        格式:"| |::|: |::|: :|:|: |:|:: :|:|: ||::: ||::: ||::: :::|| |"
 */

function getBarCodeInfo(barCodeStrArray)
{
	let barCodeInfo='';

    
	barCodeInfo="| ";

	for(let item of barCodeStrArray){
	barCodeInfo+=item + " ";
	}
	barCodeInfo+="|";
	
	
	
	return barCodeInfo;
}
/* #2.1 输入字符串表示条码编码，输出一个数组保存每位条码（' '要剔除掉）
 * 输入：input:String 例如 "| |::|: |::|: :|:|: |:|:: :|:|: ||::: ||::: ||::: :::|| |"
 * 处理：inputToBarCodeStrArray()
 * 输出：barCodeStrArray:[String]
 */
function inputToBarCodeStrArray(input){
	let strArr=[];
	let barCodeStrArray=[];

    strArr=input.split(" ");

	for(let item of strArr){
		if(item!="|"){
		barCodeStrArray.push(item);
		}
	}
	
	return barCodeStrArray;
}
/* #2.2 根据条码编码字符数组，输出一个数组保存每位条码对应的ZIPCode
 * 输入：barCodeStrArray:[String]
 * 处理：barToZIPCodeNumArray()
 * 输出：ZIPCodeNumArray:[number]
 */
function barToZIPCodeNumArray(barCodeStrArray){

	let ZIPCodeNumArray=[];
	let i;
	
	for(let item of barCodeStrArray){
		for(i=0;i<barCodeStrTable.length;i++){
			if(item == barCodeStrTable[i])
				ZIPCodeNumArray.push(i); 
		}
		
	}
	return ZIPCodeNumArray;
}


/* #2.3 得到ZIPCodeInfo用于后面的打印
 * 输入：ZIPCodeNumArray:[number]
 * 处理：getZIPCodeInfo()
 * 输出：ZIPCodeInfo:String
        格式:"88595-0001"
 */

function getZIPCodeInfo(ZIPCodeNumArray)
{
	let ZIPCodeInfo='';

    
	for(i=0;i<ZIPCodeNumArray.length;i++){
		if(ZIPCodeNumArray.length>6){
			if(i == 5) ZIPCodeInfo+="-";
		}

		ZIPCodeInfo+=ZIPCodeNumArray[i];
	}
	
	
	
	
	return ZIPCodeInfo;
}





/* #3 打印
 * 输入：result:String
 * 处理：print()
 * 输出：result:String
 */

function print(result)
{
	console.log(result); 
	return result;
}

function main(input){
    let result;
    let ZIPCodeNumArray;
    let barCodeStrArray;
    let barCodeInfo;
    let ZIPCodeInfo;
    let codeType='';
    codeType=judgeCodeType(input);  
    
    if(codeType=='barCode'){
   	    barCodeStrArray=inputToBarCodeStrArray(input);
   	    ZIPCodeNumArray=barToZIPCodeNumArray(barCodeStrArray);
   	    ZIPCodeInfo=getZIPCodeInfo(ZIPCodeNumArray);
   	    result=print(ZIPCodeInfo);
	}
    if(codeType=='ZIPCode'){
   	    ZIPCodeNumArray=inputToZIPCodeNumArray(input);
   	    barCodeStrArray=ZIPToBarCodeStrArray(ZIPCodeNumArray);
   	    barCodeInfo=getBarCodeInfo(barCodeStrArray);
   	    result=print(barCodeInfo);
	}
    

	
	return result;
    
}

module.exports = main;
