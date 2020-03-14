import React, { useState, useEffect, Fragment } from 'react';
import Auth from '../utils/Auth';
import MyTrove from '../components/MyTrove'
import Nav from '../components/Nav'
import SideBar from '../components/SideBar'
import API from '../utils/API';
import Avatar from '../components/Avatar'
import ProfileBanner from '../components/ProfileBanner'
import NewTroveDialogModal from "../components/NewTroveDialogModal"
import Grid from '@material-ui/core/Grid'

const TrovePage = (props) => {
    const [user, setUser] = useState({});
    const [trove, setTrove] = useState({});
    const [newTrove, setNewTrove] = useState({
        title: '',
        description: '',
        imgurl: ''
    });
    const [troveId, setTroveId] = useState();

    console.log(user)
    console.log(trove.troves)

    useEffect(() => {
        // update authenticated state on logout
        props.checkAuthenticateStatus()
    }, [])

    useEffect(() => {
        API.dashboard(Auth.getToken())
            .then(res => {
                setUser(res.data.user)
                console.log(res.data.user._id)
                API.getTrove(res.data.user._id, Auth.getToken())
                    .then((trove) => {
                        console.log(trove.data)
                        setTrove(trove.data)
                    })
            });
    }, [])

    const onChange = (e) => {
        setNewTrove({
            ...newTrove,
            [e.target.name]: e.target.value,
        })
    };

    const onAdd = () => {
        API.addTrove(user._id, newTrove).then(res => {
            console.log(res)
        })
    }

    const onEdit = () => {
        console.log(troveId)
        API.editTrove(troveId, newTrove).then(res => {
            console.log(res)
        })
    }

    const onDelete = () => {
        console.log(troveId)
        API.deleteTrove(troveId, user._id).then(res => {
         console.log(res)
        })
    }

    return (
        <Fragment>
            <Grid container spacing={0} direction="row">
                <Grid item md={12}>
                    <Nav />
                </Grid>
            </Grid>
            <Grid container spacing={0} direction="row">
                <Grid item md={2} sm={2}>
                    <SideBar />
                </Grid>
                <Grid item md={10} sm={10}>
                    <ProfileBanner />
                    <Avatar user={user} />
                    <NewTroveDialogModal onChange={onChange} onAdd={onAdd} newTrove={newTrove} />
                    <MyTrove trove={trove} onEdit={onEdit} onDelete={onDelete} setTroveId={setTroveId} newTrove={newTrove} onChange={onChange}/>
                </Grid>
            </Grid>
        </Fragment>

    )

}

export default TrovePage;
