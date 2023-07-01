import Natural from "./natural.mjs";

export default class Fraction {
  constructor(sign, numerator, denominator) {
    this.sign = sign; //positive 1, negative 1
    this.numerator = numerator;
    this.denominator = denominator;
  }

  static FromSS(numerator = "0", denominator = "1") {
    let sign = 1;
    if (numerator[0] === "-") {
      sign *= -1;
      numerator = numerator.slice(1);
    }
    if (denominator[0] === "-") {
      sign *= -1;
      denominator = denominator.slice(1);
    }
    return new Fraction(sign, new Natural(numerator), new Natural(denominator));
  }

  print() {
    let result = this.sign > 0 ? "" : "-";
    this.numerator.digits.forEach((element) => {
      result += element;
    });
    result += " / ";
    this.denominator.digits.forEach((element) => {
      result += element;
    });
    return result;
  }

  simplify() {
    let den = this.denominator.factors;
    let num = this.numerator.factors;
    // let num = { 2: 4, 5: 8, 3: 2 };
    // let den = { 2: 4, 5: 8, 7: 4 };
    for (let base of Object.keys(num)) {
      if (base in den) {
        //they share a base
        let sub = Math.min(num[base], den[base]);
        num[base] -= sub;
        den[base] -= sub;
        if (!den[base]) {
          delete den[base];
        }
        if (!num[base]) { //deletes if power = 0
          delete num[base];
        }
      }
    }
    return {num:num, den:den};
  }
}
