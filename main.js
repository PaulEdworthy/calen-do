const calendar = document.querySelector('.calendar')
const header = document.getElementsByTagName('h1')
const month = document.querySelector('.month')

// date queries
const today = new Date()
const currentDate = today.getDate()
const currentDay = today.toLocaleDateString('default', {
  weekday: 'long'
})
const currentMonth = today.toLocaleDateString('default', {
  month: 'long'
})
const currentYear = today.getFullYear() // 2022
month.innerHTML = currentMonth

// Populate calendar grid
for (let day = 1; day <= 31; day++) {
  calendar.insertAdjacentHTML('beforeend',
    `<div class="date">${day}</div>`)
  isToday(day)
}

function isToday(day) {
  if (currentDate === day) {
    const nodeList = document.querySelectorAll('.date')
    const currentDay = nodeList[day - 1]
    currentDay.classList.add('today')
    currentDay.style.fontWeight = 'bold'
  }
}

// modal
const dates = document.querySelectorAll('.date')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.btn__cancel')
const submit = document.querySelector('.btn__submit')
const input = document.querySelector('.form__input')
const list = document.querySelector('.list')


const tasks = []

dates.forEach(day => {
  day.addEventListener('click', () => {
    // e.currentTarget.classList.toggle('success')
    if (modal.style.display === 'none') {
      modal.style.display = 'flex'
      setInputFocus()
    } else {
      modal.style.display = 'none'
    }
  })
})

closeModal.addEventListener('click', () => {
  closeModal.textContent = 'CANCEL'
  modal.style.display = 'none'
})

// task submission
submit.addEventListener('click', handleEvent)
input.addEventListener('keyCode === 13', handleEvent)

function handleEvent(e) {
  e.preventDefault()
  tasks.push(input.value)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  updateGrid(input.value)
  updateModalList(input.value)
  input.value = ''
  setInputFocus()
  closeModal.textContent = 'DONE'
}

function setInputFocus() {
  input.setSelectionRange(0, 0)
  input.focus()
}

function updateGrid(value) {
  dates.forEach(day => {
    intValue = parseInt(day.textContent) // convert to int for numerical check
    if (intValue >= currentDate) {
      day.insertAdjacentHTML('beforeend',
      `<div class="task">${value}</div>`
      )
    }
  })
}

function updateModalList(value) {
  console.log(value)
  const newItem = `<li class="list__item">${value}</li>`
  list.innerHTML += newItem
}