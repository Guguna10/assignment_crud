import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography, Select } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../Service/api';

const initialValue = {
    name: '',
    date: '',
    gender: '',
    phone: '',
    address: ""
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const { name, date, gender, address ,phone } = user;
    const { id } = useParams();
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async() => {
        const response = await getUsers(id);
        setUser(response.data);
    }

    const editUserDetails = async() => {
        await editUser(id, user);
        history.push('/');
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                    <InputLabel htmlFor="my-input">პაციენტის გვარი და სახელი</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input"></InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="date" name='date' value={date} id="my-input" />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel htmlFor="my-input">სქესი</InputLabel>
                    <Select 
                        labelId="demo-simple-select-autowidth-label"
                        value={gender}
                        onChange={(e) => onValueChange(e)}
                        id="my-input"
                        name="gender"
                        autoWidth
                        label="Age"
                    >
                        <option value="მამრობითი">მამრობითი</option>
                        <option value="მდედრობითი">მდედრობითი</option>
                    </Select>
                   
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">მობ. ნომერი</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">მისამართი</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name='address' value={address} id="my-input" />
                </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>ინფორმაციის განახლება</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditUser;