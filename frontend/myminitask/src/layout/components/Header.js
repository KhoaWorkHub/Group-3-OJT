import React, { useContext, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Modal,
    Box,
    Avatar,    
    MenuItem,
    Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import Login from "../../components/Login";
import { Auth } from "../../global/AuthContext";
import { deepOrange } from "@mui/material/colors";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const auth = useContext(Auth);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };
    const handleLogOut = () => {
      auth?.logoutUser();
      window.location.reload()
    }
    const drawerContent = (
        <List>
            <ListItem button>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Questions" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Admins" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Interns" />
            </ListItem>
        </List>
    );

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#fff",
                boxShadow: "none",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, color: "#000", fontWeight: "bold" }}
                >
                    <img style={{width:"100px"}} src={"/assets/amazingTech.jpg"}/>
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ color: "#000", width:"5%" }} // Đảm bảo rằng màu sắc của biểu tượng là màu đen
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            {drawerContent}
                        </Drawer>
                    </>
                ) : (
                    <>
                        <Button
                            sx={{
                                color: "#000",
                                display: "block",
                                fontWeight: 500,
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            sx={{
                                color: "#000",
                                display: "block",
                                fontWeight: 500,
                            }}
                        >
                            Questions
                        </Button>
                        <Button
                            sx={{
                                color: "#000",
                                display: "block",
                                fontWeight: 500,
                            }}
                        >
                            Admins
                        </Button>
                        <Button
                            sx={{
                                color: "#000",
                                display: "block",
                                fontWeight: 500,
                            }}
                        >
                            Interns
                        </Button>
                        {auth?.userAuth ? (
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls={
                                        openMenu ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                        openMenu ? "true" : undefined
                                    }
                                    onClick={handleClick}
                                >
                                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{auth?.userAuth?.name?.slice(0,1)}</Avatar>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleLogOut}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button onClick={handleOpen} variant="contained">
                                Login
                            </Button>
                        )}
                    </>
                )}
            </Toolbar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Login />
                </Box>
            </Modal>
        </AppBar>
    );
};

export default Header;
