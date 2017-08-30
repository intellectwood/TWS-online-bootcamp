let query = require('cli-interact').question;
module.exports = function transcript(students){

	let format = query('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：').split(',');
	let transcript = '成绩单\n 姓名|数学|语文|英语|编程|平均分|总分 \n========================';
	let sumarr = [] ;
	for (let A of students){
		sumarr.push(A.总分);
		let AID = A.格式.trim().split(',');
		for( let B of format ){
			console.log(B);
			if(AID[1].trim() ===  B){
				transcript += '\n' + AID[0] + '|' + A.数学 + '|' + A.语文 + '|' + A.英语 + '|' + A.编程 + '|' + A.平均分 + '|' + A.总分 ;	
			}
		}

	}
	let sum = sumarr.reduce((x, y) => x + y);
	let median = 0 ;
	if(sumarr.length % 2 === 0 ){
		median = (sumarr[sumarr.length / 2] + sumarr[sumarr.length / 2 - 1])/ 2 ;
	}
	else {
		median = sumarr[ Math.floor(sumarr.length / 2)];
	}

	transcript +=  '\n========================\n' + '全班总分平均分：' + String(sum / students.length)+ '\n' + '全班总分中位数：' + String(median);
	console.log(transcript);
};