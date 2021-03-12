const assert = require('chai').assert
const Pessoa = require('../src/pessoa')
const DB = require('../src/db')

describe('criacao pessoas', () => {
    it('deveria criar uma pessoa só com ID', () => {
        const pessoa = new Pessoa(1)
        assert.containsAllKeys(pessoa, {"id": 1}, 'não contém a id certa')
    })

    it('deveria criar uma pessoa só com todas a propriedades preenchidas', () => {
        const pessoa = new Pessoa(2, 'Dimitri', 1.84, true, [])
        assert.containsAllKeys(pessoa, ['id', 'nome', 'altura', 'cancelado', 'amigos'], 'não contém todas as propriedades')
    })
})

describe('insercao de pessoas', () => {
    it('deve inserir um pessoa', () => {    
        //setup
        const db = new DB();
        const pessoa = new Pessoa(20);

        //execution
        assert.lengthOf(db.pessoas, 0, 'A lista de pessoas deveria ter 0');
        db.inserir(pessoa);

        //assert
        assert.lengthOf(db.pessoas, 1, 'A lista de pessoas deveria ter 1');
    })

    it('não inserir quando ID já existe', () => {
        //setup
        const db = new DB();
        db.inserir(new Pessoa(1));

        //execution
        db.inserir(new Pessoa(1));

        //assert
        assert.lengthOf(db.pessoas, 1, 'A lista de pessoas deveria ter 1');
    })
})

describe('buscar pessoas', () => {
    it('deve buscar uma pessoa pelo ID', () => {
        //setup
        const db = new DB();
        db.inserir(new Pessoa(1));
        
        //execution
        const pessoaComId1 = db.buscarPorID(1)

        //assert
        assert.containsAllKeys(pessoaComId1, {'id': 1}, 'deveria achar a pessoa com ID 1')
    })

    it('deveria achar uma pessoa pelo ID no meio da multidão', () => {
        //setup
        const db = new DB();
        db.inserir(new Pessoa(1));
        db.inserir(new Pessoa(2));
        db.inserir(new Pessoa(5));
        db.inserir(new Pessoa(4));
        db.inserir(new Pessoa(3));
        
        //execution
        const pessoaComId5 = db.buscarPorID(5)

        //assert
        assert.containsAllKeys(pessoaComId5, {'id': 5}, 'deveria achar a pessoa com ID 5')        
    })

    it ('Deveria dizer que não achou uma pessoa com ID inexistente', () => {
        //setup
        const db = new DB();
        db.inserir(new Pessoa(1));
        db.inserir(new Pessoa(2));
        db.inserir(new Pessoa(5));
        db.inserir(new Pessoa(4));
        db.inserir(new Pessoa(3));
        
        //execution
        const pessoaInexistente = db.buscarPorID(6)

        //assert
        assert.notExists(pessoaInexistente, 'Não deveria achar pessoa com ID 6')          
    })
})

describe('excluir pessoas', () => {
    it('deve excluir uma pessoa', () => {
        //setup
        const db = new DB();
        db.inserir(new Pessoa(1));
        db.inserir(new Pessoa(2));
        db.inserir(new Pessoa(5));
        db.inserir(new Pessoa(4));
        db.inserir(new Pessoa(3));

        //execution
        db.excluirPorID(1);
        
        //assert
        assert.notExists(db.buscarPorID(1), 'Não deve mais existir pessoa com ID 1')
    })
    it('não deve excluir ninguem se o ID não existir', () => {
        //setup
        const db = new DB();
        db.inserir(new Pessoa(1));
        db.inserir(new Pessoa(2));
        db.inserir(new Pessoa(5));
        db.inserir(new Pessoa(4));
        db.inserir(new Pessoa(3));
        const tamanhoDoDb = db.pessoas.length

        //execution
        db.excluirPorID(10);
        
        //assert
        assert.lengthOf(db.pessoas, tamanhoDoDb, 'Tamanho do DB deve se manter o mesmo')
    })
})

describe('Edição de pessoas', () => {
    it('deve editar uma pessoa', () => {
        //setup
        const db = new DB();
        db.inserir(new Pessoa(1));
        db.inserir(new Pessoa(2, 'banana'));
        db.inserir(new Pessoa(5));
        db.inserir(new Pessoa(4));
        db.inserir(new Pessoa(3));

        //execution
        db.editar(new Pessoa(2, 'maça'))

        //assert
        assert.equal(db.buscarPorID(2).nome, 'maça', 'Nome da pessoa 2 deve ser alterada pra maça')
    })
})