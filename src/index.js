
  
  function expressionCalculator(expr) {



    const left_skobka = expr.match(/[(]/g)

    const right_skobka = expr.match(/[)]/g)
    
    const arr = expr.match(/[()\*\/+-]|\d+/g)
  
    if ((!left_skobka && right_skobka) || (left_skobka && !right_skobka))
      throw "ExpressionError: Brackets must be paired";
    
      if (left_skobka && right_skobka) if (left_skobka.length !== right_skobka.length)   throw "ExpressionError: Brackets must be paired";
      
    
  
    for (item of arr) {
      if (!isNaN(item)) {
        posl_deist.push(+item)
      
    } else {
       
        if (priority[item]) {
          if (priority[item] <= priority[lastItemInStack(posledovat)]) {
            calc()
          }
        }
        if (item === ")") {
          while (lastItemInStack(posledovat) !== "(") {
            calc()
          }
          posledovat.pop()
          continue
        }
        posledovat.push(item)
      }
    }
  
    while (posl_deist.length > 1) {
      calc()
    }
  
    return posl_deist.pop()
  }
  
  let posl_deist = []
  let posledovat = []
  
  const operations = {
   
    "+": (a, b) => (lastItemInStack(posledovat) === "-" ? a - b : a + b),
    "-": (a, b) => (lastItemInStack(posledovat) === "-" ? a + b : a - b),
    "*": (a, b) => a * b,
    "/": (a, b) => {
     
     
        if (b === 0) {
        
        posl_deist = []
        posledovat = []
        throw new TypeError("TypeError: Division by zero.")
      }
      return a / b
    }
  }
  
  const priority = {
    
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
  }
  
  function lastItemInStack(stack) {
    return stack[stack.length - 1]
  }
  
  function calc() {
    let [b, a] = [posl_deist.pop(), posl_deist.pop()]
   
    posl_deist.push(operations[posledovat.pop()](a, b))
  }
  
  module.exports = {
    expressionCalculator
  }