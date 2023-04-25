import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Developer {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    level: string
}