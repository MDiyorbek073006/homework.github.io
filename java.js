let form = document.querySelector('form')
let nameInp = document.querySelector('.name')
let ageInp = document.querySelector('.age')
let tbody = document.querySelector('tbody')
let bg = document.querySelector('.bg')
let modal = document.querySelector('.modal')
let saveBtn = document.querySelector('.save')
let closeBtn = document.querySelector('.close')
let modalName = document.querySelector('.modalName')
let modalAge = document.querySelector('.modalAge')
let globalId 

let todos = []

form.onsubmit = (event) => {
    event.preventDefault()

    let task = {
        id: Math.random()
    }

    let fm = new FormData(event.target)

    fm.forEach((value, key) => {
        task[key] = value
    })
    if (ageInp.value === '' || nameInp.value === '') {
        nameInp.classList.add('invalid')
        ageInp.classList.add('invalid')
    } else {
        nameInp.classList.remove('invalid')
        ageInp.classList.remove('invalid')
        todos.push(task)
        reload(todos)
        nameInp.value = ''
        ageInp.value = ''
    }
}

function reload(arr) {
    let caunt = 0
    tbody.innerHTML = ''
    for (let item of arr) {
        caunt = caunt + 1
        let tr = document.createElement('tr')
        let tdNumber = document.createElement('td')
        let tdName = document.createElement('td')
        let tdAge = document.createElement('td')
        let tdBtns = document.createElement('td')
        let edit = document.createElement('img')
        let dele = document.createElement('img')


        edit.classList.add('img_icon')
        dele.classList.add('img_icon')
        tdNumber.innerHTML = caunt
        tdName.innerHTML = item.name
        tdAge.innerHTML = 2023 - +item.age
        edit.src = './icon/edit-svgrepo-com.svg'
        dele.src = './icon/icons8-delete.svg'




        tbody.append(tr)
        tr.append(tdNumber, tdName, tdAge, tdBtns)
        tdBtns.append(edit, dele)

        edit.onclick = () => {
            globalId = item.id
            bg.classList.add('bg-active')
            modal.classList.add('modal-active')

            modalName.value = item.name
            modalAge.value = item.age
        }
        dele.onclick = () => {
            todos = todos.filter(el => el.id !== item.id)
            tr.remove()
        }
    }
}
saveBtn.onclick = () => {
    let finded = todos.find(elem => elem.id === globalId)
    finded.name = modalName.value
    finded.age = modalAge.value
    reload(todos)
    bg.classList.remove('bg-active')
    modal.classList.remove('modal-active')
}
closeBtn.onclick = () => {
    bg.classList.remove('bg-active')
    modal.classList.remove('modal-active')
}