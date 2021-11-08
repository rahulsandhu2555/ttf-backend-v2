const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema(
    {
        name: String,
        url: String,
        profile_pic: String,
        citizenship: String,
        gender: String,
        type: String,
        languages: String,
        birth: {
            dob: String,
            location: String,
            birth_location: String
        },
        personal: {
            height: String,
            weight: Number,
            eye_color: String,
            hair_color: String,
            chest: Number,
            waist: Number,
            biceps: Number
        },
        religion: {
            star_sign: String,
            religion: String,
            family: String,
            caste: String,
            ethnicity: String
        },
        hobbies: [String],
        profession: [String],
        family: {
            blood_relation: {
                blood_father: {
                    name: String,
                    dob: String,
                    age: String,
                    occupation: String,
                    is_dead: String,
                    death_date: String,
                    total_child: Number
                },
                blood_mother: {
                    name: String,
                    dob: String,
                    age: String,
                    occupation: String,
                    is_dead: String,
                    death_date: String,
                    total_child: Number
                },
                blood_brother: [
                    {
                        name: String,
                        dob: String,
                        age: String,
                        occupation: String,
                        is_dead: String,
                        death_date: String,
                        total_child: Number
                    }
                ],
                blood_sister: [
                    {
                        name: String,
                        dob: String,
                        age: String,
                        occupation: String,
                        is_dead: String,
                        death_date: String,
                        total_child: Number
                    }
                ]
            }
        },
        education: {
            highest_education: String,
            school_college: [
                {
                    class: String,
                    school: String,
                    year: Number,
                    comment: String
                }
            ]
        },
        relationships: [
            {
                name: String,
                type: String,
                relation: String,
                duration: String,
                occupation: String,
                famous_for: String,
                interesting_points: [String]
            }
        ],
        marriages: [
            {
                name: String,
                marriage_date: Date,
                occupation: String,
                children: [
                    {
                        relation: String,
                        name: String,
                        dob: Date
                    }
                ],
                is_divorced: Boolean,
                divorce_date: Date
            }
        ],
        relatives: [
            {
                name: String,
                relation: String,
                comment: String
            }
        ],
        facts: [String],
        category: String
    }
);

module.exports=  mongoose.model("celebrities", celebritySchema);
