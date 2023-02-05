
const url = 'http://localhost:3000/api/clients';

export async function getClientArr() {
    const response = await fetch(url);
    return await response.json();
}

export async function createNewClient(client) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                surname: client.surname,
                name: client.name,
                lastName: client.lastName,
                contacts: client.contacts,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data
        } 
        if ( response.status === 422) {
            const errorMessage = document.createElement('p')
            errorMessage.classList.add('modal-error-massage')
            const btn = document.querySelector('.btn-save')
            errorMessage.textContent = 'Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!'
            
            
            if (document.querySelector('.modal-form').contains(errorMessage) || document.querySelectorAll('.modal-error-massage').length == 1) {
                errorMessage.remove()
            } else {
                document.querySelector('.modal-form').insertBefore(errorMessage, btn)
            }
            
        }
    
    } catch (error) {
        console.log('ошибка ',error.name, ' ', error.message)
    }
}

export function deleteClient(client) {
    fetch(`${url}/${client.id}`, {
        method: 'DELETE'
    });
}

export async function editClient(client, obj) {
    try {
        const response = await fetch(`${url}/${client.id}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            return
        } else if ( response.status === 422) {
            const errorMessage = document.createElement('p')
            errorMessage.classList.add('modal-error-massage')
            const btn = document.querySelector('.btn-save')
            errorMessage.textContent = 'Ошибка: объект, переданный в теле запроса, не прошёл валидацию.'
            
            if (document.querySelector('.modal-form').contains(errorMessage) || document.querySelectorAll('.modal-error-massage').length == 1) {
                errorMessage.remove()
            } else {
                document.querySelector('.modal-form').insertBefore(errorMessage, btn)
                document.querySelectorAll('.input-add-contact').forEach(input => {
                    if (input.value == '') {
                        input.style.borderColor = 'red'
                    }
                    
                })
            }
            
        } else if ( response.status === 404) {
            const errorMessage = document.createElement('p')
            errorMessage.classList.add('modal-error-massage')
            const btn = document.querySelector('.btn-save')
            errorMessage.textContent = 'Ощибка: Переданный в запросе метод не существует или запрашиваемый элемент не найден в базе данных'
            
            if (document.querySelector('.modal-form').contains(errorMessage) || document.querySelectorAll('.modal-error-massage').length == 1) {
                errorMessage.remove()
            } else {
                document.querySelector('.modal-form').insertBefore(errorMessage, btn)
                document.querySelectorAll('.input-add-contact').forEach(input => {
                    if (input.value == '') {
                        input.style.borderColor = 'red'
                    }
                    
                })
            }
            
        }
        
    } catch (error) {
        console.log(error)
    }
}

export async function searchClient(string) {
    const response = await fetch(`${url}?search=${string}`);
    return await response.json();
}