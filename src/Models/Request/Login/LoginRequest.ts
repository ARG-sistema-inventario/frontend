import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class LoginRequest {
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "Email is invalid" })
    public email: string;

    @IsNotEmpty({ message: "Password is required" })
    @IsString()
    public password: string;

}