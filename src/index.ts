const btnAdd = document.querySelector('#bAdd') as HTMLButtonElement
const inputTitle = document.querySelector('#title') as HTMLInputElement
const inputCost = <HTMLInputElement>document.querySelector('#cost')
const inputCurrency: HTMLInputElement = <HTMLInputElement>(
  document.querySelector('#currency')
)

const expenses = new Expenses('USD')

render()

btnAdd!.addEventListener('click', (e) => {
  if (
    inputTitle!.value !== '' &&
    inputCost!.value !== '' &&
    !isNaN(parseFloat(inputCost!.value))
  ) {
    const title = inputTitle!.value
    const cost: number = parseFloat(inputCost!.value)
    const currency = <Currency>inputCurrency!.value

    expenses.add({ title: title, cost: { number: cost, currency: currency } })

    render()
  } else {
    alert('You need to complete all data')
  }
})

function render() {
  let html = ''

  expenses.getItems().forEach((item) => {
    const { id, title, cost } = item
    const { currency, number } = cost

    html += `
      <div id='item'>
        <div>
          <span class='currency'>${currency}</span>
          ${number}
        </div>
        <div>${title}</div>
        <div><button class='btnDelete' data-id=${id}>Delete</button></div>
      </div>
    `
  })

  $('#items').innerHTML = html
  $('#display').textContent = expenses.getTotal()

  $$('.btnDelete').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = (e.target as HTMLButtonElement).getAttribute('data-id')

      expenses.remove(+id!)

      render()
    })
  })
}

function $(selector: string) {
  return document.querySelector(selector) as HTMLElement
}

function $$(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<HTMLElement>
}
