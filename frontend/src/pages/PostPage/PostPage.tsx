import React from "react";
import "./PostPage.scss";
import {
  Container,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { Post } from "../../components";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PostPage: React.FC = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];
  const currentUser = localStorage.getItem("user");
  const currentUserId = currentUser ? JSON.parse(currentUser).id : "";
  const path = location.pathname.split("/")[1];

  console.log(Number(id));
  console.log(currentUserId);

  interface postData {
    id: string;
    text: string;
    username: string;
    data: string;
    userId: string;
    img: string;
  }

  interface userData {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
    gender: string;
  }

  const {
    isFetching: userisFetching,
    data: userData,
    isError: userIsError,
  } = useQuery<userData[]>({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get("http://localhost:8800/api/users/user?userId=" + id, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });

  console.log(userData);

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

  const followUser = async () => {
    const inputs = {
      idUser: currentUserId,
      followedUser: id,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/users/follow",
        inputs,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
    } catch (err: any) {
      console.error(err.response.data);
    }
  };

  return (
    <Container
      className="postpage"
      maxWidth="md"
      component="main"
      sx={{ flexGrow: 1, m: 0, p: 0, pb: 1.5 }}
    >
      {path === "profile" && Number(id) !== currentUserId && (
        <Box
          sx={{
            pt: 3,
            ml: 2.5,
            mt: 2.5,
            background: "#fff",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
              pb: 1.5,
              pl: 1.5,
            }}
          >
            <div style={{ maxWidth: "150px" }}>
              <img
                style={{ width: "100%", borderRadius: "150px" }}
                alt="post-avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
              />
            </div>
            <Box>
              <Typography variant="h1" fontSize={"1.7rem"} sx={{ mb: 1 }}>
                {`${userData && userData[0]?.firstname} ${
                  userData && userData[0]?.lastname
                }`}
              </Typography>
              <Typography variant="h2" fontSize={"1.1rem"} sx={{ mb: 1 }}>
                {userData && userData[0]?.birthdate.split("T")[0]}
              </Typography>
              <Typography variant="h2" fontSize={"1.1rem"}>
                {userData && userData[0]?.gender}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{ pb: 1.5, pr: 1.5, display: "flex", flexDirection: "column" }}
          >
            <Button onClick={followUser}>Obserwuj</Button>
          </Box>
        </Box>
      )}
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
