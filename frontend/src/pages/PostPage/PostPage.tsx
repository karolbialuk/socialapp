import React from "react";
import "./PostPage.scss";
import { Container } from "@mui/material";
import { Post } from "../../components";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PostPage: React.FC = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[1];

  interface postData {
    id: string;
    text: string;
    username: string;
    data: string;
    userId: string;
    img: string;
  }

  const { isFetching, data, isError } = useQuery<postData[]>({
    queryKey: ["post", id],
    queryFn: () =>
      axios
        .get(
          `http://localhost:8800/api/post?${
            path === "post" ? "postId" : "userId"
          }=` + id,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  return (
    <Container
      className="postpage"
      maxWidth="md"
      component="main"
      sx={{ flexGrow: 1, m: 0, p: 0, pb: 1.5 }}
    >
      {data?.map((item: postData) => {
        return (
          <Post
            username={(data && item.username) || ""}
            data={(data && item.data) || ""}
            text={(data && item.text) || ""}
            img={(data && item.img) || ""}
            idUser={(data && item.userId) || ""}
            idPost={(data && item.id) || ""}
          />
        );
      })}
    </Container>
  );
};

export default PostPage;
