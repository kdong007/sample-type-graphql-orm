import { Field, ID, ObjectType } from "type-graphql";
import Name from "./Name";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";
import Bike from "./Bike";

@ObjectType()
@Entity({ name: "student_table" })
// BaseEntity = ActiveRecord style
export default class Student extends BaseEntity {
    constructor(fName, lName) {
        super();
        this.name = new Name(fName, lName);
    }
    @Field(() => ID)
    // @PrimaryColumn()
    // mysql, int + auto increment
    // postgres, serial
    @PrimaryGeneratedColumn()
    id: number;

    // really nullable

    @Field({ nullable: true })
    @Column({ type: "jsonb" })
    name?: Name;

    // non null on graphql
    // only nullable in typescript
    // @Field()
    // name?: Name;

    @Field(() => [Bike])
    @OneToMany(() => Bike, bike => bike.student, { lazy: true })
    bikes: Promise<Bike[]>;

    // ts typing: Bike[]
    // ()=> .... (write value)
    // -- Bike[] is not syntax for  value
    // -- [Bike] this is syntax for value
}
