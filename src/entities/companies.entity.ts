import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { Complexes } from './complex.entity';

@Entity({
    name: 'companies'
})

export class Companies {
    @PrimaryGeneratedColumn ('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    company_name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    company_image: string

    @OneToMany(() => Complexes, cx => cx.company)
    @JoinColumn()
    complex: Complexes[]
}