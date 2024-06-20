#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

class student{
    static counter = 1522555;
    id:number;
    name:string;
    courses:string[];
    balance:number;


    constructor (name:string){
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }


    enroll_course (course:string ){
        this.courses.push(course);
    }

    view_balance (){
        console.log(chalk.blue(`Balance for ${chalk.yellow(this.name)} : ${chalk.yellow("$"+this.balance)}`))
    }


    pay_fees(amount:number){
        if(amount <= this.balance){
        this.balance -= amount;
        console.log(chalk.blue(`${chalk.yellow("$"+amount)} Fees Paid Successfully For ${chalk.yellow(this.name)}`));
        } else{
            console.log(chalk.red("Insuficient Balance :("))
        }
    }

    
    show_status(){
        console.log(chalk.green(`ID : ${chalk.yellow(this.id)}`));
        console.log(chalk.green(`Name : ${chalk.yellow(this.name)}`));
        console.log(chalk.green(`Courses : ${chalk.yellow(this.courses)}`))
        console.log(chalk.green(`Balance : ${chalk.yellow("$"+this.balance)}`))
    }

}

class student_manager{
    students:student[]

    constructor(){
        this.students = []
    }


    add_student(name:string){
        let students = new student(name);
        this.students.push(students);
        console.log(chalk.blue(`Student : ${chalk.yellow(name)} Added Successfully. Student ID : ${chalk.yellow(students.id)}`))
    }


    enroll_student(student_id:number , course:string){
        let students = this.find_student(student_id)

        if(students){
            students.enroll_course(course)
            console.log(chalk.blue(`${chalk.yellow(students.name)} Enrolled in ${chalk.yellow(course)} Successfully`))
        } else{
            console.log(chalk.red("Student not Found, Please Enter a Correct Student ID :("))
        }
    }

    pay_student_fees(student_id:number , amount:number){

        let students = this.find_student(student_id)
        if(students){
            students.pay_fees(amount)
        } else{
            console.log(chalk.red("Student not Found, Please Enter a Correct Student ID :("))
        }

    }

    show_student_status(student_id:number){
        let students = this.find_student(student_id)
    
        if(students){
            students.show_status()
        } else{
            console.log(chalk.red("Student not Found, Please Enter a Correct Student ID :("))
        }
    }

    view_student_balance(student_id:number){
        let students = this.find_student(student_id)

        if(students){
            students.view_balance()
        } else{
            console.log(chalk.red("Student not Found, Please Enter a Correct Student ID :("))
        }
    }

    find_student(student_id:number){
        return this.students.find((std) => std.id === student_id);
    }
}


async function main() {
    console.log("\n")
    console.log(chalk.yellow("--------------------- Student Management System -------------------------"));
    console.log("\n")

    let Student_manager = new student_manager()


    while(true){

        let choice = await inquirer.prompt([
            {
                name:"options",
                type:"list",
                message:"Select an Option",
                choices:["Add Student","Enroll Student","View Student Balance","Pay Fees","Show Status","Exit"]
            }
        ])

        switch(choice.options){
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name:"name",
                        type:"input",
                        message:chalk.blue("Enter a Student Name"),
                        validate: (input) => {
                            if(input.trim() === ""){
                                return chalk.red("Please Enter a Student Name!")
                            }
                            if(!(isNaN(input))){
                                return chalk.red("Enter a Valid Student Name!")
                            }
                            return true;
                        }
                    }
                ]);
                Student_manager.add_student(name_input.name)
                break;
            
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name:"student_id",
                        type:"number",
                        message:chalk.blue("Enter a Student ID"),
                    },
                    {
                        name:"course",
                        type:"input",
                        message:chalk.blue("Enter a Course Name"),
                        validate:(course) => {
                            if(course.trim() === ""){
                                return chalk.red("Please Enter a Course Name!")
                            }
                            if(!(isNaN(course))){
                                return chalk.red("Please Enter a Valid Course Name!")
                            }
                            return true;
                        }
                    }
                ]);
                Student_manager.enroll_student(course_input.student_id , course_input.course)
                break;
            

            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name:"student_id",
                        type:"number",
                        message:chalk.blue("Enter a Student ID")
                    }
                ])
                Student_manager.view_student_balance(balance_input.student_id)
                break;

            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name:"student_id",
                        type:"number",
                        message:chalk.blue("Enter a Student ID")
                    },
                    {
                        name:"amount",
                        type:"number",
                        message:chalk.blue("Enter the Amount to Pay")
                    }
                ])
                Student_manager.pay_student_fees(fees_input.student_id , fees_input.amount)
                break;

            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name:"student_id",
                        type:"number",
                        message:chalk.blue("Enter a Student ID")
                    }
                ])
                Student_manager.show_student_status(status_input.student_id)
                break;

            case "Exit":
                console.log(chalk.green("Exiting ......"))
                process.exit();
        }
    }
}

main();