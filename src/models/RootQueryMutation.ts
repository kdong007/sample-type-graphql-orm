import { Arg, Field, ID, InputType, Mutation, Query } from "type-graphql";
import Name from "./Name";
import Student from "./Student";
import _ from "lodash";
import { StudentDoc, students } from "../data";
import AddStudentInput from "./AddStudentInput";
import { ApolloError, UserInputError } from "apollo-server";
import { BaseEntity, getRepository } from "typeorm";
import Bike from "./Bike";

export default class RootQuery {
    // root query
    @Query(() => String)
    helloWorld() {
        return "hello world";
    }

    @Query(() => String)
    helloWorld44() {
        return "hello world222";
    }

    // @Query(() => Name)
    // someName() {
    //     const name = new Name();
    //     name.firstName = "Jack";
    //     name.lastName = "Ma"; // Alibaba CEO lol

    //     return name;
    // }

    @Query(() => Student, { nullable: true })
    student(@Arg("id", () => ID) id: string) {
        console.log("looking for student", id);

        const idInt = parseInt(id);
        if (Number.isNaN(idInt)) {
            return null;
        }
        const repo = getRepository(Student);
        return repo.findOne(idInt);
    }

    @Mutation(() => Boolean)
    async addStudent(@Arg("student") inputStudent: AddStudentInput) {
        // id
        let id = inputStudent.id;

        if (id) {
            // check duplicate
            // if found duplicate throw error
            // else do thing

            const s = await Student.findOne(id);
            if (s) {
                throw new ApolloError("ID occupied");
            }
        }

        const student = new Student(
            inputStudent.firstName,
            inputStudent.lastName
        );
        // ignore for now
        // student.id = inputStudent.id;

        await student.save();
        return true;
    }

    @Mutation(() => Boolean)
    async assignBikeToStudent(
        @Arg("sid", () => ID) sid: string,
        @Arg("bid", () => ID) bid: string
    ): Promise<boolean> {
        // n+1 problem, graphql/orm
        // one extra fetch

        // one query
        // update bike studentId = sid where bike.id = bid

        console.log("************ 111");
        const student = await Student.findOne(sid);
        console.log("************ 222");

        const bike = await Bike.findOne(bid);

        // await student.populate("bikes")

        await student.bikes;
        console.log("bikes", student.bikes);
        student.bikes = Promise.resolve((await student.bikes).concat(bike));
        console.log("bikes after push", student.bikes);

        await student.save();
        await bike.save();

        // or casecase
        // student.save({c})

        return true;
    }
}
