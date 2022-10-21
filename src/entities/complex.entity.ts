import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Companies } from "./companies.entity";
import { Houses } from "./house.entity";

@Entity({
    name: 'complexes'
})

export class Complexes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    complex_name: string

    @ManyToOne(() => Companies, c => c.complex)
    Company: Companies;

    @OneToMany(() => Houses, h => h.complex)
    house: Houses 
}