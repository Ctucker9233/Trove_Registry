import React from 'react';
import Auth from '../utils/Auth';
import Nav from '../components/Nav';
import Profile from '../components/Profile';
import SideBar from '../components/SideBar'
import Main from '../components/Main'
import API from '../utils/API';

class ProfilePage extends React.Component {
    state = {
        secretData: '',
        user: {}
    }

    /**
     * This method will be executed after initial rendering.
     */
    componentDidMount() {
        API.dashboard(Auth.getToken())
            .then(res => {
                this.setState({
                    secretData: res.data.message,
                    user: res.data.user
                });
            })
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <div>
                <Nav />
                <SideBar />
                <Main>
                    <Profile />
                </Main>
            </div>

        )

    }

}
export default ProfilePage;