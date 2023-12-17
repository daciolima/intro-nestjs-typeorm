import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm"
import { Course } from "./courses.entity"
import { randomUUID } from "node:crypto"


@Entity('tags')
export class Tag {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToMany(() => Course, course => course.tags )
    courses: Course[]

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @BeforeInsert()
    generatedId() {
        if(this.id) {
            return
        }
        this.id = randomUUID()
    }
}