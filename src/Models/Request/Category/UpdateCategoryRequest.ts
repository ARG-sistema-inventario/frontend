import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class UpdateCategoryRequest {
    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public description: string;

    @IsOptional()
    @IsBoolean()
    public status: boolean;

}