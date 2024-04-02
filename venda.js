//USER FORM ENVIA OS DADOS PAR O FORMULARIO
const vendaForm = document.getElementById('venda-form');

//MoSTRA DOS DADOS DO BD
const vendaList = document.getElementById('venda-list');
let vendaArrayLength = 0



function listVenda(){
    fetch('http://localhost:3000/Venda')
    .then(response => response.json())  
    .then((data) => {
    vendaList.innerHTML += ''
    data.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `${id4} - ${user, data}`
    
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Deletar';
        deleteButton.addEventListener('click', () => deleteUser(user.id4, user.cliente_id, user.medicamento_id)); // Chama a função deleteUser com o ID do usuário
        li.appendChild(deleteButton);
    
    
        const updateButton = document.createElement('button');
        updateButton.innerText =  'Editar';
        updateButton.addEventListener('click', () => editUser(user.id4, user.cliente_id, user.medicamento_id));
        li.appendChild(updateButton);
    
        userList.appendChild(li)
    
    });
    
    })
    .catch(error => console.error('Erro:' + error))
    
}

function deleteVenda(id, cliente_id, medicamento_id) {
    fetch(`http://localhost:3000/Venda/${id, cliente_id, medicamento_id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(listVenda())
    .catch(error => console.error('Erro:', error));
}

userForm.addEventListener('submit', (e) => {

    e.preventDefault(); //PREVENÇÃO PADRÃO DE ERRO

    let id = vendaArrayLength + 1

    fetch('http://localhost:3000/medicamentos')
        .then(response => response.json())
        .then(data => {
            data.forEach(medicamento => {
                if (medicamento.id == id) {
                    id++;
                }
            });
 /////////////////////////////////////VENDAS//////////////////////////////////////   

 const data = document.getElementById('data').value;

 /////////////////////VENDAS//////////////////////


fetch('http://localhost:3000/Venda', {
    method:  'POST', 
    headers: { //A FORMa COMO VAI BUSCAR OS DADOS
     'Content-Type': 'application/json'
 },
 
 
 //TRANSFORMA EM UM TEXTO QUE PODE SER LIDO PELO SERVIDOR
 body: JSON.stringify({data: data}) 

})
 
 //RECEBE A RESPONSABILIDADE DA REQUISIÇÃO E TRANSFORMA EM UM  JSOM
 .then(response => response.json()) 
 .then(() => {
     listVenda()
     vendaForm.reset()
 })
 .catch(error => console.error('Erro:' + error))
}); 
});




listVenda(); 