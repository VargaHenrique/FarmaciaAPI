const dadosc = require('./data/dados.json')
const dadosf = require('./data/dados.json')
const dadosm = require('./data/dados.json')
const dadosv = require('./data/dados.json')

const express = require('express');
const fs = require('fs'); 
//const dados = require('./data/dados.json');
const cors = require('cors'); 


const server = express();
server.use(cors());
server.use(express.json()); 


server.get('/', (req, res) => {
    return res.json({mensagem: 'Nossa API está funcionando'});
});


server.listen(3000, () =>{
console.log("Servidor está funcionando!");
});


//Função que salva os dados
function salvarDadosC(){
    fs.writeFileSync(__dirname + '/data/Cliente.json', JSON.stringify(dadosc, null, 2));
}
function salvarDadosM(){
    fs.writeFileSync(__dirname + '/data/Medicamento.json', JSON.stringify(dadosm, null, 2));
}
function salvarDadosF(){
    fs.writeFileSync(__dirname + '/data/Fornecedor.json', JSON.stringify(dadosf, null, 2));
}
function salvarDadosV(){
    fs.writeFileSync(__dirname + '/data/Venda.json', JSON.stringify(dadosv, null, 2));
}



//GET - Buscar um ou mais recursos no servidor
server.get('/Medicamento', (req, res) => {
    return res.json(dadosm.Medicamento);
});

server.get('/Cliente', (req, res) => {
    return res.json(dadosc.Cliente);
});

server.get('/Fornecedor', (req, res) => {
    return res.json(dadosf.Fornecedor);;
});

server.get('/Venda', (req, res) => {
    return res.json(dadosv.Venda);
});



//DELETE - Deletar um recurso no servidor
server.delete('/Medicamento/:id', (req, res)=>{
    const id = parseInt(req.params.id); //pega o parametro da rota

    dadosm.Medicamento = dadosm.Medicamento.filter(u => u.id != id); //retorna todos os medicamentos que não tem o mesmo id do fil

    salvarDadosM(dadosm);

    return req.status(200).json({mensagem: "Medicamento excluido com sucesso"})
});


server.delete('/Cliente/:id', (req, res)=>{
    const id = parseInt(req.params.id); //pega o parametro da rota

    dadosc.Cliente = dadosc.Cliente.filter(u => u.id != id); //retorna todos os medicamentos que não tem o mesmo id do fil

    salvarDadosC(dadosc);

    return req.status(200).json({mensagem: "Cliente excluido com sucesso"})
});

server.delete('/Fornecedor/:id', (req, res)=>{
    const id = parseInt(req.params.id); //pega o parametro da rota

    dadosf.Fornecedor = dadosf.Fornecedor.filter(u => u.id != id); //retorna todos os medicamentos que não tem o mesmo id do fil

    salvarDadosF(dadosf)
    
    return req.status(200).json({mensagem: "Fornecedor excluido com sucesso"})
});

server.delete('/Venda/:id', (req, res)=>{
   
    const id = parseInt(req.params.id); //pega o parametro da rota
    


    dadosv.Venda = dadosv.Venda.filter(u => u.id != id); //retorna todos os medicamentos que não tem o mesmo id do fil

    salvarDadosV(dadosv);
    
    return req.status(200).json({mensagem: "Venda excluido com sucesso"})
});




//POST - Criar um novo recurso no servidor
server.post("/Medicamento", (req, res) =>{
    const novoMedicamento = req.body

    const id = Date.now().toString();

    if(!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade){
        return res.status(400).json({mensagem: "Dados incompletos"});
    }else{

        novoMedicamento.id = id; 

        dadosm.Medicamento.push(novoMedicamento )
        
        salvarDadosM(dadosm)

        return res.status(201).json({mensagem: "Dados Completos"});
    }

});

server.post("/Cliente", (req, res) =>{
    const novoCliente = req.body

    if(!novoCliente.nome || !novoCliente.endereco || !novoCliente.quantidade || !novoCliente.telefone){
        return res.status(400).json({mensagem: "Dados incompletos"});
    }else{
        dadosc.Cliente.push(novoCliente)
        salvarDadosC(dadosc)

        return res.status(201).json({mensagem: "Dados Completos"});
    }
});

server.post("/Fornecedor", (req, res) =>{
    const novoFornecedor = req.body

    if(!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone){
        return res.status(400).json({mensagem: "Dados incompletos"});
    }else{
        dadosf.Fornecedor.push(novoFornecedor)
        salvarDadosF(dadosf)

        return res.status(201).json({mensagem: "Dados Completos"});
    }
});

server.post("/Venda", (req, res) =>{
    const novoVenda = req.body

    if(!novoVenda.data){
        return res.status(400).json({mensagem: "Dados incompletos"});
    }else{
        dadosv.Venda.push(novoVenda)
        salvarDadosV(dadosv)

        return res.status(201).json({mensagem: "Dados Completos"});
    }
});


