import {z} from 'zod';
import { DAYS_OF_THE_WEEK } from './CONSTANTS';

// todo consider using superRefine to make sure the optionals only show up conditionaly
export const wateringScheduleSchema = z.object({
        regularWatering: z.boolean(),
        repetitionPerDay: z.number().optional(),
        timeWateringInSec: z.number().optional(),
        customSchedule: z.array(z.object({
            everyDay: z.boolean(),
            dayOfTheWeek: z.enum(DAYS_OF_THE_WEEK).optional(),
            timeOfTheDay: z.string().time(),
            timeWateringInSec: z.number()}))  
});