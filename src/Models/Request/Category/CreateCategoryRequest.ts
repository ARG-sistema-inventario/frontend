import { IsNotEmpty, IsString } from "class-validator";

export default class CreateCategoryRequest {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

}