module.exports = class student{
	constructor(Name, ID, Class, Chinese, Math, English, programming){
		this.格式 = Name + ',' + ID + ',' + Class;
		this.语文 = Chinese ;
		this.数学 = Math    ;
		this.英语 = English ;
		this.编程 = programming ;
		this.平均分 = Number(((this.语文 + this.数学 + this.英语 + this.编程) / 4).toFixed(1));
		this.总分 = this.语文 + this.数学 + this.英语 + this.编程;
	}
};