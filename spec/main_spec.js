

"use strict";

var main = require("../lib/main.js");


describe("xxx.", function(){


 

    it("输入中国条码邮编 | ||::: ::|:| :::|| ||::: ||::: ||::: |（内蒙古 > 海拉尔区 > 爱民路等）：", function(){
        console.log("输入中国邮编 | ||::: ::|:| :::|| ||::: ||::: ||::: |（内蒙古 > 海拉尔区 > 爱民路等）\n输出：");
        var input='| ||::: ::|:| :::|| ||::: ||::: ||::: |';
        var result = main(input);
        var expect_string ='021000';
        

        expect(expect_string).toEqual(result);
    });
   
});