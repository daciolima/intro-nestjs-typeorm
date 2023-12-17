import { IsString } from "class-validator"
import { PartialType } from "@nestjs/mapped-types"

export class CreateCourseDTO {

    @IsString()
    readonly name: string
    
    @IsString()
    readonly description: string
    
    @IsString({each: true})
    readonly tags: string[]
}

// Herdando propriedades de outro DTO pde forma parcial ou não evitando redundância.
export class UpdateCourseDTO extends PartialType(CreateCourseDTO) {}