

"use strict";

var main = require("../lib/main.js");


describe("With given ZIP code,outputing bar code.", function(){


    it("输入中国邮编 021000（内蒙古 > 海拉尔区 > 爱民路等）：", function(){
        console.log('输入中国邮编 021000（内蒙古 > 海拉尔区 > 爱民路等）\n输出(最后一位是校验码)：');
        var input='021000';
        var result = main(input);
        var expect_string ='| ||::: ::|:| :::|| ||::: ||::: ||::: |:::| |';
        

        expect(expect_string).toEqual(result);
    });

      
    it("输入美国邮编 88595-0001(O BOX,EL PASO,El Paso,Texas)：", function(){
        console.log('输入美国邮编 88595-0001(O BOX,EL PASO,El Paso,Texas)\n输出(最后一位是校验码)：');
        var input='88595-0001';
        var result = main(input);
        var expect_string ="| |::|: |::|: :|:|: |:|:: :|:|: ||::: ||::: ||::: :::|| :|::| |";
        
        expect(expect_string).toEqual(result);
    });
    
    it("输入美国条码邮编 "+'| |::|: |::|: :|:|: |:|:: :|:|: ||::: ||::: ||::: :::|| |'+"(O BOX,EL PASO,El Paso,Texas)：", function(){
        console.log('输入美国邮编  | |::|: |::|: :|:|: |:|:: :|:|: ||::: ||::: ||::: :::|| | (O BOX,EL PASO,El Paso,Texas)\n输出：');
        var input="| |::|: |::|: :|:|: |:|:: :|:|: ||::: ||::: ||::: :::|| |";
        var result = main(input);
        var expect_string ="88595-0001";
        
        expect(expect_string).toEqual(result);
    }); 

    it("输入中国条码邮编 | ||::: ::|:| :::|| ||::: ||::: ||::: |（内蒙古 > 海拉尔区 > 爱民路等）：", function(){
        console.log("输入中国邮编 | ||::: ::|:| :::|| ||::: ||::: ||::: |（内蒙古 > 海拉尔区 > 爱民路等）\n输出：");
        var input='| ||::: ::|:| :::|| ||::: ||::: ||::: |';
        var result = main(input);
        var expect_string ='021000';
        

        expect(expect_string).toEqual(result);
    });
   
});
