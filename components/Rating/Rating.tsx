import {RatingProps} from "./Rating.props";
import {useEffect, useState, KeyboardEvent} from "react";
import StarIcon from './star.svg'
import cn from "classnames";
import styles from './Rating.module.css'

export const Rating = ({isEditable = false, rating, setRating, ...props}: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>((new Array(5).fill(<></>)))

    useEffect(() => {
        constructRating(rating)
    }, [rating])

    const constructRating = (currentRating: number) => {
        const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span key={i}
                      className={cn(styles.star, {
                          [styles.filled]: i < currentRating,
                          [styles.editable]: isEditable
                      })}
                      onMouseEnter={() => changeDisplay(i + 1)}
                      onMouseLeave={() => changeDisplay(rating)}
                      onClick={() => onClick(i + 1)}
                >
                    <StarIcon

                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
                    />
               </span>
            )
        })
        setRatingArray(updateArray)

        const changeDisplay = (rating: number) => {
            if (!isEditable) {
                return
            }
            constructRating(rating)
        }

        const onClick = (rating: number) => {
            if (!isEditable || !setRating) {
                return
            }
            setRating(rating)
        }

        const handleSpace = (rating: number, e: KeyboardEvent<SVGElement>) => {
            if (!isEditable || e.code != 'Space' || !setRating) {
                return
            }
            setRating(rating)
        }
    }

    return (
        <div {...props}>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
        </div>
    )

}