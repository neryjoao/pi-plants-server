import {Info} from 'luxon';

export const ERRORS = {
    RESOURCE_NOT_FOUND: `Resource not found`,
    WRITING_ERROR: `Issue when updating a resource detail`
}

export const PLANT_FIELDS = {
    NAME: `name`,
    THRESHOLD: `waterThreshold`,
    WATERING_MODE: `wateringMode`,
    IS_ON: `isOn`
};


export const DAYS_OF_THE_WEEK = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ] as const;


export const coco = ['asdf', 'qweer'] as const;

export const WATERING_MODES: {[name: string]: string} = {
    AUTOMATIC: `AUTOMATIC`,
    MANUAL: `MANUAL`,
    SCHEDULED: `SCHEDULED`
};
