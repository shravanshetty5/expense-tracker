const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transcation_container = document.getElementById('transcation-container');
const form = document.getElementById('form');
const transaction_name = document.getElementById('transaction-name');
const transaction_amount = document.getElementById('transaction-amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
// ];

let transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];
let incomeAmount = 0;
let expenseAmount = 0;

//Add transactions to DOM list
function addTransactionsToDom() {
  transcation_container.innerHTML = '';
  transactions.forEach((transaction) => {
    const element = document.createElement('li');
    const sign = transaction.amount < 0 ? '-' : '+';
    element.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    element.innerHTML = `
            ${transaction.text}<span>${sign}${Math.abs(
      transaction.amount
    )}</span><button class="delete-btn" onClick="removeTransaction(${
      transaction.id
    })">x</button>
        `;
    transcation_container.appendChild(element);
  });
}
function transformToCurrency(number) {
  const sign = number < 0 ? '-' : '+';
  const numb = Math.abs(number)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `${sign}$${numb}`;
}
function updateBalancesInDom() {
  balance.innerHTML = `${transformToCurrency(incomeAmount + expenseAmount)}`;
  income.innerHTML = `${transformToCurrency(incomeAmount)}`;
  expense.innerHTML = `${transformToCurrency(expenseAmount)}`;
}

function updateBalances() {
  const incomeReducer = (prev, current) =>
    current.amount < 0 ? prev : prev + current.amount;
  incomeAmount = transactions.reduce(incomeReducer, 0);
  const expenseReducer = (prev, current) =>
    current.amount > 0 ? prev : prev + current.amount;
  expenseAmount = transactions.reduce(expenseReducer, 0);
  updateBalancesInDom();
}

const addTransaction = (e) => {
  e.preventDefault();
  if (
    transaction_name.value.trim() === '' ||
    transaction_amount.value.trim() === ''
  ) {
    alert('Please add a transaction text and amount');
    return;
  }
  transactions.push({
    id: transactions.length + 1,
    text: transaction_name.value.trim(),
    amount: +transaction_amount.value.trim(),
  });
  //clear form value
  transaction_name.value = '';
  transaction_amount.value = '';
  addTransactionsToDom();
  updateBalances();
  //add Transaction to local storage
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  addTransactionsToDom();
  updateBalances();

  //add Transaction to local storage
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

addTransactionsToDom();

updateBalances();

//add transaction
form.addEventListener('submit', addTransaction);
