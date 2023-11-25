export type TUser = {
    email: string,
    name: string,
    age: number,
    password: string,
    address: string,
    educationLevel: string
}

export type TArticle ={
    writerId?: String,
    title: String,
    theme: String,
    content: String,
    publicationDate: Date,
    presentationDate: Date
};

export type TFeedback = {
    date: Date,
    user: TUser,
    content: string
}

export type TEvent = {
    name: string,
    description: string,
    theme: string,
    organizingCommitte: string,
    startDate: Date,
    endDate: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    location:  {
        type: 'Point',
        coordinates: number[]
    },
    feedbacks: TFeedback[]
}

export type DefaultError = {
    error: string,
    status: number
}
