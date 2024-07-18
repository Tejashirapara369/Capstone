export class ReviewPayload {
    review: string;
    rating: number;
}

export class Review {
    _id: string;
    review: string;
    rating: number;
    createdAt: string;
    tour: string;
    user: {
        _id: string;
        name: string,
        photo: string;
    };
    id: string;
}