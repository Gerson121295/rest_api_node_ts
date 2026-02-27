
import { Column, DataType, Default, Model, Table } from "sequelize-typescript"; //otras decoradores: Default, PrimaryKey,  HasMany,HasOne


//DEFINICION DE TABLAS DE LA DB
@Table({
    tableName: 'products'
})

//CLASE Product  DE LA DB Y SUS ATRIBUTOS
class Product extends Model {
    
    @Column({
        //type: DataType.CHAR(100)  //name es tipo char 100 caracteres
        type: DataType.STRING(100)  //name es tipo string 100 caracteres
    })
    //@Default('')  //Si no se le pasan valores por default  vacio ''
    declare name: string

    @Column({
        type: DataType.FLOAT(6,2) //.INTEGER ->(6,2) 6 digitos y despues del punto 2 digitos
        //type: DataType.DECIMAL(6,2)
    })
    declare price: number

    @Default(true)  //Si no se envia el dato para availability por defecto es True
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product;