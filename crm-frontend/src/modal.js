import { createNewClient, editClient, deleteClient } from './api.js';

let modalOverlay,
    modalContainer,
    modalTitle,
    modalForm,
    containerContacts,
    btnAddBlock;

containerContacts = document.createElement('div');
containerContacts.classList.add('container-contacts');    

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PHONE_REGEXP = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const SOCIAL_REGEXP = /^(@)(.)+$/;


function isEmailValid(value) {
    return EMAIL_REGEXP.test(value)
}

function isPhoneValid(phone){
    return PHONE_REGEXP.test(phone);
}
function isSocialValid(username) {
    return SOCIAL_REGEXP.test(username)
}

function modalContainerCreate(title, btnText) {
    modalOverlay = document.createElement('div');
    modalContainer = document.createElement('div');
    modalTitle = document.createElement('h3');
    const modalBottomContainer = document.createElement('div');
    const modalBottomBtn = document.createElement('button');
    const crossBtn = document.createElement('div');
    const span = document.createElement('span');
    const span2 = document.createElement('span');
    crossBtn.append(span);
    crossBtn.append(span2);
    crossBtn.classList.add('cross-btn');

    modalOverlay.classList.add('modal-overlay');
    modalContainer.classList.add('modal-container');
    modalBottomContainer.classList.add('modal-container');
    modalTitle.classList.add('modal-title');
    modalBottomBtn.classList.add('btn-close');

    modalTitle.innerHTML = title;
    modalBottomBtn.textContent = btnText;

    modalBottomBtn.addEventListener('click', (e) => {
        containerContacts.innerHTML = ''
        modalOverlay.remove();
    });
    crossBtn.addEventListener('click', (e) => {
        containerContacts.innerHTML = ''
        modalOverlay.remove();
    });

    document.body.append(modalOverlay);
    modalOverlay.append(modalContainer);
    modalOverlay.append(modalBottomContainer);
    modalContainer.append(crossBtn)
    modalContainer.append(modalTitle);
    modalBottomContainer.append(modalBottomBtn)

    return
}
function modalFormCreate() {
    modalForm = document.createElement('form');
    const inputNameLabel = document.createElement('label');
    const inputName = document.createElement('input');
    const inputSurnameLabel = document.createElement('label');
    const inputSurname = document.createElement('input');
    const inputLastNameLabel = document.createElement('label');
    const inputLastName = document.createElement('input');

    inputSurname.autocomplete = 'off'
    inputName.autocomplete = 'off'
    inputSurname.autocomplete = 'off'

    modalForm.classList.add('modal-form');
    inputName.classList.add('form-input', 'input-name');
    inputSurname.classList.add('form-input', 'input-surname');
    inputLastName.classList.add('form-input', 'input-lastname');
    inputLastNameLabel.classList.add('input-label','label-lastname')
    inputNameLabel.classList.add('input-label','label-name')
    inputSurnameLabel.classList.add('input-label','label-surname')

    inputSurname.id = 'surname';
    inputName.id = 'name';
    inputLastName.id = 'lastName';

    inputSurnameLabel.innerHTML= 'Фамилия<span>*</span>';
    inputNameLabel.innerHTML = 'Имя<span>*</span>';
    inputLastNameLabel.innerHTML = 'Отчетсво<span>*</span>';
    

    modalContainer.append(modalForm);
    modalForm.append(inputSurnameLabel);
    modalForm.append(inputSurname);
    modalForm.append(inputNameLabel);
    modalForm.append(inputName);
    modalForm.append(inputLastNameLabel);
    modalForm.append(inputLastName);

    document.querySelectorAll('.form-input').forEach( item => {
        
        item.addEventListener('blur', () => {
            item.value = (item.value.slice(0,1).toUpperCase() + item.value.slice(1).toLowerCase()).replace(/\d/g, '').trim()

            if (item.value == '') {
                item.classList.add('error-input')
                document.querySelector('.btn-save').setAttribute('disabled', 'disabled')
            }
        })
    })

    return
}

