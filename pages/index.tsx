import type {NextPage} from 'next';
import {Rating} from "../components";
import {useState} from "react";

const Home: NextPage = (): JSX.Element => {
    const [rating, setRating] = useState<number>(4)
    
    return (
        <div>
            <Rating rating={rating} isEditable={true} setRating={setRating}/>
        </div>
    )
}

export default Home;
