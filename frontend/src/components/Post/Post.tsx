import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  TextField,
  SwipeableDrawer,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./Post.scss";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { isTemplateExpression } from "typescript";
import { useLocation } from "react-router-dom";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Comment } from "../";

interface PostProps {
  username: string;
  data: string;
  text: string;
  img: string;
  idUser: string;
  idPost: string;
}

const Post: React.FC<PostProps> = ({
  username,
  data,
  text,
  img,
  idUser,
  idPost,
}) => {
  const postData = img?.split(",").filter((item) => item.endsWith("_high.jpg"));

  interface CommentData {
    firstname: string;
    lastname: string;
    id: string;
    idPost: number;
    idUser: number;
    text: string;
    date: string;
  }

  interface Item {
    firstname: string;
    lastname: string;
    text: string;
    date: string;
    id: string;
  }

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [inputs, setInputs] = useState({
    text: "",
    idUser,
    idPost,
  });

  const [isLiked, setIsLiked] = useState();
  console.log(isLiked);

  const [open, setOpen] = useState(false);

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const addComment = async (
    e: React.ChangeEvent<HTMLInputElement> &
      React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      try {
        const res = await axios.post(
          "http://localhost:8800/api/comment",
          inputs,
          {
            withCredentials: true,
          }
        );
        e.target.value = "";
        refetch();
      } catch (err: any) {
        console.error(err.response.data);
      }
    }
  };

  const likePost = async () => {
    const likeInputs = {
      idPost,
      idUser,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/post/like",
        likeInputs,
        { withCredentials: true }
      );
      console.log(res.data);
      likesRefetch();
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  const {
    isLoading,
    data: commentsData,
    isError,
    refetch,
  } = useQuery<CommentData[]>({
    queryKey: ["comment", idPost],
    queryFn: () =>
      axios
        .get("http://localhost:8800/api/comment?idPost=" + idPost, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });

  const {
    isLoading: likesIsLoading,
    data: likesData,
    isError: likesIsError,
    refetch: likesRefetch,
  } = useQuery({
    queryKey: ["likes", idPost],
    queryFn: () =>
      axios
        .get("http://localhost:8800/api/post/like?idPost=" + idPost, {
          withCredentials: true,
        })
        .then((res) => {
          const likedPost = res.data.some((item: any) => {
            return item.idUser === idUser && item.idPost === idPost;
          });

          setIsLiked(likedPost);
          return res.data;
        }),
  });

  useEffect(() => {
    refetch();
  }, [idPost, refetch]);

  useEffect(() => {
    likesRefetch();
  }, []);

  const commentsDataReversed =
    path === "post"
      ? commentsData?.reverse()
      : commentsData?.slice(0, 3).reverse();

  return (
    <Box
      component="main"
      id="post-post"
      className="post"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: 2.5,
        mt: 2.5,
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      <div className="post__post-header">
        <div className="post__post-header-userinf">
          <div className="post__post-header-img">
            <img
              alt="post-avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
            />
          </div>
          <div className="post__post-header-text">
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={"/profile/" + idUser}
            >
              <Typography sx={{ fontWeight: "bold" }} fontSize="1rem">
                {username}
              </Typography>
            </Link>
            <Typography sx={{ color: "#727272dc" }} fontSize="0.8rem">
              {data}
            </Typography>
          </div>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="post__post-content">
        <Typography sx={{ fontSize: "1rem" }} paragraph>
          {text}
        </Typography>
      </div>
      <div className="post__post-images">
        <Grid container sx={{ pb: 3 }}>
          {postData.map((item, array) => {
            return (
              <Grid
                sx={{
                  maxWidth: postData.length === 1 ? "750px" : "380px",
                  width: "100%",
                  maxHeight: postData.length === 1 ? "400px" : "275px",
                  m: 0.75,
                }}
                item
              >
                <img
                  src={"/upload/" + item}
                  alt={"img"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Divider />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          pt: 2,
          pb: 2,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="post__post-interactions">
          <ChatBubbleOutlineIcon />
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/post/" + idPost}
          >
            <Typography>{commentsData?.length} Comments</Typography>
          </Link>
        </div>
        <div className="post__post-interactions">
          <FavoriteBorderIcon
            sx={{ color: isLiked ? "red" : "" }}
            onClick={likePost}
          />
          <Typography>{likesData?.length} Likes</Typography>
        </div>
        <div className="post__post-interactions">
          <ShareOutlinedIcon />
          <Typography>231 Share</Typography>
        </div>
        <div className="post__post-interactions">
          <BookmarkBorderOutlinedIcon />
          <Typography>12 Saved</Typography>
        </div>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: "15px", alignItems: "center", mt: 3 }}>
        <div className="post__post-header-img">
          <img
            alt="post-avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
          />
        </div>
        <TextField
          onChange={handleComment}
          fullWidth
          name="text"
          label="Napisz komentarz..."
          variant="outlined"
          onKeyPress={addComment}
        />
      </Box>
      <Box id="post__comments-container">
        {commentsDataReversed?.map((item: Item) => {
          return (
            <Comment
              firstname={item.firstname}
              lastname={item.lastname}
              text={item.text}
              date={item.date}
              idPost={idPost}
              idUser={idUser}
              idComment={item.id}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Post;
