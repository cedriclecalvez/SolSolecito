import React from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';



function Footer(){
    
    
    return(
        <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
                Sol Solecito <span></span>
                {'Copyright © '}
                2021
                created by Cédric Le Calvez
            </Typography>
        </Box>
    )
    
};
export default Footer;
