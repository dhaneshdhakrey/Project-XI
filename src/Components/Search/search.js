import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import Card1 from "../Collection/Card/Card1.js";
import BackendAPi from "../../Utils/ConnectBackendAPis.js";
// import Loading from "../UI/Loading.js";
import ErrorCard from "../UI/Error.js";
import axios from "axios";
import { TbRuler3 } from "react-icons/tb";
import { Turtle } from "lucide-react";

function SearchPage(event){
    let {query}=useParams();
    let [data,setData]=useState([]);
    let [isLoading,setLoading]=useState(true);
    let [prevSearch,setSearch]=useState(query);
    async function fetchSearch(){
        try{
            // let response=await axios.get(`http://172.16.112.40:8000/products/?search=${prevSearch}`);
            let response=await axios.get(BackendAPi(`products/?search=${prevSearch}`)); 
            console.log(response.data.results)
            setLoading(null);
            setData(response.data.results);
        }
        catch(error){
            console.log(error.message)
        }
    }

    useEffect(() => {
        setSearch(query); // Update prevSearch state when query changes
    }, [query]);
    
    useEffect(() => {
        fetchSearch();
    }, [prevSearch])
    // if(isLoading){
    //   return <Loading/>
    // }
    return(
        <div>
        {<div className="margin">
      <div>hello</div>
    <div className="collection-container">
      {data.map((tempObj) => (
          <Card1
            key={tempObj.id}
            id={tempObj.slug}
            title={tempObj.name}
            price={tempObj.price}
            imgsrc={tempObj.images?.[0]?.image || "fallback.jpg"} // Added optional chaining
          />
        ))}

      {/* {prevError && <ErrorCard message={prevError} />} Show error card if error occurs */}
    </div>
    </div>}
        </div>
    )

}
export default SearchPage;