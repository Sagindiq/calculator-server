import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Complexes } from "./complex.entity";

@Entity({
    name: 'houses'
})

export class Houses {
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
    house_size: number;

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

    @ManyToOne(() => Complexes, cx => cx.house)
    complex: Complexes
}