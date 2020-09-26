import { InputType, ID, Field, Int } from "type-graphql";
import { UserInputError } from "apollo-server";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export default class AddStudentInput {
    @Field(() => Int, { nullable: true })
    id?: number;

    // min 4 char, max 16 chars
    // @MinLength(4)
    // @MaxLength(16)
    @Field()
    firstName: string;

    // min 4 char, max 16 chars
    @Field()
    lastName: string;

    // kunal, 99% Ryan
    // option 1
    // status 4xx
    // res {error:xxx}
    // throw new ApolloError(...) + formatError
    // ApolloClient

    // meet, 1% Ryan
    // options 2
    // status 200
    // res {error:xxx}
    // throw new ApolloError(...)
    // ApolloClient

    // option 3
    // status 200
    // res {error:null, data: {success:false, message:"xxxx"}}
    // no throw, sample-graphql

    // validations ..
    // validate() {
    //     // validations ..
    //     if (this.firstName.length < 4 || this.firstName.length > 16) {
    //         throw new UserInputError("invalid first name");
    //     }
    // }
}
