class Ingreso extends Dato {
    //Identificador unico
    static contadorIngresos = 0;

    //Como hereda de la clase padre se debe especificar los atributos de dicha clase

    //Constructor
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Ingreso.contadorIngresos;
    }

    // La clase al solo tener el identificador no se realiza los setter ya que no es modificable

    get id(){
        return this._id;
    }
}