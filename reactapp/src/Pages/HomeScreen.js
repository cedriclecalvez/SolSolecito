import React from 'react';

import Header from './Components/Header';
import Card from './Components/Card'; 

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';




function HomeScreen(){

    return(
        <div>
            <Header/>
            <h1>Bienvenidos a Sol Solecito</h1>
            <h2>Elige el evento que te gusta y reservalo !</h2>
            <Container component="main" maxWidth="md" justify="flex-center">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card/>
                    </Grid>
                </Grid>
            </Container>
        </div>
               
        
        
    )
};

export default HomeScreen;