function createContactBlock() {

    const addContactBlock = document.createElement('div');
    const select = document.createElement('select');
    const optionsTel = document.createElement('option');
    const optionsEmail = document.createElement('option');
    const optionsFb = document.createElement('option');
    const optionsVk = document.createElement('option');
    const optionsOther = document.createElement('option');
    const inputContacts = document.createElement('input');
    const btnRemoveBlock = document.createElement('div');
    const imgClose = document.createElement('img');

    select.id = 'select';
    select.value = '';
    optionsTel.value = 'Телефон';
    optionsEmail.value = 'Email';
    optionsFb.value = 'Facebook';
    optionsVk.value = 'Вконтакте';
    optionsOther.value = 'Другие'

  
    imgClose.src = './image/cancel.svg';
    addContactBlock.classList.add('add-contact-block');
    select.classList.add('select');
    inputContacts.classList.add('input-add-contact');
    btnRemoveBlock.classList.add('btn-contact-close');
    tippy(btnRemoveBlock, {
        content: 'Удалить контакт',
    });
    inputContacts.addEventListener('blur', () => {
        console.log(select.value)
        if (select.value == optionsEmail.value && !isEmailValid(inputContacts.value)) {
            inputContacts.classList.add('error-add')
            document.querySelector('.btn-save').setAttribute('disabled', 'disabled')
        }
        if (select.value == optionsTel.value && !isPhoneValid(inputContacts.value)) {
            inputContacts.classList.add('error-add')
            document.querySelector('.btn-save').setAttribute('disabled', 'disabled')
        }
        if (select.value == optionsFb.value && !isSocialValid(inputContacts.value) || select.value == optionsVk.value && !isSocialValid(inputContacts.value)) {
            inputContacts.classList.add('error-add')
            document.querySelector('.btn-save').setAttribute('disabled', 'disabled')
        }
        if (select.value == optionsOther.value && inputContacts.value.length < 3) {
            inputContacts.classList.add('error-add')
            document.querySelector('.btn-save').setAttribute('disabled', 'disabled')
        }

    })
    inputContacts.addEventListener('input', () => {
        inputContacts.classList.remove('error-add')
        document.querySelector('.btn-save').removeAttribute('disabled', 'disabled')
        
    })

    optionsTel.textContent = 'Телефон';
    optionsEmail.textContent = 'E-mail';
    optionsFb.textContent = 'Facebook';
    optionsVk.textContent = 'Вконтакте';
    optionsOther.textContent = 'Другие';
    
    btnRemoveBlock.addEventListener('click', () => {
        addContactBlock.remove();
        if (!modalContainer.contains(btnAddBlock) && containerContacts.getElementsByClassName('add-contact-block').length < 10) {
            containerContacts.appendChild(btnAddBlock);
        };
    });

    containerContacts.append(addContactBlock);
    containerContacts.insertBefore(addContactBlock, btnAddBlock);
    addContactBlock.append(select);
    select.append(optionsTel);
    select.append(optionsEmail);
    select.append(optionsFb);
    select.append(optionsVk);
    select.append(optionsOther);
    addContactBlock.append(inputContacts);
    addContactBlock.append(btnRemoveBlock);
    btnRemoveBlock.append(imgClose);
     if(modalForm.getElementsByClassName('add-contact-block').length > 9) {
        btnAddBlock.remove()
     } 
}

