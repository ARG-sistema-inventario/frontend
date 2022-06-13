import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class RegisterRequest {
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "Email is invalid" })
    public email: string;

    @IsNotEmpty({ message: "Password is required" })
    @IsString()
    public password: string;

    @IsNotEmpty({ message: "Name is required" })
    @IsString()
    public name: string;

    @IsNotEmpty({ message: "Last Name is required" })
    @IsString()
    public lastName: string;
}