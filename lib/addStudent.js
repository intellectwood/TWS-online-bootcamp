let  query  = require('readline-sync').question ;
let  student = require('./class.js');

module.exports = function addStudent (){
	let answer = query('请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：\n').split(',');
	/***对科目获取到studentsSubjects*****/
	let i, answerSubjects=answer.slice(3);//表示学科
	let studentsSubjects={'数学':0, '英语':0, '编程':0, '语文':0};
	
	answerSubjects.forEach(item=>{
	    if(item.includes('数学')) 
	          studentsSubjects['数学']=item.trim().match(/\d+/);
	    if(item.includes('英语')) 
	          studentsSubjects['英语']=item.trim().match(/\d+/);   
	    if(item.includes('编程')) 
	          studentsSubjects['编程']=item.trim().match(/\d+/);
	    if(item.includes('语文')) 
	          studentsSubjects['语文']=item.trim().match(/\d+/);   	          
	});
	/***对科目获取到studentsSubjects*****/
 	let aStudent = new student(answer[0], answer[1], answer[2], parseInt(studentsSubjects['语文']), parseInt(studentsSubjects['数学']),parseInt(studentsSubjects['英语']),parseInt(studentsSubjects['编程']));	
	console.log('学生' + answer[0] + '的成绩被添加');
	return aStudent ;
};