//PUT  - Atualizar um recurso no servidor

server.put('/Medicamento/:id', (req, res) =>{
 
    const medicamentoId = parseInt(req.params.id); //pegar
    const atualizarMedicamento = req.body; //oque eu quero alterar

    const indiceMedicamento = dadosm.Medicamento.findIndex(u => u.id === medicamentoId)

    if(indiceMedicamento === -1){
        return res.status(484).json({mensagem: "Usuário não encontrado"})
    }else{
        dadosm.Medicamento[indiceMedicamento].id = atualizarMedicamento.id || dadosm.Medicamento[indiceMedicamento].id

        dadosm.Medicamento[indiceMedicamento].nome = atualizarMedicamento.nome || dadosm.Medicamento[indiceMedicamento].nome
        dadosm.Medicamento[indiceMedicamento].fabricante = atualizarMedicamento.fabricante || dadosm.Medicamento[indiceMedicamento].fabricante
        dadosm.Medicamento[indiceMedicamento].preco = atualizarMedicamento.quantidade || dadosm.Medicamento[indiceMedicamento].quantidade
        dadosm.Medicamento[indiceMedicamento].quantidade = atualizarMedicamento.quantidade || dadosm.Medicamento[indiceMedicamento].quantidade
        
        salvarDadosM(dadosm)

        return res.status(201).json({mensagem: "Dados completos, atualização feita com sucesso"})
    }
});

server.put('/Cliente/:id', (req, res) =>{
 
    const clienteId = parseInt(req.params.id); //pegar
    const atualizarCliente = req.body; //oque eu quero alterar

    const indiceCliente = dadosc.Cliente.findIndex(u => u.id === clienteId)

    if(indiceCliente === -1){
        return res.status(484).json({mensagem: "Usuário não encontrado"})
    }else{
        dadosc.Cliente[indiceCliente].id = atualizarUser.id || dados.Cliente[indiceCliente].id

        dadosc.Cliente[indiceCliente].nome = atualizarCliente.nome || dadosc.Cliente[indiceCliente].nome
        dadosc.Cliente[indiceCliente].endereco = atualizarCliente.endereco || dadosc.Cliente[indiceCliente].endereco
        dadosc.Cliente[indiceCliente].email = atualizarCliente.email || dadosc.Cliente[indiceCliente].email
        dadosc.Cliente[indiceCliente].telefone = atualizarCliente.telefone || dadosc.Cliente[indiceCliente].telefone
        
        
        salvarDadosC(dadosc)

        return res.status(201).json({mensagem: "Dados completos, atualização feita com sucesso"})
    }
});

server.put('/Fornecedor/:id', (req, res) =>{
 
    const fornecedorId = parseInt(req.params.id); //pegar
    const atualizarFornecedor = req.body; //oque eu quero alterar

    const indiceFornecedor = dadosf.Fornecedor.findIndex(u => u.id === fornecedorId)

    if(indiceFornecedor === -1){
        return res.status(484).json({mensagem: "Usuário não encontrado"})
    }else{
        dadosf.Fornecedor[indiceFornecedor].id = atualizarFornecedor.id || dadosf.Fornecedor[indiceFornecedor].id

        dadosf.Fornecedor[indiceFornecedor].nome = atualizarFornecedor.nome || dadosf.Fornecedor[indiceFornecedor].nome
        dadosf.Fornecedor[indiceFornecedor].endereco = atualizarFornecedor.endereco || dadosf.Fornecedor[indiceFornecedor].endereco
        dadosf.Fornecedor[indiceFornecedor].telefone = atualizarFornecedor.telefone || dadosf.Fornecedor[indiceFornecedor].telefone
        
        salvarDadosF(dadosf)

        return res.status(201).json({mensagem: "Dados completos, atualização feita com sucesso"})
    }
});

server.put('/Venda/:id', (req, res) =>{
 
    const vendaId = parseInt(req.params.id); //pegar
    const atualizarVenda = req.body; //oque eu quero alterar

    const indiceVenda = dadosv.Venda.findIndex(u => u.id && cliente_id && medicamento_id === vendaId)

    if(indiceVenda === -1){
        return res.status(484).json({mensagem: "Usuário não encontrado"})
    }else{
        dadosv.Venda[indiceVenda].id = atualizarUser.id || dadosv.Venda[indiceVenda].id

        dadosv.Venda[indiceVenda].data = atualizarVenda.data || dadosv.Venda[indiceVenda].data
        dadosv.Venda[indiceVenda].cliente_id = atualizarVenda.cliente_id || dadosv.Venda[indiceVenda].cliente_id
        dadosv.Venda[indiceVenda].medicamento_id = atualizarVenda.medicamento_id || dadosv.Venda[indiceVenda].medicamento_id
        
        salvarDadosV(dadosv)

        return res.status(201).json({mensagem: "Dados completos, atualização feita com sucesso"})
    }
});


