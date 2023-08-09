import { AppBar, Typography, Button, Toolbar, Container } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GitHubIcon from '@mui/icons-material/GitHub';

const Navbar = () => {
    return (
        <AppBar position="fixed" elevation={0}>
            <Container>
                <Toolbar>
                    <Typography variant="h6" flexGrow={1}>
                        <GitHubIcon />
                    </Typography>
                    <Button variant="text" color="inherit" startIcon={<LoginIcon />}>
                        Login
                    </Button>
                    <Button variant="text" color="inherit" startIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
