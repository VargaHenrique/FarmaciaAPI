//USER FORM ENVIA OS DADOS PAR O FORMULARIO
const clienteForm = document.getElementById('cliente-form');

//MoSTRA DOS DADOS DO BD
const clienteList = document.getElementById('cliente-list');

let clienteArrayLength = 0



function listClientes(){
    fetch('http://localhost:3000/Cliente')
    .then(response => response.json())  
    .then((data) => {
     clienteList.innerHTML += ''
     clienteArrayLength = data.length;
    data.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `${id} - ${user, nome} - Endereço: ${user.endereco} - Email: ${user.email} - Telefone: ${user.telefone}`
    
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Deletar';
        deleteButton.addEventListener('click', () => deleteUser(user.id)); // Chama a função deleteUser com o ID do usuário
        
        li.appendChild(deleteButton);
    
    
        const updateButton = document.createElement('button');
        updateButton.innerText =  'Editar';
        updateButton.addEventListener('click', () => editCliente(user.id));
        li.appendChild(updateButton);
    
        clienteList.appendChild(li)
    
    });
    
    })
    .catch(error => console.error('Erro:' + error))
    
}

function deleteCliente(id) {
    fetch(`http://localhost:3000/Cliente/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(listClientes())
    .catch(error => console.error('Erro:', error));
}

clienteForm.addEventListener('submit', (e) => {

    e.preventDefault(); //PREVENÇÃO PADRÃO DE ERRO

    fetch('http://localhost:3000/medicamentos')
        .then(response => response.json())
        .then(data => {
            let id = clienteArrayLength + 1
            data.forEach(cliente => {
                if (cliente.id == id) {
                    id++;
                }
            });
  /////////////////////////////////////CLIENTE////////////////////////////////////////
   
  const nome = document.getElementById('nome'). value;  
  const endereco = document.getElementById('endereco').value; 
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

 /////////////////////CLIENTE//////////////////////

fetch('http://localhost:3000/Cliente', {
    method:  'POST', 
    headers: { //A FORMa COMO VAI BUSCAR OS DADOS
     'Content-Type': 'application/json'
 },
 
 
 //TRANSFORMA EM UM TEXTO QUE PODE SER LIDO PELO SERVIDOR
   body: JSON.stringify({nome: nome, endereco: endereco, email: email, telefone: telefone}) 
 
 })
 
 //RECEBE A RESPONSABILIDADE DA REQUISIÇÃO E TRANSFORMA EM UM  JSOM
 .then(response => response.json()) 
 .then(() => {
     listClientes()
     clienteForm.reset()
 })
 .catch(error => console.error('Erro:' + error))
}); 
});






listClientes(); 