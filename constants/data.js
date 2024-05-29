const categories = [
    "backgrounds",
    "fashion",
    "nature",
    "science",
    "education",
    "feelings",
    "health",
    "people",
    "religion",
    "places",
    "animals",
    "industry",
    "computers",
    "food",
    "sports",
    "transportation",
    "travel",
    "buildings",
    "business",
    "music",
]


const filters={
    type:[ "photo", "illustration", "vector"],
    orders:[ "popular", "latest"],
    orientation:["horizontal", "vertical"],
    colors:[
        "red", "orange", "yellow", "green", "turquoise", "blue", "pink", "white", "gray", "black", "brown","violet"
    ]
}

export const data={
    categories,filters
}