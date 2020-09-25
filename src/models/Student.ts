import { Field, ID, ObjectType } from "type-graphql";
import Name from "./Name";

@ObjectType()
export default class Student {
    @Field(() => ID)
    id: string;

    // really nullable
    @Field({ nullable: true })
    name?: Name;

    // non null on graphql
    // only nullable in typescript
    // @Field()
    // name?: Name;
}
