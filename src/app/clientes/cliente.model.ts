export class Cliente {
    constructor(        
        public nome: string,
        public cpf: string ,
        public id?: number,
        public dataCadastro?: string   
    ) {}
}