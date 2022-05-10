import "./CSS-Files/Messages.css";
import { Box } from "@mui/system";
import { getUserByID } from "../../Resources/functions";
import { Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { getPmByUserID, getLoggedUser } from "../../Resources/functions";
import { paginationStyle } from "../Forum/ThreadsListMuiStyle";
import { Pagination } from "@mui/material";
//
function RecievedMessages({ user }) {
  const [pms, setPms] = useState();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const postsPerPage = 10;
  const lastPost = page * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  //
  useEffect(() => {
    setPms(getPmByUserID(getLoggedUser()?.userID).reverse());
  }, []);
  //
  useEffect(() => {
    setPageCount(Math.ceil(getPmByUserID(user?.userID).length / postsPerPage));
  }, [pms]);
  //
  const handleChange = (e, value) => {
    setPage(value);
  };
  //
  return (
    <Box>
      {pms?.length === 0 ? (
        <div>You didn't recieve any messages yet.</div>
      ) : (
        pms?.slice(firstPost, lastPost).map((pm, i) => {
          return (
            <div key={i} className="pmContainer">
              <div className="pmInfoContainer">
                <div className="pmTitle">
                  <div className="embolden">Subject: </div>
                  {pm.title}
                </div>
                <div>
                  <div className="embolden">From: </div>
                  {getUserByID(pm.senderID).username}
                </div>
                <Divider />
                <div>{pm.content}</div>
                <Divider />
                <div>
                  <div className="embolden">Sent: </div>
                  {pm.time}
                </div>
              </div>
            </div>
          );
        })
      )}
      {pms?.length === 0 ? null : (
        <Pagination
          sx={paginationStyle}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChange}
          count={pageCount}
        />
      )}
    </Box>
  );
}
export default RecievedMessages;
