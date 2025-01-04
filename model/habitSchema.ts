import { count, timeStamp } from "console";
import mongoose,{Schema,Document} from "mongoose";
import { start } from "repl";

interface iHabit extends Document{
    name:string;
    count:number;
    startDate:Date;
    endDate?:Date;
    description:string;
    status:"active" | "stoped"
}

interface GoodHabit extends iHabit{
    type:'good'
}

interface BadHabit extends iHabit{
    type:'bad'
}

const HabitSchema: Schema = new Schema({
        name:{type:String,require:true},
        description:String,
        startDate:{type:Date,required:true},
        endDate:{type:Date},
        count:{type:Number,required:true},
        status:{type:String,enum:["active","stoped"],default:"active"},
        type:{type:String,required:true,enum:["good","bad"]}

    },
    {timestamps:true} 
)


const GoodHabit = mongoose.model<GoodHabit>("GoodHabit", HabitSchema);
const BadHabit = mongoose.model<BadHabit>("BadHabit", HabitSchema);

export { GoodHabit, BadHabit };