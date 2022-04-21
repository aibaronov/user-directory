import React, {useState} from 'react';


function Card(props){
    const firstName = props.userData.name.first;
    const lastName = props.userData.name.last;
    const city = props.userData.city;
    const country = props.userData.country;
    const title = props.userData.title;
    const employer = props.userData.employer;
    const movies = props.userData.favoriteMovies;
    return(
        <div>
            <div className='user-id'>{props.userData.id}</div>
            <div className='user-info'>
                <h2>{firstName} {lastName}</h2>
                <p><strong>From: </strong>{city}, {country}</p>
                <p><strong>Job Title: </strong>{title}</p>
                <p><strong>Employer: </strong>{employer}</p> <br></br>

                <strong>Favorite Movies: </strong>
            </div>
            <div className='favorite-movies'>
                <ol>
                    {movies.map((movie) => {
                        return (
                            <li key={movie}>{movie}</li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

export default Card