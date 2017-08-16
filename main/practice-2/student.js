const Person = require('./person');

class Student extends Person{
    
    constructor(name,age,id,clazz){
        super(name,age,id);
        this.clazz=clazz;
    }
    introduce(){
        let stuInfo;
        if(this.name===this.clazz.leader) stuInfo=super.introduce()+ ' I am a Student.'+
        ' I am Leader of Class '+this.clazz.number+'.';
        else stuInfo=  super.introduce()+' I am a Student. I am at Class '+this.clazz.number+'.';        
        
        console.log(stuInfo);
        return   stuInfo;
       
    }
} 


module.exports = Student;