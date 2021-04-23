import React, {useState, useEffect} from 'react'
import {
    Grid,
    FormControl,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import {Link} from 'react-router-dom'

const fields_and_jobs = [{field: 'Healthcare', jobs:['Doctor', 'Pharmacist', 'Nurse']}, 
    {field:'Engineering', jobs:['Data Engineer', 'Civil Engineer', 'Mechanical Engineer']},
    {field:'Programming', jobs:['Full Stack Developer', 'Backend Developer', 'Front-end Developer']}]

const employment_status = ['Employed', 'Unemployed']

const skills = ['Excel', 'Database Management', 'Event Management', 
    'Culinary', 'Public Speaking', 'Presentation', 'Accounting', 'Ethical Hacking', 'Copywriting']

export default function Form() {
    const [name, setName] = useState('')
    const [identification, setIdentification] = useState('')
    const [status, setStatus] = useState('')
    const [field, setField] = useState('')
    const [job, setJob] = useState('')
    const [skillset, setSkillset] = useState([])

    useEffect(() => {
        if (status === 'Unemployed') {
            setField('')
            setJob('')
        }
    }, [status, setField, setJob])

    return (
        <Grid container justify='center' align='center' style={{background:'#222629', minHeight:'100vh'}}>
            <form
                style={{width:'50%', marginTop:'50px', paddingBottom:'50px'}}
                onSubmit={e => {
                    e.preventDefault()
                    const entry = {
                        name: name.trim(),
                        identification: identification.trim(),
                        status,
                        field,
                        job
                    }
                    console.log(entry)
                }}
            >
                <fieldset style={{width:'100%', background:'white'}}>
                    <FormControl style={{width:'100%'}}>
                        <h4 style={{fontSize:'30px', marginBottom:0, marginTop:'20px', color:'#222629'}}>
                            Employment Status Form
                        </h4>
                    </FormControl>
                    <FormControl style={{width:'100%', marginTop:'15px'}}>
                        <TextField 
                            id="name"
                            label="Name"
                            helperText="Please fill in your full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            error={!name.trim()}
                        />
                    </FormControl>
                    <FormControl style={{width:'100%', marginTop:'15px'}}>
                        <TextField 
                            id="identification"
                            label="NRIC/Passport No"
                            helperText="Please fill in your NRIC or Passport No"
                            value={identification}
                            onChange={e => setIdentification(e.target.value)}
                            error={!identification.trim()}
                        />
                    </FormControl>
                    <FormControl style={{width:'100%', marginTop:'15px'}} error={!status} align="left">
                        <InputLabel id="statusLabel">Employment Status</InputLabel>
                        <Select
                            labelId="statusLabel"
                            id="status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            {
                                employment_status.map(s => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {
                        status === 'Employed' && (
                            <FormControl style={{width:'100%', marginTop:'15px'}} error={!field} align="left">
                                <InputLabel id="fieldLabel">Current Employment Field</InputLabel>
                                <Select
                                    labelId="fieldLabel"
                                    id="field"
                                    value={field}
                                    onChange={e => setField(e.target.value)}
                                >
                                    {
                                        fields_and_jobs.map(f => (
                                            <MenuItem key={f.field} value={f}>{f.field}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )
                    }
                    {
                        (status === 'Employed' && field) && (
                            <FormControl style={{width:'100%', marginTop:'15px'}} error={!job} align="left">
                                <InputLabel id="jobLabel">Current Job</InputLabel>
                                <Select
                                    labelId="jobLabel"
                                    id="job"
                                    value={job}
                                    onChange={e => setJob(e.target.value)}
                                >
                                    {
                                        field.jobs.map(j => (
                                            <MenuItem key={j} value={j}>{j}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )
                    }
                     <FormControl style={{width:'100%', marginTop:'25px'}} align="left">
                        <Autocomplete
                            multiple
                            value={skillset}
                            options={skills}
                            getOptionLabel={option => option}
                            onChange={(event, newValue) => {
                                setSkillset(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} label="Additional Skills" variant="outlined" />}
                        />
                    </FormControl>
                    <FormControl style={{marginTop:'20px'}}>
                        <Grid container>
                            <Button
                                type="submit"
                                variant="contained"
                                color="default"
                                disabled={
                                    !name.trim() || !identification.trim() || !status || 
                                    (status === 'Employed' && !field) || (status === 'Employed' && !job)
                                }
                            >
                                Save
                            </Button>
                            <Link to="/" style={{textDecoration:'none'}}>
                                <Button variant="contained" color="primary" style={{marginLeft:'10px'}}>
                                    Return
                                </Button>
                            </Link>
                        </Grid>
                    </FormControl>
                </fieldset>
            </form>
        </Grid>
    )
}
