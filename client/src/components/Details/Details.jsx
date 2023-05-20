import axios from "axios"
import { NavLink, useParams } from "react-router-dom"
import{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDogDetail } from "../../Redux/Actions/actions"
import paw from "../Home/images/paw.png"
import "./Details.css"




const Details = () => {
    const [loading, setLoading] = useState(true)
    const{id} = useParams ()
    const dispatch =useDispatch()
    const dogDetail = useSelector(state => state.detail)
    console.log(dogDetail)
  
    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getDogDetail(id))
            setLoading(false) // Cambiar el estado de carga a false
        }
        getDetails()
    }, [dispatch, id])

    return (
        <div>
            <div className="rectangle"></div>
              <h1 className="logo">THEDOGAPP</h1>
              <img className="paw2" src ={paw} alt="pawlogo"></img>
              <NavLink className="homeDetail" to="/home">
            <span class="material-symbols-outlined">home</span>
            <span class="material-symbols-outlined2">
            <span class="material-symbols-outlined">
arrow_back
</span>
</span>
               
            </NavLink>
            {
                loading ? <p className="loadingText">Loading...</p> :
                Object.entries(dogDetail).length === 0 ? <p>Dog not found</p> :  
                <div className="dogDetails">
                    <div className="detailText">
                    <h1 className="detailName">{dogDetail.name}</h1>
                    <h2>Height: {dogDetail.heightMin}cm - {dogDetail.heightMax}cm</h2>
                    <h2>Weight: {dogDetail.weightMin}kgs - {dogDetail.weightMax}kgs</h2>
                    <h2>Life Expectancy: {dogDetail.life_span}</h2>
                    <h4>Temperaments: </h4> <p className="detailTemp">{dogDetail.createdInDb? dogDetail.temperaments.map(el => el.name ).join(', '): dogDetail.temperament.split(', ').map(e => e ).join(', ')}  </p>
                    </div>
                   
                    <div className="DogDetailImage">
                     <img className= 'imageDetail' src={dogDetail.image} alt='Image not found!' />
               
                    </div>
                </div>
             
            }

  
        
        </div>
    )

}
export default Details;