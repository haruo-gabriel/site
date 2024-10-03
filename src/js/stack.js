export class Stack {
  constructor() {
    this.stack = []
  }

  empilha(valor) {
    var novaDiv = this.peek()
    if (novaDiv == null) {
      novaDiv = ""
    }
    const val = this.concatLastElement(novaDiv, valor)
    this.stack.push(val)
  }

  desempilha() {
    return this.stack.pop()
  }

  vazia() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  peek() {
    if (this.vazia()) {
        return null; // Ou lançar um erro
    }
    return this.stack[this.stack.length - 1];
  }

  print() {
    if (this.vazia()) {
        console.log('A pilha está vazia.');
        return;
    }
    console.log('Elementos da pilha:');
    this.stack.forEach((item, index) => {
        console.log(`Índice ${index}: ${item}`);
    });
  }

  concatLastElement(ultimoElemento,valor) {
    const resultado = ultimoElemento + valor; // Concatena
    return resultado; // Retorna o resultado da concatenação
}

}
const stack = new Stack();

stack.empilha('10')
stack.empilha('101')
stack.print()
console.log(stack.desempilha())
console.log(stack.vazia())
console.log(stack.desempilha())
console.log(stack.vazia())