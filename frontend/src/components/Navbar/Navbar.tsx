import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Navbar.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  TextField,
  Button,
  Toolbar,
  Box,
  AppBar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar: React.FC = () => {
  interface itemData {
    id: number;
    firstname: string;
    lastname: string;
  }

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    search: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      if (inputs.search) {
        return axios
          .get("http://localhost:8800/api/users?query=" + inputs.search, {
            withCredentials: true,
          })
          .then((res) => res.data)
          .catch((err) => console.error(err));
      }
    },
  });

  console.log({ users: data });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    refetch();
  };

  return (
    <AppBar style={{ background: "#fff" }} position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
        style={{ padding: "0" }}
      >
        <Box sx={{ width: "37%", display: "flex", justifyContent: "center" }} />
        <Box
          sx={{
            width: "25%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <TextField
            size="small"
            id="outlined-basic"
            label="Wyszukaj"
            variant="outlined"
            name="search"
            onChange={handleChange}
            fullWidth
            onKeyDown={handleKeyDown}
          />
          <Box
            sx={{
              top: "50px",
              position: "absolute",
              width: "100%",
              background: "#fff",
              height: "auto",
              borderRadius: "3px",
              border: "1px solid #8686867e",
              display: inputs.search ? "block" : "none",
            }}
          >
            {data?.map((item: itemData) => {
              return (
                <Link
                  to={"/profile/" + item.id}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      p: 1,
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Box sx={{ width: "40px" }}>
                      <img
                        style={{ width: "100%", borderRadius: "40px" }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
                        alt="search-friend-img"
                      />
                    </Box>
                    <Typography
                      sx={{ color: "black" }}
                    >{`${item.firstname} ${item.lastname}`}</Typography>
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            width: "37%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "45px",
              height: "45px",
              sm: { width: "20px", height: "20px" },
              md: { width: "30px", height: "30px" },
            }}
          >
            <img
              style={{ width: "100%", borderRadius: "45px" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
              alt="avatar"
            />
          </Box>
          <Button onClick={handleLogout}>Wyloguj</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
