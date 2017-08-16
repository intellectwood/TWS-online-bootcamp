const Person = require('./person');

class Student extends Person{
    
    constructor(name,age,clazz){
        super(name,age);
        this.clazz=clazz;
    }
    introduce(){
        
        return   super.introduce()+' I am a Student. I am at Class '+this.clazz+'.';
       
    }
} 


module.exports = Student;