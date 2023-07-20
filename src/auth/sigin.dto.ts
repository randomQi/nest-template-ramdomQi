import { IsEmpty, IsNotEmpty, IsString, Length } from "class-validator";

export default class SiginDto {
  // $value 用户传入的值
  // $value - the value that is being validated
  // $property - name of the object's property being validated
  // $target - name of the object's class being validated
  // $constraint1, $constraint2, ... $constraintN - constraints defined by specific validation type

  @IsString()
  @IsNotEmpty({message: '用户名不能为空'})
  @Length(3,9, {message: '用户名长度必须在$constraint1到$constraint2之间，当前传递的值是：$value'})
  username:string

  @IsString()
  @IsNotEmpty()
  password: string
}
