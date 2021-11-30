// abstract class Employee {
//     constructor(private firstName: string, private lastName: string) {
//     }
//     abstract getSalary(): number
//     get fullName(): string {
//         return `${this.firstName} ${this.lastName}`;
//     }
//     compensationStatement(): string {
//         return `${this.fullName} makes ${this.getSalary()} a month.`;
//     }
// }

// class FullTimeEmployee extends Employee {
//     constructor(firstName: string, lastName: string, private salary: number) {
//         super(firstName, lastName);
//     }
//     getSalary(): number {
//         return this.salary;
//     }
// }

// class Contractor extends Employee {
//     constructor(firstName: string, lastName: string, private rate: number, private hours: number) {
//         super(firstName, lastName);
//     }
//     getSalary(): number {
//         return this.rate * this.hours;
//     }
// }

// let john = new FullTimeEmployee('John', 'Doe', 12000);
// let jane = new Contractor('Jane', 'Doe', 100, 160);

// console.log(john.compensationStatement());
// console.log(jane.compensationStatement());

// John Doe makes 12000 a month.
// Jane Doe makes 16000 a month.

const amountDOM: HTMLInputElement = <HTMLInputElement>document.getElementById("amount");
const percentDOM: HTMLInputElement = <HTMLInputElement>document.getElementById("percent");
const yearsDOM: HTMLInputElement = <HTMLInputElement>document.getElementById("years");
const paymentDOM: HTMLInputElement = <HTMLInputElement>document.getElementById("payment");
const totalDOM: HTMLInputElement = <HTMLInputElement>document.getElementById("total");
const salaryDOM: HTMLInputElement = <HTMLInputElement>document.getElementById("salary");
const kidsDOM: HTMLInputElement = <HTMLInputElement>document.getElementById("kids");


abstract class Credit {
    amount: number;
    years: number;
    percent: number;
    payment: number | null;
    total: number | null;

    constructor(amount: number, years: number, percent: number) {
        this.amount = amount;
        this.years = years;
        this.percent = percent;
    }
    abstract calculate(): void;
}

class FastCredit extends Credit {

    constructor(amount: number, years: number, percent: number) {
        super(amount, years, percent)
    }
    calculate(): void {
        let interest = this.percent / 100 / 12;
        let payments = this.years * 12;

        let x = Math.pow(1 + interest, payments);
        let monthly = (this.amount * x * interest) / (x - 1);

        if (isFinite(monthly)) {
            this.payment = monthly;
            this.total = (monthly * payments);
        }
        else {
            this.payment = null;
            this.total = null;
        }
    }
}

function calculateCredit(credit: Credit) {

    credit.calculate();

    if (credit.payment === null) {
        paymentDOM.innerHTML = "";
    } else {
        paymentDOM.innerHTML = credit.payment.toFixed(2);
    }
    if (credit.total === null) {
        totalDOM.innerHTML = "";
    } else {
        totalDOM.innerHTML = credit.total.toFixed(2);
    }
}

function calculateFC() {
    let fcredit = new FastCredit(parseFloat(amountDOM.value), parseFloat(yearsDOM.value), parseFloat(percentDOM.value));
    calculateCredit(fcredit);
}

function validateYearFC() {
    if (parseFloat(yearsDOM.value) > 2) {
        yearsDOM.value = "2"
    } else if (parseFloat(yearsDOM.value) < 0) {
        yearsDOM.value = "0"
    }
}

function validateAmountFC() {
    if (parseFloat(amountDOM.value) > 5000) {
        amountDOM.value = "5000"
    } else if (parseFloat(amountDOM.value) < 0) {
        amountDOM.value = "0"
    }
}

class HouseCredit extends Credit {
    salary: number;
    kids: number;

    constructor(amount: number, years: number, percent: number, salary: number, kids: number) {
        super(amount, years, percent);
        this.salary = salary;
        this.kids = kids;
    }
    calculate(): void {

        let interest = this.percent / 100 / 12;
        let payments = this.years * 12;

        let x = Math.pow(1 + interest, payments);
        let monthly = (this.amount * x * interest) / (x - 1);

        let percentOfSalary = monthly * 100 / this.salary;

        if (isFinite(monthly) && percentOfSalary < 20) {
            this.payment = monthly;
            this.total = (monthly * payments);
        }
        else {
            this.payment = null;
            this.total = null;
        }
    }
}

function calculateHC() {
    let hcredit = new HouseCredit(parseFloat(amountDOM.value), parseFloat(yearsDOM.value), parseFloat(percentDOM.value), parseFloat(salaryDOM.value), parseFloat(kidsDOM.value));
    calculateCredit(hcredit);
}