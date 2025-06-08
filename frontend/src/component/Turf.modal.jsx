import react from 'react';

function TurfModal({turf}){
    if (!turf) return null;
    return (
        <>
        <div >
       <dialog id="my_modal_2" className="modal">
      <div className="modal-box bg-white text-black">
        <h3 className="font-bold text-lg">{turf.name}</h3>
        <img src={turf.image} alt={turf.name} className="w-full h-40 object-cover my-2 rounded" />
        <p><strong>Size:</strong> {turf.size}</p>
        <p><strong>Price:</strong> ₹{turf.pricePerHour}/hr</p>
        <p><strong>Rating:</strong> ⭐ {turf.rating}</p>
        <p><strong>Open:</strong> {turf.openingTime} — <strong>Close:</strong> {turf.closingTime}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
        </div>
        </>
    )
}
export default TurfModal;