/* #1 输入数字表示有多少瓶酒，得到输出字符串表示酒的消耗过程
 * 输入：input:number
 * 处理：getLyricsBottleShrinken()
 * 输出：LyricsBottleShrinken:String
 */

function getLyricsBottleShrinken(input){
	let times=input;
	let LyricsBottleShrinken='';
	
	if(times<=1) return "";
		
	while(times > 1){
	    if(times >2){
		LyricsBottleShrinken+=times+" bottles of beer on the wall, "+times+" bottles of beer.\n"+
		"Take one down and pass it around, "+(times-1)+" bottles of beer on the wall.\n";
        }
        else{
		LyricsBottleShrinken+=times+" bottles of beer on the wall, "+times+" bottles of beer.\n"+
		"Take one down and pass it around, "+(times-1)+" bottle of beer on the wall.\n";
        }	
	   times--;
	}
	
	return LyricsBottleShrinken;
}
/* #2 补充LyricsBottleShrinken，得到整个lyrics
 * 输入：LyricsBottleShrinken:String input:number
 * 处理：getFullLyrics()
 * 输出：LyricsInfo:String
 */

function getFullLyrics(LyricsBottleShrinken,input){

	let LyricsLastParts="";
	let LyricsInfo='';
	
	if(input == 0) LyricsLastParts='No bottles of beer on the wall.'
	else {
		if(input>1) {
			LyricsLastParts=`1 bottle of beer on the wall, 1 bottle of beer.
Take one down and pass it around, no more bottles of beer on the wall.
No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, `+input+' bottles of beer on the wall.';
		}
		else{
			LyricsLastParts=`1 bottle of beer on the wall, 1 bottle of beer.
Take one down and pass it around, no more bottles of beer on the wall.
No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, `+input+' bottle of beer on the wall.';		
		}
	}
	
	LyricsInfo=LyricsBottleShrinken+LyricsLastParts;
	return LyricsInfo;
}
function main(input){
    let result;
 
    
    let LyricsBottleShrinken=getLyricsBottleShrinken(input);   
    let LyricsInfo=getFullLyrics(LyricsBottleShrinken,input);
    
    result=LyricsInfo;
    console.log(result);
    return result;
}

module.exports = main;
