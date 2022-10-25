import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { useForm } from 'react-hook-form';

import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { AuthContext } from '../../context';

type FormData = {
    name : string;
    email: string;
    password: string;
};

const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext);
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const onRegisterForm = async({ name, email, password } : FormData) => {
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if(hasError){
            setShowError(true);
            setErrorMessage( message! )
            setTimeout(() => {
                setShowError(false)
            }, 3000);

            return;
        }

        router.replace('/');
    }

    return (
        <AuthLayout title='Ingresar'>
            <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
                <Box sx={{ width: 350, padding:'10px 20px'}}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant='h1' component='h1'>Registrarme</Typography>
                            <Chip 
                                label='No reconocemos ese usuario'
                                color='error'
                                icon={ <ErrorOutline /> }
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none'}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Nombre Completo'
                                variant='filled'
                                fullWidth
                                { 
                                    ...register('name', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'Minimo 2 caracteres' }
                                    })
                                }
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Correo'
                                variant='filled'
                                fullWidth
                                { 
                                    ...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail
                                    })
                                }
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                { 
                                    ...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                    }) 
                                }
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                                Registrarme
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="/auth/login" passHref>
                                <Link underline='always'>
                                    Ya tienes una cuenta
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage