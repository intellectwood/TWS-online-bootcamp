class Class{

   constructor(number) {
     this.number=number;      
     this.leader;
     this.students=[];
    }
    appendMember(student){
        this.students.push(student);
    }
	hasStudent(student){
	 if(this.students.includes(student)) return true;
	else return false;
	}

    assignLeader(student){
        if(this.hasStudent(student)){
           this.leader=student.name;         
            return 'Assign team leader successfully.';
        }
        else return "It is not one of us.";

    }

}

module.exports =Class;