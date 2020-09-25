import { Arg, Field, ID, InputType, Mutation, Query } from "type-graphql";
import Name from "./Name";
import Student from "./Student";
import _ from "lodash";
import { StudentDoc, students } from "../data";

@InputType()
class AddStudentInput {
    @Field(() => ID, { nullable: true })
    id?: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}

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

    @Query(() => Name)
    someName() {
        const name = new Name();
        name.firstName = "Jack";
        name.lastName = "Ma"; // Alibaba CEO lol

        return name;
    }

    @Query(() => Student, { nullable: true })
    student(@Arg("id", () => ID) id: string) {
        console.log("looking for student", id);

        // const doc = _.find(students, { id });
        const doc = students.find(s => s.id === id);

        console.log("found doc", doc);
        if (!doc) {
            return null;
        }

        // this part is ORM's job
        const s = new Student();
        s.id = doc.id;
        s.name = new Name();
        s.name.firstName = doc.firstName;
        s.name.lastName = doc.lastName;
        return s;
    }

    @Mutation(() => Boolean)
    addStudent(@Arg("student") student: AddStudentInput) {
        // id
        let id = student.id;

        if (!id) {
            // generate
            id = _.random(1000, 9999) + "";
            // loop, check existance re-roll if used
        } else {
            // check duplicate
            // if found duplicate throw error
            // else do thing

            if (_.find(students, { id })) {
                // insert failed
                return false;
            }
        }

        // convert input object to doc (db object)
        // typeORM's job
        const doc: StudentDoc = {
            id: id,
            firstName: student.firstName,
            lastName: student.lastName,
        };

        students.push(doc);

        return true;
    }
}
