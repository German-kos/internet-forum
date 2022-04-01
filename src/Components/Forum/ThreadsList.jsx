import { React, useEffect, usestate } from "react";
import { useParams } from "react-router-dom";
//
function ThreadsList() {
    const params = useParams();
    const threads = JSON.parse( localStorage.get("Forums"));
    const currCategory = threads.find((obj) => obj.id === params.threadID);
    return(
        <div>
            loading threads
        </div>
    )
}
export default ThreadsList;
