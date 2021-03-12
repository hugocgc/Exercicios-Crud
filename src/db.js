class DB {
    constructor() {
        this.pessoas = [];
    }

    inserir(pessoa) {
        if (! this.buscarPorID(pessoa.id)) {
            this.pessoas.push(pessoa);
        }
    }

    buscarPorID(id) {
        return this.pessoas.find(pessoa => id === pessoa.id)
    }

    excluirPorID(id) {
        this.pessoas = this.pessoas.filter(pessoa => id != pessoa.id)
    }
    
    editar(pessoaEditada) {
        this.pessoas = this.pessoas.map(pessoa => {
            if (pessoa.id === pessoaEditada.id){
                return pessoaEditada;
            }
            
            return pessoa;
        })
    }
}

module.exports = DB;