import React, { useState } from "react";
import "./Comment.scss";
import { Box, Typography, Divider } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface commentProps {
  firstname: string;
  lastname: string;
  text: string;
  date: string;
  idPost: string;
  idUser: string;
  idComment: string;
}

const Comment: React.FC<commentProps> = ({
  firstname,
  lastname,
  text,
  date,
  idPost,
  idUser,
  idComment,
}) => {
  const [isLiked, setIsLiked] = useState();

  const likeComment = async () => {
    const likeInputs = {
      idPost,
      idComment,
      idUser,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/comment/like",
        likeInputs,
        {
          withCredentials: true,
        }
      );

      refetch();
    } catch (err: any) {
      console.error(err.response.data);
    }
  };

  const {
    isLoading,
    data: likesData,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["comment", idComment],
    queryFn: () =>
      axios
        .get("http://localhost:8800/api/comment/like?idComment=" + idComment, {
          withCredentials: true,
        })
        .then((res) => {
          const likedComment = res.data.some((item: any) => {
            return (
              item.idUser === idUser &&
              item.idPost === idPost &&
              item.idComment === idComment
            );
          });
          setIsLiked(likedComment);
          return res.data;
        }),
  });

  return (
    <Box
      id="post__comments-item"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        ml: "20px",
        mt: "20px",
      }}
    >
      <Box sx={{ width: "40px" }}>
        <img
          style={{ width: "100%", borderRadius: "40px" }}
          alt="comment-avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#3b3b3bec",
          }}
        >{`${firstname} ${lastname}`}</Typography>
        <Typography sx={{ mb: "5px" }}>{text}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "#727272dc",
            }}
          >
            {date}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ThumbUpOutlinedIcon
              onClick={likeComment}
              sx={{
                fontSize: "1.2rem",
                cursor: "pointer",
                color: isLiked ? "rgb(46, 80, 231)" : "#727272dc",
              }}
            />
            <Typography sx={{ color: "#727272dc" }}>
              {likesData?.length}
            </Typography>
          </Box>
        </Box>

        <Divider />
      </Box>
    </Box>
  );
};

export default Comment;
