import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateAssetRequest {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsBoolean()
    public stock: boolean;

    @IsNotEmpty()
    @IsNumber()
    public stockAmount: number;

    @IsNotEmpty()
    @IsNumber()
    public price: number;

    @IsNotEmpty()
    @IsNumber()
    public categoryId: number;

}