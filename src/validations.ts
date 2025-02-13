import {z} from 'zod';
import { DAYS_OF_THE_WEEK } from './CONSTANTS';

export const wateringScheduleSchema = z.object({
        regularWatering: z.boolean(),
        repetitionPerDay: z.number().optional(),
        timeWateringInSec: z.number().optional(),
        customSchedule: z.array(z.object({
            everyDay: z.boolean(),
            dayOfTheWeek: z.enum(DAYS_OF_THE_WEEK).optional(),
            timeOfTheDay: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
            timeWateringInSec: z.number()}))  
}).superRefine((arg, ctx) => {
    const {regularWatering, repetitionPerDay, timeWateringInSec, customSchedule} = arg;
    if (regularWatering && (!repetitionPerDay || !timeWateringInSec)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Needs repetitionPerDay and timeWateringInSec if regularWatering is set to true`
        });
    }

    customSchedule.forEach(schedule => {
        if (!schedule.everyDay && !schedule.dayOfTheWeek) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `If it is not watering every day, then it is necessary a week day`
            })
        };
    });
});