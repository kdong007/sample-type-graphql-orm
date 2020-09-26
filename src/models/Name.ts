import { Field, ObjectType, Query } from "type-graphql";

// -- client
//
// * graphql object type
//
// |-- api-server-----|
// |* ts class/object |
// |------------------|
//
// |-- db ----|
// | * table  |
// |----------|

// export default is not required by typeOMR/typeGraphql

// all fields public, (no modifier)

@ObjectType()
export default class Name {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    // getter, name.fullName
    // get fullName() {
    //     return this.firstName + "," + this.lastName;
    // }

    // function, name.fullName()
    @Field(() => String) // String cap, String class

    // string lower, string type (only in ts, not js)
    fullName(): string {
        return this.firstName + "," + this.lastName;
    }
}
