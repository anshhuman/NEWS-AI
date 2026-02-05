import axios from 'axios';

export const fetchNewsByCategory = async(req,res) => {
    try {

        const {category} = req.params;
        // const {page = 1} = req.query;
        const { page = 1 } = req.query;
        console.log(page)
        const pageSize = 10;
        console.log(category)
        // console.log("API KEY:", `"${process.env.NEWS_API_KEY}"`);
        // const response = await axios.get
        const response = await axios.get
        (`https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&category=${category}&country=us&apiKey=${process.env.NEWS_API_KEY}`);
        // console.log(response.data);
        if (!response.data.articles.length) {
      return res
        .status(404)
        .json({ message: 'No news found for this category.' });
    }
        const categoryLength = response.data.totalResults;
        // const hasNextPage = page * pageSize < categoryLength;
        // console.log(`hasNextPage: ${hasNextPage}`);
        console.log(`Category Length: ${categoryLength}`);
        res.status(200).json({
            articles: response.data.articles,
            length : response.data.articles.length,
        nextPage : response.data.articles.length === pageSize ? Number(page) + 1 : null,
        });


    } catch (error) {
        console.log("News API Error:", error.response?.data || error.message);
        res.status(500).json({ message: "Error fetching news" });

    }
}

