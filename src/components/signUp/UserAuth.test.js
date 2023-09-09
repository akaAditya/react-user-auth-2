import { render, screen } from "@testing-library/react";
import UserAuth from "./UserAuth";

describe('UserAuth Component', ()=>{
    test('renders test login',()=>{
        //Arrange
        render(<UserAuth />)
        //Act
    
        //Assert
        const userAuthTest = screen.getByText('Email');
        expect(userAuthTest).toBeInTheDocument();

    })
})