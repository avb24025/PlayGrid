    import react from 'react';
    import TurfModal from './Turf.modal';

    function Card({turf,onClick }) {
        return (
            <>
            <div className="card bg-base-100 w-80 md:w-90 shadow-sm hover:scale-105 duration-300 dark:bg-white dark:text-black"
                onClick={() => onClick(turf)}>
    <figure>
        <img
        src={turf.image}
        alt="Shoes" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">
        {turf.name}
        <div className="badge badge-secondary">{turf.size}</div>
        </h2>
        <p>{turf.openingTime}-{turf.closingTime}</p>
        <div className="card-actions sapce-around justify-between">
        <div className="badge badge-outline">Rs.{turf.pricePerHour}</div>
        <div className="badge badge-outline">Book Now</div>
        </div>
    </div>
    </div>
            </>
        )
    };

    export default Card;