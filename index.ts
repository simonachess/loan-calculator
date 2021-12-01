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

function calculateFastCredit() {
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

function calculateHouseCredit() {
    let hcredit = new HouseCredit(parseFloat(amountDOM.value), parseFloat(yearsDOM.value), parseFloat(percentDOM.value), parseFloat(salaryDOM.value), parseFloat(kidsDOM.value));
    calculateCredit(hcredit);
}