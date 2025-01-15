const reviewModel = require('../models/review')

const getReviewById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const rows = await reviewModel.getReviewById(bookId);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Book Not Found' });
        }

        const book = {
            id: rows[0].book_id,
            title: rows[0].title,
            author: rows[0].author,
            genre: rows[0].genre,
            published_date: rows[0].published_date,
            reviews: rows
                .filter(row => row.review_id)
                .map(row => ({
                    id: row.review_id,
                    user_id: row.user_id,
                    rating: row.rating,
                    comment: row.comment,
                    created_at: row.created_at,
                }))
        };

        return res.status(200).json({ message: 'Success', book });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching review', error });
    }
};

// const updateComment = async (req, res) => {
    
//     const { id } = req.params;
//     const { comment } = req.body;

//     if (!comment) {
//         return res.status(400).json({ message: 'Comment is required' });
//     }

//     try {
//         // Ambil data review berdasarkan ID
//         const review = await reviewModel.getReviewById(id);
//         if (!review) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }

//         const isOwner = req.user.id === review.user_id; // User ID dari token cocok dengan user_id dari review
//         console.log('isOwner', isOwner);
        
//         const isAdmin = req.user.role === "admin"; // Role admin

//         console.log(req.user.role)

//         if (!isOwner && !isAdmin) {
//             return res.status(403).json({ message: 'Kamu bukan pemilik comment ini' });
//         }

//         // Update comment jika user diizinkan
//         const result = await reviewModel.updateComment(id, comment);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }

//         res.status(200).json({ message: 'Comment updated successfully' });
//     } catch (error) {
//         console.log('error dari review model');
        
//         res.status(500).json({ message: error.message });
//     }
// };

const updateComment = async (req, res) => {
    console.log('dari review controller', req.params);
    
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).json({ message: 'comment is required' });
    }

    try {
        const result = await reviewModel.updateComment(id, comment);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'review not found' });
        }
        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.log({ message: error.message });
        
        res.status(500).json({ message: error.message });
    }
};

// const deleteReviewById = async (req, res) => {
//     const { id } = req.params
//     try {
//         const deletedCount = await reviewModel.deleteReviewById(id)
//         if (deletedCount > 0) {
//             res.status(200).json({ message: "Review deleted successfully" })
//         } else {
//             res.status(404).json({ message: "Review not found" })
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

const deleteReviewById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // ID pengguna yang sedang login, diasumsikan ada di req.user
    console.log('review ID', id, 'User ID', userId)

    try {
        // Dapatkan review berdasarkan ID
        const review = await reviewModel.getReviewByIdReviews(id);
        console.log('review ID', review.user_id)

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Periksa apakah user adalah pemilik review
        if (review.user_id !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }

        // Hapus review jika pemiliknya cocok
        const deletedCount = await reviewModel.deleteReviewById(id);
        if (deletedCount > 0) {
            res.status(200).json({ message: "Review deleted successfully" });
        } else {
            res.status(500).json({ message: "Failed to delete review" });
        }
    } catch (error) {
        console.log('cek 123');
        
        res.status(500).json({ message: error.message });
    }
};

const postReview = async (req, res) => {
    const data = req.body

    try {
        const add = await reviewModel.postReview(data)
        if (add) {
            return res.status(200).json({ message: 'Menambahkan review buku berhasil' })
        }
        return res.status(400).send({ message: 'Menambahkan review buku Failed' })

    } catch (eror) {
        console.log(eror);
    }
}

module.exports = {
    postReview,
    getReviewById,
    deleteReviewById,
    updateComment
}