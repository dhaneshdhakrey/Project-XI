import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import Card1 from "../Collection/Card/Card1.js";
import Loading from "../UI/Loading.js";
import ErrorCard from "../UI/Error.js";
import axios from "axios";

function SearchPage(event){
    let {query}=useParams();
    let [data,setData]=useState(null);
    let [prevSearch,setSearch]=useState(query);
    async function fetchSearch(){
        try{
            let response=await axios.get(`http://172.16.112.40:8000/products/?search=${prevSearch}`);
            console.log(response.data.results)
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
    return(
        <div>
        {<div className="margin">
      <div>hello</div>
    <div className="collection-container">
      {data? (
        data.map((tempObj) => (
          <Card1
            key={tempObj.id}
            id={tempObj.slug}
            title={tempObj.name}
            price={tempObj.price}
            imgsrc={tempObj.images?.[0]?.image || "fallback.jpg"} // Added optional chaining
          />
        ))
      ) : (
        <p>No collections available</p> // Added fallback message
      )}

      {/* {prevError && <ErrorCard message={prevError} />} Show error card if error occurs */}
    </div>
    </div>}
        </div>
    )

}
export default SearchPage;