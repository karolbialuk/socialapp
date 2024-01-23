import React from "react";
import "./Additional.scss";
import { Box, Container, Typography, Divider } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FestivalOutlinedIcon from "@mui/icons-material/FestivalOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

const Additional: React.FC = () => {
  return (
    <Container
      sx={{
        flexGrow: 1,
        position: "sticky",
        top: "80px",
        zIndex: 100,
        m: 0,
        p: 0,
      }}
      style={{ padding: 0, maxWidth: "330px" }}
    >
      <Box
        sx={{
          p: 3,
          mt: 2.5,
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.2,
          }}
        >
          <Typography fontWeight="bold">Sugerowani znajomi</Typography>
          <MoreHorizIcon />
        </Box>
        <Divider />

        <Box id="additional__sufriends-container" sx={{ mt: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              flexDirection: "column",
            }}
          >
            {Array.from({ length: 5 }, () => 0).map((item) => {
              return (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Box
                    id="additional__friend"
                    sx={{ width: "40px", height: "40px" }}
                  >
                    <img
                      style={{ width: "100%", borderRadius: "50px" }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
                      alt="img"
                    />
                  </Box>
                  <Box>
                    <Typography fontWeight="bold" fontSize="0.9rem">
                      Pan Feng Shui
                    </Typography>
                    <Typography color="#727272dc" fontSize="0.8rem">
                      12 April at 09:28 PM
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          p: 3,
          mt: 2.5,
          background: "#fff",
          borderRadius: "10px",
        }}
        id="additional__events-container"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.2,
          }}
        >
          <Typography fontWeight="bold">Wydarzenia</Typography>
          <MoreHorizIcon />
        </Box>
        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1.5,
            gap: "12px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FestivalOutlinedIcon
              sx={{ fontSize: "1.6rem", color: "#727272dc" }}
            />
            <Box>
              <Typography fontSize="0.9rem" color="#727272dc">
                Masz 10 zaproszeń do wydarzeń.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CardGiftcardOutlinedIcon
              sx={{ fontSize: "1.6rem", color: "#727272dc" }}
            />
            <Box>
              <Typography fontSize="0.9rem" color="#727272dc">
                Pradas Invitation Birthday
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          p: 3,
          mt: 2.5,
          background: "#fff",
          borderRadius: "10px",
        }}
        id="additional__pages"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.2,
          }}
        >
          <Typography fontWeight="bold">Sugerowane strony</Typography>
          <Box>
            <Typography fontWeight="bold" fontSize="0.8rem">
              Wszystkie
            </Typography>
          </Box>
        </Box>
        <Divider />
        {/*  */}
        <Box sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box sx={{ width: "40px", height: "40px" }}>
              <img
                style={{ width: "100%", borderRadius: "40px" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oghbsuzggpkknQSSU-Ch_xep_9v3m6EeBQ&usqp=CAU"
                alt="logo"
              />
            </Box>
            <Box>
              <Typography fontSize="0.9rem" fontWeight="bold">
                Sebo studio
              </Typography>
              <Typography fontSize="0.8rem" color="#727272dc">
                Design studio
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "160px",
              mt: 1.6,
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/O2019-Hero-image-x2:VP1-539x440?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1920&hei=720&qlt=75&fit=constrain"
              alt="page-photo"
            />
          </Box>
        </Box>
        {/*  */}
      </Box>
    </Container>
  );
};

export default Additional;
