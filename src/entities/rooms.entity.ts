import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Complexes } from "./complex.entity";

@Entity({
    name: 'rooms'
})

export class Rooms {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "integer",
        nullable: false
    })
    room_count: number;

    @Column ({
        type: 'integer',
        nullable: false
    })
    room_size: number;

    @Column({
        type: 'bigint',
        nullable: false
    })
    ms_cost: bigint;

    @Column({
        type: 'varchar',
        nullable: false
    })
    address: string

    @ManyToOne(() => Complexes, cx => cx.room)
    complex: Complexes
}