import React, { useState,useEffect } from "react";
import { useParams,Link,useOutletContext } from 'react-router-dom';

export default function Solution(){
    const {solutions} = useOutletContext();
    
    const [pastSolutions,setPastSolutions] = useState(solutions)


    console.log(solutions)

    return(
        <>
            <p>Solution</p>
        </>
    )
}