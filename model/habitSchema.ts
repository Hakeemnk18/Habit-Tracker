import { count } from "console";
import mongoose,{Schema,Document} from "mongoose";
import { start } from "repl";

interface iHabit extends Document{
    name:string;
    count:number;
    startDate:Date;
    endDate?:Date;
}

interface GoodHabit extends iHabit{
    type:string
}

interface BadHabit extends iHabit{
    type:string
}

const HabitSchema: Schema = new Schema({
        name:{type:String,require:true},
        startDate:{type:Date,required:true},
        endDate:{type:Date},
        count:{type:Number,required:true}

    } 
)


const GoodHabit = mongoose.model<GoodHabit>("GoodHabit", HabitSchema);
const BadHabit = mongoose.model<BadHabit>("BadHabit", HabitSchema);

export { GoodHabit, BadHabit };