import React, { useState, useEffect } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import "./Home.scss";

import {
  Box,
  Container,
  Divider,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Post } from "../../components";
import axios from "axios";

const Home: React.FC = () => {
  const currentUser = localStorage.getItem("user");
  const username = currentUser
    ? JSON.parse(currentUser).firstname + " " + JSON.parse(currentUser).lastname
    : "";

  const userId = currentUser ? JSON.parse(currentUser).id : "";

  interface Inputs {
    text: string;
    username: string;
    userId: string;
    [key: string]: string;
  }

  interface Item {
    username: string;
    data: string;
    text: string;
    img: string;
    id: string;
    userId: string;
  }

  interface postData {
    id: string;
    text: string;
    username: string;
    data: string;
    userId: string;
    img: string;
  }

  const [response, setResponse] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Inputs>({
    text: "",
    username,
    userId,
  });

  const {
    isLoading,
    data: postData,
    isError,
    refetch,
  } = useQuery<postData[]>({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get("http://localhost:8800/api/post", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });

  console.log(postData);

  const updatedFormData = new FormData();
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIconClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  const addPost = async (e: any) => {
    try {
      for (const key in inputs) {
        updatedFormData.append(key, inputs[key]);
      }

      for (let i = 0; i < files.length; i++) {
        updatedFormData.append("images", files[i]);
      }

      if (e.key === "Enter") {
        const res = await axios.post(
          "http://localhost:8800/api/post",
          files ? updatedFormData : inputs,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        setResponse(res.data);
        refetch();
        e.target.value = "";
      }
    } catch (err: any) {
      setResponse(err.response?.data || "Błąd podczas komunikacji z serwerem.");
    }
  };

  return (
    <Container
      className="home"
      maxWidth="md"
      component="main"
      sx={{ flexGrow: 1, m: 0, p: 0, pb: 3 }}
    >
      <Box
        id="addpost-input"
        sx={{
          pt: 3,
          ml: 2.5,
          mt: 2.5,
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            pb: 1.5,
            pl: 1.5,
          }}
        >
          <div className="home__post-header-img">
            <img
              alt="post-avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
            />
          </div>
          <Typography style={{ margin: "0" }} variant="h6" fontSize={"1rem"}>
            Dodaj post
          </Typography>
        </Box>

        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <TextField
            sx={{ mb: 1.5, ml: 2, mt: 1 }}
            label="Co masz na myśli?"
            variant="standard"
            fullWidth
            name="text"
            onChange={handleChange}
            onKeyPress={addPost}
          />

          <input
            style={{
              display: "none",
            }}
            name="images"
            accept="image/*"
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileUpload}
          />
          <label htmlFor="fileInput" onClick={handleIconClick}>
            <IconButton aria-label="upload" sx={{ width: "55px", mr: 1.5 }}>
              <ImageIcon sx={{ width: "100%", height: "100%" }} />
            </IconButton>
          </label>
        </Box>
      </Box>
      {postData?.map((item: Item) => {
        return (
          <Post
            username={item.username}
            data={item.data}
            text={item.text}
            img={item.img}
            idUser={item.userId}
            idPost={item.id}
          />
        );
      })}
    </Container>
  );
};

export default Home;
