import React from 'react'
import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";

function AppBarr({score}) {
    return (
                <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => window.location.reload()}
              component="div"
              style={{ flexGrow: 1 }}
            >
              Home
            </Typography>
            <Typography variant="h6" mr={5}>
              Score: {score}
            </Typography>
            <IconButton>
              <Avatar>S</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
    )
}

export default AppBarr
