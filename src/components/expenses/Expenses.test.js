import { render, screen } from "@testing-library/react";
import Expenses from "./Expenses";

describe('Expenses', ()=>{

    test('test Update Expenses', ()=>{
        render(<Expenses />);
        const getUpdateExpenses = screen.getByText('Update Expense');
        expect(getUpdateExpenses).toBeInTheDocument();
    })

    test('test Add Expenses', ()=>{
        render(<Expenses />);
        const getAddExpenses = screen.getByText('Add Expenses');
        expect(getAddExpenses).toBeInTheDocument();
    })

    test('test Delete Expenses', ()=>{
        render(<Expenses />);
        const getDeleteExpenses = screen.getByText('Delete');
        expect(getDeleteExpenses).toBeInTheDocument();
    })

    test('test Edit Expenses', ()=>{
        render(<Expenses />);
        const getDeleteExpenses = screen.getByText('Edit');
        expect(getDeleteExpenses).toBeInTheDocument();
    })
})