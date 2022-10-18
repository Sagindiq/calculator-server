import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Companies } from "./companies.entity";
import { Rooms } from "./rooms.entity";

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

    @OneToMany(() => Rooms, r => r.complex)
    room: Rooms 
}