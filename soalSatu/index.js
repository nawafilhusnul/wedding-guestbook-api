function printMultiplicationTable(number) {
  if (typeof number !== "number" || number <= 0) {
    console.error("Invalid input: Number must be a positive integer.");
    return;
  }

  for (let i = 1; i <= number; i++) {
    let tempLine = "";
    for (let j = 1; j <= number; j++) {
      tempLine += `${i * j} `
    }
    console.log(`${tempLine}\n`)
  }
}

printMultiplicationTable(5)