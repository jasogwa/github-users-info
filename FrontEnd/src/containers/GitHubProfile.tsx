import {
    Container,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    Avatar,
    Grid,
    Divider,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const GitHubProfile = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState<any | null>(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const baseURL = 'http://localhost:3000';

    const fetchUserData = async () => {
        if (!username) {
            setIsFormSubmitted(true);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.get(`${baseURL}/${username}`);
            setUserData(response.data);
            setIsFormSubmitted(true);
        } catch (error) {
            console.error('Error fetching user data', error);
            setIsFormSubmitted(true);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDateString = (dateString: any) => {
        const date = new Date(dateString);

        const monthAbbreviation = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        return `${monthAbbreviation}, ${year}`;
    };

    return (
        <Container
            sx={{ mt: { xs: 10, md: 15, lg: 10 } }}
            style={{
                height: '100vh'
            }}
        >
            <Typography component="h4" variant="h4" gutterBottom>
                GitHub Profile
            </Typography>

            <TextField
                label="GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={isFormSubmitted && !username}
                helperText={isFormSubmitted && !username ? 'Please enter a valid GitHub username.' : ''}
                variant="outlined"
                fullWidth
                sx={{
                    backgroundColor: '#F6F8FA',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#F6F8FA'
                    }
                }}
            />

            <Button
                variant="contained"
                onClick={fetchUserData}
                size="large"
                sx={{
                    marginTop: '16px',
                    backgroundColor: '#28A745',
                    color: 'white',
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#218838'
                    }
                }}
            >
                Search
            </Button>

            {isLoading && <p>Loading...</p>}

            <Grid container spacing={5}>
                {/* Left */}
                <Grid item xs={12} md={4} style={{ marginTop: '10px' }}>
                    <Card
                        sx={{
                            border: 'none',
                            borderRadius: '15px',
                            padding: '8px',
                            backgroundColor: '#fff',
                            minHeight: '150px',
                            maxHeight: '100%',
                            marginRight: '15px',
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        {userData && (
                            <>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80
                                    }}
                                    src={userData.user.avatar_url}
                                    alt={userData.user.login}
                                />
                                <Typography component={'span'} variant="h6">
                                    {userData.user.name}
                                </Typography>
                                <Typography component={'span'} variant="body2">
                                    {userData.user.login}
                                </Typography>
                            </>
                        )}

                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap'
                            }}
                        >
                            {userData &&
                                userData.orgs.map((org: any) => (
                                    <div key={org.id}>
                                        <CardContent>
                                            <Avatar src={org.avatar_url} alt={org.login} />
                                            <Typography
                                                component={'span'}
                                                variant="body2"
                                                sx={{
                                                    fontSize: 10
                                                }}
                                            >
                                                {org.login}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                        </div>
                    </Card>
                </Grid>

                {/* Right */}
                <Grid item xs={12} md={8} component="span">
                    <div
                        style={{
                            border: 'none',
                            borderRadius: '1px',
                            padding: '8px',
                            backgroundColor: '#fffcfc',
                            height: '700px',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                overflowY: 'auto'
                            }}
                        >
                            Gists
                            <Divider />
                            {userData && (
                                <List sx={{ padding: '0' }}>
                                    {userData.gists.map((gist: any) => (
                                        <ListItem key={gist.id} disableGutters sx={{ marginBottom: '16px' }}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={gist.owner.avatar_url}
                                                    alt="Image"
                                                    sx={{ width: 32, height: 32 }}
                                                />
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary=""
                                                secondary={
                                                    <div>
                                                        <a
                                                            href={gist.html_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Typography component={'span'} variant="body1">
                                                                {gist.description}
                                                                <span style={{ marginLeft: '10px' }}>
                                                                    {gist.files && Object.keys(gist.files)[0]}
                                                                </span>
                                                            </Typography>
                                                        </a>
                                                        <Typography
                                                            component={'div'}
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {formatDateString(gist.created_at)}
                                                        </Typography>
                                                    </div>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default GitHubProfile;
