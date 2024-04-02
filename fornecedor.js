//USER FORM ENVIA OS DADOS PAR O FORMULARIO
const fornecedorForm = document.getElementById('fornecedor-form');

//MoSTRA DOS DADOS DO BD
const fornecedorList = document.getElementById('fornecedor-list');

let fornecedorArrayLength = 0



function listFornecedor(){
    fetch('http://localhost:3000/Fornecedor')
    .then(response => response.json())  
    .then((data) => {
    fornecedorList.innerHTML += ''
    data.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `${id} - ${user, nome} - Endereço: ${endereco} - Telefone: ${telefone}`
    
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Deletar';
        deleteButton.addEventListener('click', () => deleteUser(user.id)); // Chama a função deleteUser com o ID do usuário
        li.appendChild(deleteButton);
    
    
        const updateButton = document.createElement('button');
        updateButton.innerText =  'Editar';
        updateButton.addEventListener('click', () => editUser(user.id));
        li.appendChild(updateButton);
    
        userList.appendChild(li)
    
    });
    
    })
    .catch(error => console.error('Erro:' + error))
    
}


function deleteFornecedor(id) {
    fetch(`http://localhost:3000/Fornecedor/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(listFornecedor())
    .catch(error => console.error('Erro:', error));
}

userForm.addEventListener('submit', (e) => {

    e.preventDefault(); //PREVENÇÃO PADRÃO DE ERRO

    let id = medicamentosArrayLength + 1

    fetch('http://localhost:3000/medicamentos')
        .then(response => response.json())
        .then(data => {
            data.forEach(medicamento => {
                if (medicamento.id == id) {
                    id++;
                }
            });
 /////////////////////////////////////FORNECEDOR//////////////////////////////////////   
   
 const nome = document.getElementById('nome'). value;  
 const endereco = document.getElementById('endereco').value; 
 const telefone = document.getElementById('telefone').value;

 fetch('http://localhost:3000/Fornecedor', {
    method:  'POST', 
    headers: { //A FORMa COMO VAI BUSCAR OS DADOS
     'Content-Type': 'application/json'
 },
 
 
 //TRANSFORMA EM UM TEXTO QUE PODE SER LIDO PELO SERVIDOR
   body: JSON.stringify({nome: nome, endereco: endereco, telefone: telefone}) 
 
 })
 
 //RECEBE A RESPONSABILIDADE DA REQUISIÇÃO E TRANSFORMA EM UM  JSOM
 .then(response => response.json()) 
 .then(() => {
     listFornecedor()
     userForm.reset()
 })
 .catch(error => console.error('Erro:' + error))
}); 
});



listFornecedor(); 