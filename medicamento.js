//USER FORM ENVIA OS DADOS PAR O FORMULARIO
const medicamentoForm = document.getElementById('medicamento-form');

//MoSTRA DOS DADOS DO BD
const medicamentoList = document.getElementById('medicamento-list');

let medicamentosArrayLength = 0



function listMedicamento(){
   fetch('http://localhost:3000/Medicamento')
    .then(response => response.json())
    .then((data) => {
        medicamentoList.innerHTML += '';
        medicamentosArrayLength = data.length;
        data.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `${user.id}- ${user.nome} - Fabricante: ${user.fabricante} - Preço: ${user.preco} - Quantidade: ${user.quantidade}`;

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Deletar';
            deleteButton.addEventListener('click', () => deleteMedicamento(user.id));
            li.appendChild(deleteButton);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Editar';
            updateButton.addEventListener('click', () => editMedicamento(user.id));
            li.appendChild(updateButton);

            medicamentoList.appendChild(li);
        });
    })
    .catch(error => console.error('Erro:', error));

    
    }
 

    function deleteMedicamento(id) {
        fetch(`http://localhost:3000/Medicamento/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            // Depois que a exclusão for bem-sucedida, podemos atualizar a lista de medicamentos
            listMedicamento();
        })
        .catch(error => console.error('Erro:', error));
    }
    
    function editMedicamento(id) {
    
        const newId = prompt("Novo id:");
        const newNome = prompt("Novo nome:");
        const newFabricante = prompt("Novo fabricante:");
        const newPreco = prompt("Novo preço:");
        const newQuantidade = prompt("Nova quantidade:");

    
        if (newId && newNome && newFabricante && newPreco && newQuantidade) {
            fetch(`http://localhost:3000/Medicamento/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: newId, nome: newNome, fabricante: newFabricante, preco: newPreco, quantidade: newQuantidade }),
                
            })                
            .then(() => listMedicamento())
            .catch(error => console.error('Erro:', error));
        }    
}


    


medicamentoForm.addEventListener('submit', (e) => {

e.preventDefault(); //PREVENÇÃO PADRÃO DE ERRO
fetch('http://localhost:3000/Medicamento')
    .then(response => response.json())
    .then(data => {
        let id = medicamentosArrayLength + 1

        data.forEach(medicamento => {
            if (medicamento.id == id) {
                id++;
            }
        });

   ///////////////////////////////////MEDICAMENTO///////////////////////////////////

   const nome = document.getElementById('nome').value;
   const fabricante = document.getElementById('fabricante').value;
   const preco = document.getElementById('preco').value;
   const quantidade = document.getElementById('fabricante').value;


fetch('http://localhost:3000/Medicamento', {
   method:  'POST', 
   headers: { //A FORMa COMO VAI BUSCAR OS DADOS
    'Content-Type': 'application/json'
},


//TRANSFORMA EM UM TEXTO QUE PODE SER LIDO PELO SERVIDOR
  body: JSON.stringify({nome: nome, fabricante: fabricante, preco: preco, quantidade: quantidade}) 

})

//RECEBE A RESPONSABILIDADE DA REQUISIÇÃO E TRANSFORMA EM UM  JSOM
.then(response => response.json()) 
.then(() => {
    listMedicamento()
    medicamentoForm.reset()
})
.catch(error => console.error('Erro:' + error))

}); 
});


listMedicamento();
