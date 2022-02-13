import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography, Select } from '@material-ui/core';
import { addUser } from '../Service/api';
import { useHistory } from 'react-router-dom';

const initialValue = {
    name: '',
    date: '',
    email: '',
    phone: '',
    address: ''
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

const AddUser = () => {
    const [user, setUser] = useState(initialValue);
    const { name, date, gender, phone, address } = user;
    const classes = useStyles();
    let history = useHistory();
    

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
        await addUser(user);
        history.push('/');
    }

    return (
            <FormGroup className={classes.container}>
                <Typography variant="h4">პაციენტის დამატება</Typography>
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
                    <Button variant="contained" color="primary" onClick={() => addUserDetails()}>პაციენტის დამატება</Button>
                </FormControl>
            </FormGroup>
    )
}

export default AddUser;