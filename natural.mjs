import { createReadStream } from "fs";

export default class Natural {
  constructor(digits) {
    //passed digits = a string
    this.digits = digits.split("").map((ch) => ch - "0");
    this.factors = this.factor();
  }

  async factor() {
    let factors = {};
    let primes = await this.readData();
    console.log(primes);

    let number = 0;
    for (let i = 0; i < this.digits.length; i++) {
      number =
        number + this.digits[i] * Math.pow(10, this.digits.length - 1 - i);
    }
    let isDivisible = true;
    while (isDivisible) {
      for (let prime of primes) {
        if (prime > number) {
          //if prime is greater, return
          isDivisible = false;
        } else if (number % prime === 0) {
          number = number / prime;
          if (prime in factors) {
            factors[prime] += 1;
          } else {
            factors[prime] = 1;
          }
          break;
        } else {
          //if indivisible
          if (prime === primes[primes.length - 1]) {
            //if last item in array
            //TODO: create more
            isDivisible = false;
            break;
          }
        }
      }
    }
    return factors;
  }

  readData() {
    return new Promise((resolve, reject) => {
      let primes;
      let reader = createReadStream("primes.dat");
      reader.on("data", (chunk) => {
        primes = chunk
          .toString()
          .split(" ")
          .map((prime) => prime - "0");
        resolve(primes);
      });
    });
  }
}