export function modalNewClient() {
    const btnNewClient = document.getElementById('btnModalNewClient');
    btnNewClient.addEventListener('click', (e) => {
        e.preventDefault();
        modalContainerCreate('Новый клиент', 'Отмена');
        modalFormCreate();

        btnAddBlock = document.createElement('div');
        const btnAddContacts = document.createElement('p');
        const btnAddContactsIcon = document.createElement('img');
        const modalSaveBtn = document.createElement('button');

        btnAddBlock.classList.add('btn-add-block');
        modalSaveBtn.classList.add('btn-save');

        btnAddContactsIcon.src = './image/add_circle_outline.svg';
        btnAddContacts.textContent = 'Добавить контаткт';

        modalSaveBtn.textContent = 'Сохранить';

        btnAddBlock.addEventListener('click', () => {
            createContactBlock()
        })
        modalForm.append(containerContacts);
        containerContacts.append(btnAddBlock)
        btnAddBlock.append(btnAddContactsIcon);
        btnAddBlock.append(btnAddContacts);
        modalForm.append(modalSaveBtn)

        

        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();

           

        
            let newClient = {
                surname: document.getElementById('surname').value,
                name: document.getElementById('name').value,
                lastName: document.getElementById('lastName').value,
                contacts: [],
            };
            
            document.querySelectorAll('.add-contact-block').forEach(elem => {
                let contactClient = 
                    {
                        type: elem.childNodes[0].value,
                        value: elem.childNodes[1].value,
                    };
                
                newClient.contacts.push(contactClient);
                
            });
            createNewClient(newClient);
        });
    });
}

export function modalDeleteClient(client) {
    modalContainerCreate('Удалить клиента', 'Отмена');
    const modalAsk = document.createElement('p');
    const modalDeleteBtn = document.createElement('button');

    modalAsk.classList.add('delete-ask');
    modalDeleteBtn.classList.add('btn-delete-modal');

    modalAsk.textContent = 'Вы действительно хотите удалить данного клиента?';
    modalDeleteBtn.textContent = 'Удалить';

    modalDeleteBtn.id = 'btnDeleteModal';

    modalDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        deleteClient(client);
    })

    modalContainer.append(modalAsk);
    modalContainer.append(modalDeleteBtn);
}

export function modalEditClient(client) {
    
    modalContainerCreate(`Изменить клиента <span>ID:${client.id}</span>`, 'Удалить клиента');
    modalFormCreate();

    const btnAddContacts = document.createElement('p');
    const btnAddContactsIcon = document.createElement('img');
    btnAddBlock = document.createElement('div');
    btnAddBlock.classList.add('btn-add-block');
    btnAddContactsIcon.src = './image/add_circle_outline.svg';
    btnAddContacts.textContent = 'Добавить контаткт';

    const editClientArray = []

    modalForm.append(containerContacts);
    containerContacts.append(btnAddBlock);
    btnAddBlock.append(btnAddContacts);
    btnAddBlock.append(btnAddContactsIcon);

    btnAddBlock.addEventListener('click', () => {
        createContactBlock()
    })

    const modalSaveBtn = document.createElement('button');
    if (client.contacts.length > 0) {
        client.contacts.forEach(item => {
            createContactBlock()
            editClientArray.push(item)
        })
        let i = 0
        document.querySelectorAll('.add-contact-block').forEach(inp => {
            inp.childNodes[1].value = editClientArray[i].value
            inp.childNodes[0].value = editClientArray[i].type
            i++
        })
        
    }
    
    modalSaveBtn.classList.add('btn-save');

    modalSaveBtn.textContent = 'Сохранить';

    document.getElementById('surname').value = client.surname;
    document.getElementById('name').value = client.name;
    document.getElementById('lastName').value = client.lastName;

    document.querySelector('.btn-close').addEventListener('click', (e) => {
        e.preventDefault();
        deleteClient(client);
    })

    modalContainer.append(modalForm);
    
    modalForm.append(modalSaveBtn);
 
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        document.querySelectorAll('.form-input').forEach(item => {
            if (item.value == '') {
                item.classList.add('error-input')
            }
        })

        let editClientObj = {
            surname: document.getElementById('surname').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            contacts: [],
        }

        document.querySelectorAll('.add-contact-block').forEach(elem => {
            let contactClient = 
                {
                    type: elem.childNodes[0].value,
                    value: elem.childNodes[1].value,
                };
            
            editClientObj.contacts.push(contactClient);
            
        });
        editClient(client, editClientObj);
    })
}