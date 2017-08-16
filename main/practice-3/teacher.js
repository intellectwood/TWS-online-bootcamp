const Person = require('./person');

class Teacher extends Person{
    
    constructor(name,age,classes){
        super(name,age);
        this.classes=[];
        this.classes=classes;
    }
    isTeaching(student){
        for(let item of this.classes){
            if(item.students.includes(student)) return true;
        }
        return false;
    }

    notifyStudentAppended(){
        let stuNotice=[];
        for(let itemClazz of this.classes){
            if(itemClazz.students.length>=1) {
                for(let itemStu of  itemClazz.students){
                    stuNotice.push('I am '+this.name+'. I know '+itemStu.name+' has joined Class '+itemClazz.number+'.');
                }
            }
        }
        console.log(stuNotice.join('\n'));
        return (stuNotice.join('\n'));
    }
    notifyLeaderAssigned(){
        let leaderNotice=[];
        for(let itemClazz of this.classes){
            if( itemClazz.students.length>=1) {
                for(let itemStu of  itemClazz.students){
                    if(itemStu.name==itemClazz.leader)
                    leaderNotice.push('I am '+this.name+'. I know '+itemStu.name+' become Leader of Class '+itemClazz.number+'.');
                }
            }
        }   
        console.log(leaderNotice.join('\n'));
         return leaderNotice.join('\n');   
    }
    introduce(){
        let teacherInfo;
        
        if(this.classes.length<1) teacherInfo=super.introduce()+ ' I am a Teacher. I teach No Class.';
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