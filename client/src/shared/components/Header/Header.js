import React from "react";
import SideBarLinksCustomer from "./SideBarLinksCustomer";
import SideBarLinksVendor from "./SideBarLinksVendor";
import SideLinksCustomer from "./SideLinksCustomer";
import SideLinksVendor from "./SideLinksVendor";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import grey from "@material-ui/core/colors/grey";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import { AuthContext } from "../../auth-context";
import { useLocation } from "react-router-dom";

// styles for the side bar and the header
const drawerWidth = 270;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: grey[50],
  },
  toolbar: {
    // height: "10vh",
  },
  title: {
    flexGrow: 1,
    color: grey[50],
  },
  subTitle: {
    flexGrow: 1,
    color: grey[500],
  },
  customColor: {
    backgroundColor: grey[900],
  },
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  offset: theme.mixins.toolbar,
}));

const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};

const GetTitle = () => {
  const location = useLocation();
  const classes = useStyles();
  if (location.pathname.includes("/vendor")) {
    return (
      <div>
        <Typography variant="h6" className={classes.subTitle}>
          Vendor
        </Typography>
      </div>
    );
  } else if (location.pathname.includes("/customer")) {
    if (localStorage.getItem("vendor")) {
      return (
        <div>
          <Typography variant="h6" className={classes.subTitle}>
            {JSON.parse(localStorage.getItem("vendor"))["name"]}
          </Typography>
        </div>
      );
    }
    
  } else {
    return;
  }
};

// useState hook to check if the Drawer status is open or not,
// Top bar is also stylised here, actual codes are written in SideBar codes and rendered here.
export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const auth = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar
        position="relative"
        color="inherit"
        className={classes.customColor}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Snacks in a Van
            {GetTitle()}
          </Typography>

          {usePathname().includes("/vendor") ? (
            <SideLinksVendor />
          ) : (
            <SideLinksCustomer />
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={toggleDrawer("left", false)}
      >
        <div className={classes.drawerHeader} onClick={handleDrawerClose}>
          <h3>Snacks in a Van</h3>
          <IconButton>
            {classes.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        {usePathname().includes("/vendor") ? (
          <SideBarLinksVendor />
        ) : (
          <SideBarLinksCustomer />
        )}
      </Drawer>
    </React.Fragment>
  );
}
