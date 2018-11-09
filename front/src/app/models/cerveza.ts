export class Cerveza {
    constructor(
        public _id: String,
        public nombre: String,
        public origen: String,
        public tipo: String,
        public descripcion_corta: String,
        public descripcion_larga: String,
        public diabeticos: Boolean,
        public graduacion: Number,
        public imagen: String,
        public link_compra: String
    ) {}
}