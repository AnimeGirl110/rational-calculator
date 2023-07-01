import Natural from "./natural.mjs";
import Fraction from "./fraction.mjs";

let fraction = Fraction.FromSS("496", "2");
console.log(fraction.print());
console.log(fraction.simplify());