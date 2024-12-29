import {z} from 'zod';

// todo consider using superRefine to make sure the optionals only show up conditionaly
export const wateringScheduleSchema = z.object({
        constantPeriodicWatering: z.boolean(),
        repetitionPerDay: z.number().optional(),
        timeWateringInSec: z.number().optional(),
        customSchedule: z.array(z.object({
            everyDay: z.boolean(),
            dayOfTheWeek: z.enum([`MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`]).optional(),
            timeOfTheDay: z.string().time(),
            timeWateringInSec: z.number()})).optional()    
});