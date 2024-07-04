export class TourShortInfo {
    name?: string;
    difficulty?: string;
    guides?: any[];
    price?: number;
    tourWeekend?: any;
    id?: string;
}



export class Tour {
    startLocation?: StartLocation;
    ratingsAverage: number = 0;
    ratingsQuantity?: number;
    images?: string[];
    startDates: string[] = [];
    guides?: any[];
    _id?: string;
    name?: string;
    slug?: string;
    duration?: number;
    maxGroupSize?: number;
    difficulty?: string;
    price?: number;
    summary?: string;
    description?: string;
    imageCover?: string;
    locations: Coordinates[] = [];
    tourWeekend?: number;
    id?: string;
}

interface Coordinates {
    coordinates: number[];
    description: string;
    type: string;
    day?: number;
}

interface StartLocation {
    description: string;
    type: string;
    coordinates: number[];
    address: string;
}