import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'


import App from './App';
import SignInScreen from './Pages/SignInScreen'





// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



describe("SignInScreen", () =>{

  it ("no error", async ()=>{

    render(<SignInScreen/>)

    const email = screen.getByText('Correo electronico')
    const password = screen.getByText('Contraseña')
    const submitButton = screen.getByText("Iniciar sesiòn").closest("button")

    userEvent.type(email, "ced@")
    userEvent.type(password, "ced")
    userEvent.click(submitButton)

    await waitFor (()=>{

      expect(screen.getByText('')).toBeInTheDocument()
    })


  });


});