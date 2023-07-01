import { createWriteStream, createReadStream } from "fs";

let writer = createWriteStream("primes.dat", {flags: 'w'});

let primes = [2];
let i = 2;

while (primes.length < 50) {
  let isPrime = true;
  for (let prime of primes) {
    if (i % prime === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    primes.push(i);
  }
  i++;
}

for (let i = 0; i < primes.length - 1; i++) {
  writer.write(primes[i] + " ");
}
writer.write(primes[primes.length -1].toString());

let reader = createReadStream("primes.dat");
reader.on("data", (chunk) => {
   let primesFromRead = chunk.toString().split(" ");
   console.log(primesFromRead);
})