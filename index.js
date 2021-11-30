var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var amountDOM = document.getElementById("amount");
var percentDOM = document.getElementById("percent");
var yearsDOM = document.getElementById("years");
var paymentDOM = document.getElementById("payment");
var totalDOM = document.getElementById("total");
var salaryDOM = document.getElementById("salary");
var kidsDOM = document.getElementById("kids");
var Credit = (function () {
    function Credit(amount, years, percent) {
        this.amount = amount;
        this.years = years;
        this.percent = percent;
    }
    return Credit;
}());
var FastCredit = (function (_super) {
    __extends(FastCredit, _super);
    function FastCredit(amount, years, percent) {
        return _super.call(this, amount, years, percent) || this;
    }
    FastCredit.prototype.calculate = function () {
        var interest = this.percent / 100 / 12;
        var payments = this.years * 12;
        var x = Math.pow(1 + interest, payments);
        var monthly = (this.amount * x * interest) / (x - 1);
        if (isFinite(monthly)) {
            this.payment = monthly;
            this.total = (monthly * payments);
        }
        else {
            this.payment = null;
            this.total = null;
        }
    };
    return FastCredit;
}(Credit));
function calculateCredit(credit) {
    credit.calculate();
    if (credit.payment === null) {
        paymentDOM.innerHTML = "";
    }
    else {
        paymentDOM.innerHTML = credit.payment.toFixed(2);
    }
    if (credit.total === null) {
        totalDOM.innerHTML = "";
    }
    else {
        totalDOM.innerHTML = credit.total.toFixed(2);
    }
}
function calculateFC() {
    var fcredit = new FastCredit(parseFloat(amountDOM.value), parseFloat(yearsDOM.value), parseFloat(percentDOM.value));
    calculateCredit(fcredit);
}
function validateYearFC() {
    if (parseFloat(yearsDOM.value) > 2) {
        yearsDOM.value = "2";
    }
    else if (parseFloat(yearsDOM.value) < 0) {
        yearsDOM.value = "0";
    }
}
function validateAmountFC() {
    if (parseFloat(amountDOM.value) > 5000) {
        amountDOM.value = "5000";
    }
    else if (parseFloat(amountDOM.value) < 0) {
        amountDOM.value = "0";
    }
}
var HouseCredit = (function (_super) {
    __extends(HouseCredit, _super);
    function HouseCredit(amount, years, percent, salary, kids) {
        var _this = _super.call(this, amount, years, percent) || this;
        _this.salary = salary;
        _this.kids = kids;
        return _this;
    }
    HouseCredit.prototype.calculate = function () {
        var interest = this.percent / 100 / 12;
        var payments = this.years * 12;
        var x = Math.pow(1 + interest, payments);
        var monthly = (this.amount * x * interest) / (x - 1);
        var percentOfSalary = monthly * 100 / this.salary;
        if (isFinite(monthly) && percentOfSalary < 20) {
            this.payment = monthly;
            this.total = (monthly * payments);
        }
        else {
            this.payment = null;
            this.total = null;
        }
    };
    return HouseCredit;
}(Credit));
function calculateHC() {
    var hcredit = new HouseCredit(parseFloat(amountDOM.value), parseFloat(yearsDOM.value), parseFloat(percentDOM.value), parseFloat(salaryDOM.value), parseFloat(kidsDOM.value));
    calculateCredit(hcredit);
}
//# sourceMappingURL=index.js.map