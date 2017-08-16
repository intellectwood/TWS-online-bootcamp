const Person = require('./person');

class Teacher extends Person{
    
    constructor(name,age,id,classes){
        super(name,age,id);
        this.classes=[];
        this.classes=classes;
    }
    introduce(){
        let teacherInfo;
        
        if(this.classes==null) teacherInfo=super.introduce()+ ' I am a Teacher. I teach No Class.';
        else {
            let classesArr=[];
            for(let item of this.classes) classesArr.push(item.number);
            teacherInfo=super.introduce()+ ' I am a Teacher. I teach Class '+classesArr.join(',')+'.';
        }     
        
        console.log(teacherInfo);
        return   teacherInfo;
       
    }
} 


module.exports = Teacher;