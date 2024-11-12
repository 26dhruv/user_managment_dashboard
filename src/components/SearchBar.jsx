import { useContext } from "react"
import { useQuery } from "../hooks/useQuery"

export default function SearchBar(){
    
    const {query,setQuery}=useQuery()

    return(
        <>
        <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{setQuery(e.target.value)}}></input>
        </form>
        </>
)}