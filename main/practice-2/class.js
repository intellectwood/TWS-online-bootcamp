class Class{

   constructor(number) {
     this.number=number;      
     this.leader;
    }
    assignLeader(student){
        this.leader=student.name;
    }

}

module.exports =Class;