class Pessoa {
    constructor(id, nome = '', altura = 0, cancelado = false, amigos = []){
        this.id = id
        this.nome = nome
        this.altura = altura
        this.cancelado = cancelado
        this.amigos = amigos
    } 
}

module.exports = Pessoa