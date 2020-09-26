import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { Field, ObjectType, ID, Mutation, Arg } from "type-graphql";
import Student from "./Student";

@Entity()
@ObjectType()
export default class Bike extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    color: string;

    @Field()
    @Column()
    brand: string;

    @ManyToOne(() => Student, student => student.bikes)
    student: Student;

    @Mutation(() => Boolean)
    async addBike(@Arg("color") color: string, @Arg("brand") brand: string) {
        const bike = new Bike();
        bike.color = color;
        bike.brand = brand;
        await bike.save();

        return true;
    }
}
