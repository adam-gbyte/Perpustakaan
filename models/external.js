const parseBooks = (data) => {
    return {
        title: data.title || 'Unknown Title',
        author: data.author_name ? data.author_name.join(', ') : 'Unknown Author',
        genre: data.subject || [],
        published_date: data.first_publish_year || 'Unknown Year'
    };
};

module.exports = parseBooks;
