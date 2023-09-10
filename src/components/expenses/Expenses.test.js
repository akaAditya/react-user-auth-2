import { render, screen } from "@testing-library/react";
// import expect from  '@testing-library/jest-dom/extend-expect'
import { describe, expect, test } from '@jest/globals';
import Expenses from "./Expenses";
import userEvent from "@testing-library/user-event";

describe('Expenses', ()=>{

    test('test Update Expenses', ()=>{
        render(<Expenses />);
        const getUpdateExpenses = screen.getByText('Update Expense');
        expect(getUpdateExpenses).toBeInTheDocument();
    })

    test('test Add Expenses', ()=>{
        render(<Expenses />);
        const getAddExpenses = screen.getByText('Add Expenses', {exact: false});
        expect(getAddExpenses).toBeInTheDocument()
    })

    test('test Delete Expenses', ()=>{
        render(<Expenses />);
        const getDeleteExpenses = screen.getByText('Delete');
        expect(getDeleteExpenses).toBeInTheDocument();
    })

    test('test delete Expenses', ()=>{
        render(<Expenses />);
        const getDeleteExpenses = screen.getByText('Edit');
        expect(getDeleteExpenses).toBeInTheDocument();
    })

    //Act
    test('test delete Expenses', ()=>{
        render(<Expenses />);
        const getDeleteExpenses = screen.getByRole('button');
        userEvent.click(getDeleteExpenses);

        const outputElement = screen.getByText('Delete', {exact: false});
        expect(outputElement).toBeInTheDocument()
    })

    test('test Edit Expenses', ()=>{
        render(<Expenses />);
        const getEditExpenses = screen.getByRole('button');
        userEvent.click(getEditExpenses);

        const outputElement = screen.getByText('Edit', {exact: false});
        expect(outputElement).toBeInTheDocument()
    })

    test('test Post Expenses', ()=>{
        render(<Expenses />);
        const getEditExpenses = screen.getByRole('button');
        userEvent.click(getEditExpenses);

        const outputElement = screen.getByText('Add Expenses', {exact: false});
        expect(outputElement).toBeInTheDocument()
    })

    test('test premium', ()=>{
        render(<Expenses />);
        const getPremium = screen.getByRole('button');
        userEvent.click(getPremium);

        const outputElement = screen.getByText('Premium', {exact: false});
        expect(outputElement).toBeInTheDocument()
    })
})