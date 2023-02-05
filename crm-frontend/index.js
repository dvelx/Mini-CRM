import { getClientArr, deleteClient, searchClient } from './src/api.js';
import { modalNewClient, modalEditClient, modalDeleteClient } from './src/modal.js'

const table = document.getElementById('tableClientList');
const data = await getClientArr();

const inp = document.querySelector('.search__input');
const THAll = document.querySelectorAll('.th');
let column = '';
let columnDir = true;

inp.addEventListener('input', () => {
    setTimeout(async () => {
        const test = await searchClient(inp.value);
        table.innerHTML = '';
        renderListClient(test);
    }, 300);
})


function sortList (arr, prop, dir = false) {
    let arrayCopy = [...arr];
    return arrayCopy.sort( function (clientA, clientB) {
        if (!dir ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop]) {
            return -1
        }
    });
    
}

THAll.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        const arrow = document.querySelector(`.span-${this.dataset.column}`)
        arrow.classList.toggle(`span-${this.dataset.column}-down`)
        columnDir = !columnDir;
        renderListClient(data);
    })
})

function renderListClient(arr) {

    let arrCopy = [...arr];
    
    arrCopy = sortList(arrCopy, column, columnDir);
    
    table.innerHTML = '';

    arrCopy.forEach(client => {
        const tr = document.createElement('tr');
        let clientId = document.createElement('td');
        let clientFullname = document.createElement('td');
        let clientCreateDate = document.createElement('td');
        let spanDateCreated = document.createElement('span')
        let spanTimeCreated = document.createElement('span');
        let clientLastChanges = document.createElement('td');
        let spanDateUpdated = document.createElement('span')
        let spanTimeUpdated = document.createElement('span');
        let clientContacts = document.createElement('td');
        let clientActions = document.createElement('td');
        let btnEdit = document.createElement('button');
        let btnDelete = document.createElement('button');
        let imgEdit = document.createElement('img');
        let imgCancel = document.createElement('img');
        btnDelete.id = client.id;
        btnEdit.id = client.id;
        clientId.classList.add('td-client-id')
        clientFullname.classList.add('td-client-fullname')
        clientCreateDate.classList.add('td-client-createdAt');
        spanDateCreated.classList.add('span-date')
        spanTimeCreated.classList.add('span-time')
        spanDateUpdated.classList.add('span-date')
        spanTimeUpdated.classList.add('span-time')
        clientLastChanges.classList.add('td-client-updatedAt');
        clientContacts.classList.add('td-client-contact')
        btnDelete.classList.add('btn-delete');
        btnEdit.classList.add('btn-edit');
        clientActions.classList.add('td-client-actions');
        btnEdit.textContent = 'Изменить';
        btnDelete.textContent = 'Удалить';
        imgEdit.src = './image/edit.svg';
        imgCancel.src = './image/cancel-th.svg';

        btnEdit.addEventListener('click', (e) => {
            e.preventDefault();

            modalEditClient(client);  
        });

        btnDelete.addEventListener('click', () => {
            modalDeleteClient(client);
        });

        

       
        
        

        clientId.textContent = client.id;
        clientFullname.textContent = client.surname + ' ' + client.name + ' ' + client.lastName;
        spanDateCreated.textContent = client.createdAt.slice(0, 10);;
        spanTimeCreated.textContent = client.createdAt.slice(11,16);
        spanDateUpdated.textContent = client.updatedAt.slice(0, 10);;
        spanTimeUpdated.textContent = client.updatedAt.slice(11,16);
        for (const el of client.contacts) {
            if (el.type === 'Телефон') {
                const phoneImg= document.createElement('img');
                phoneImg.classList.add('img-contact');
                phoneImg.src = './image/phone.svg'; 
                tippy(phoneImg, {
                    content: `Телефон: ${el.value}`,
                });
                clientContacts.append(phoneImg); 
            };
            if (el.type === 'Email') {
                const emailImg = document.createElement('img');
                emailImg.classList.add('img-contact');
                emailImg.src = './image/mail.svg'; 
                tippy(emailImg, {
                    content: `E-mail: ${el.value}`,
                });
                clientContacts.append(emailImg); 
            };
            if (el.type === 'Facebook') {
                const fbImg = document.createElement('img');
                fbImg.classList.add('img-contact');
                fbImg.src = './image/fb.svg';
                tippy(fbImg, {
                    content: `Facebook: ${el.value}`,
                });
                clientContacts.append(fbImg); 
            };
            if (el.type === 'Вконтакте') {
                const vkImg = document.createElement('img');
                vkImg.classList.add('img-contact');
                vkImg.src = './image/vk.svg';
                tippy(vkImg, {
                    content: `VK: ${el.value}`,
                });
                clientContacts.append(vkImg); 
            };
            if (el.type === 'Другие') {
                const otherImg = document.createElement('img');
                otherImg.classList.add('img-contact');
                otherImg.src = './image/other.svg';
                tippy(otherImg, {
                    content: `Другие: ${el.value}`,
                });
                clientContacts.append(otherImg); 
            };
        }

        table.append(tr);
        tr.append(clientId);
        tr.append(clientFullname);
        tr.append(clientCreateDate);
        clientCreateDate.append(spanDateCreated)
        clientCreateDate.append(spanTimeCreated);
        tr.append(clientLastChanges);
        clientLastChanges.append(spanDateUpdated);
        clientLastChanges.append(spanTimeUpdated);
        tr.append(clientContacts);
        tr.append(clientActions);
        clientActions.append(btnEdit);
        btnEdit.append(imgEdit);
        clientActions.append(btnDelete);
        btnDelete.append(imgCancel);
    });
    return table
}

function createDataList() {
    const datalist = document.getElementById('datalist')
    data.forEach( item => {
        const optionSurname = document.createElement('option')
        const optionName = document.createElement('option')
        const optionLastname = document.createElement('option')
        optionName.classList.add('options')
        optionSurname.value = item.surname
        optionName.value = item.name
        optionLastname.value = item.lastName

        datalist.append(optionSurname)
        datalist.append(optionName)
        datalist.append(optionLastname)
    })
    return datalist
}

renderListClient(data)
createDataList()
modalNewClient()









