const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transcation_container = document.getElementById('transcation-container');
const form = document.getElementById('form');
const transaction_name = document.getElementById('transaction-name');
const transaction_amount = document.getElementById('transaction-amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
];

let transactions = dummyTransactions;

//Add transactions to DOM list
function addTransactionToDom() {
  transactions.forEach((transaction) => {
    const element = document.createElement('li');
    const sign = transaction.amount < 0 ? '-' : '+';
    element.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    element.innerHTML = `
            ${transaction.text}<span>${sign}${Math.abs(
      transaction.amount
    )}</span><button class="delete-btn">x</button>
        `;
    transcation_container.appendChild(element);
  });
}

addTransactionToDom();
