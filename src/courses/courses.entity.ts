import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm"
import { Tag } from "./tags.entity"
import { randomUUID } from "node:crypto"


@Entity('courses')
export class Course {
    
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn({type: 'timestamp', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()' })
    updated_at: Date;
    
    // 1º parmetro => É a entity alvo e o 2º parametro é a coluna da entity alvo que se relaciona com a entity principal. Course.
    // 3º parametro(cascade) => permite população no campo tags(ManyToMany)
    @JoinTable() // Esse Decorator JoinTable torna essa entity a principal nesse relacionamento ManyToMany.
    @ManyToMany(() => Tag, tag => tag.courses, {cascade: true} )
    tags: Tag[]


    @BeforeInsert()
    generatedId() {
        if(this.id) {
            return
        }
        this.id = randomUUID()
    }


}