const loansModel = require('../models/loans')

const getAllLoans = async (req, res) => {
    try {
        const loans = await loansModel.getAllLoans();
        if (loans) {
            return res.status(200).json(loans);
        }
        return res.status(400).send({ msg: 'Loans not found' });
    } catch (error) {
        console.log(error);
    }
}

const getLoansByIdUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const rows = await loansModel.getLoansByIdUser(userId);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Book Not Found' });
        }

        const loan = {
            id: rows[0].user_id,
            name: rows[0].name,
            email: rows[0].email,
            phone: rows[0].phone,
            loans: rows
                .filter(row => row.loans_id !== null)
                .map(row => ({
                    id: row.loan_id,
                    user_id: row.user_id,
                    book_id: row.book_id,
                    loan_date: row.loan_date,
                    return_date: row.return_date,
                })
            )
        };

        return res.status(200).json({ message: 'Success', loan });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching review', error });
    }
}

const updateReturnDate = async (req, res) => {
    const { id } = req.params;
    const { return_date } = req.body;

    if (!return_date) {
        return res.status(400).json({ message: 'return_date is required' });
    }

    try {
        const result = await loansModel.updateReturnDate(id, return_date);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Return date updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postLoans = async (req, res) => {
    const data = req.body

    try {
        const add = await loansModel.postLoans(data)
        if (add) {
            return res.status(200).json({ message: 'Menambahkan peminjaman buku sukses' })
        }
        return res.status(400).send({ msg: 'Menambahkan peminjaman buku Failed' })

    } catch (eror) {
        console.log(eror);
    }
}

module.exports = {
    getAllLoans,
    postLoans,
    getLoansByIdUser,
    updateReturnDate
}