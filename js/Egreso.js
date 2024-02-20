class Egreso extends Dato {

    //Debe tener un identificador unico
    static contadorEgresos = 0;

    //constructor que herada los parametro de la clase padre dato
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Egreso.contadorEgresos;
    }

    // Getter de la clase

    get id(){
        return this._id;
    }

    //Sin Setter ya que el id no es modificable
}