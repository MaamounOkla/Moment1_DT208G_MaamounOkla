let age: number = 29;
let lastName: string = "Okla";
const isStudent : boolean = true;




// console.log(age);
// console.log(fname);
let num1 : number = 2;
let num2 : number =  4;
function summ(num1 :number , num2 :number): number  {
     return num1 + num2;
}
 
 
console.log(summ(num1, num2));



// loop
let arr = ["jag" , "du", "hon"];

arr.forEach(element => {
    console.log(element);
});

//obj
let person = {
    fname: "okla",
    age: 25,
    yrke: "svetsare"
}
console.log(person);

//Enums 
enum staff {
    Sara, 
    Ahmad, 
    Abbas, 
    Niklas,

}
let chef : staff = staff.Abbas;
console.log(chef);
//TypeScript interface
interface Salary {
    staffName: string;
    amount: number; 

}
// Skapa ett objekt som kan ta emot Salary. 
const staffSalary: Salary = {
    staffName: "Okla",
    amount: 25000
}
function getSalary(salary: Salary) : void{
    console.log(salary.staffName);
    console.log(salary.amount);
}
//Anropa funktionen, passera ner objektet. 
getSalary(staffSalary);