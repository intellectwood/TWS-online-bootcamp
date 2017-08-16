const Person = require('./person');

class Student extends Person{
    
    constructor(name,age,clazz){
        super(name,age);
        this.clazz=clazz;
        
       // if( this.hasStudent(this.clazz) ) this.clazz=clazz;
        
    }
    hasStudent(clazz){
        if(clazz.students.includes(this)) return true;
        else return false;
    }
    introduce(){
        let stuInfo;
        if(this.hasStudent(this.clazz)){
            if(this.name===this.clazz.leader) stuInfo=super.introduce()+ ' I am a Student.'+
                        ' I am Leader of Class '+this.clazz.number+'.';
             else stuInfo=super.introduce()+' I am a Student. I am at Class '+this.clazz.number+'.';            
        }
        else stuInfo=super.introduce()+' I am a Student.'+" I haven't been allowed to join Class.";  
    
        
        console.log(stuInfo);
        return   stuInfo;
       
    }
} 


module.exports = Student;