import User from '../Model/model.js';

export const addReadingHistory = async (req,res) => {
    try {

    const { id } = req.params;
    const { article } = req.body;
    console.log(article);

    const user = await User.findById(id);
    if(!user) {
        return res.status(404).json({message : "User not found"});  
    }

    const historyExists = user.readingHistory.some(history => history.url === article.url);
    console.log(historyExists)
    if(!historyExists) {
        // user.readingHistory.unshift(article);
        // Remove duplicates while preserving order
        // user.readingHistory = user.readingHistory.filter((history, index, self) =>
        //     index === self.findIndex((h) => h.url === history.url)
        // );
        // user.readingHistory = user.readingHistory.filter(history => history.url !== article.url);
        user.readingHistory.unshift({url: article.url})

        } else if(historyExists){
            return res.status(200).json({
                message : "Article already exists in reading history"
            });
        }

    //  const newHistory = {
    //   url: article.url,
    // };
    // user.readingHistory.push(newHistory);

    // Limit history to last 50 articles
    if(user.readingHistory.length > 5) {
        user.readingHistory = user.readingHistory.slice(0, 5); 
    };
    await user.save();
    return res.status(200).json({
        message : "Reading history updated successfully",
        readingHistory : user.readingHistory
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
};

export const deleteReadingHistory = async (req,res) => {
    try{
        const {id} = req.params;
        const {articleID} = req.params;
        console.log("ArticleID to delete:", articleID);
        const user = await User.findById(id);   
        if(!user) {
            return res.status(404).json({
                message: " User not found"
            })
        }
        const beforeCount = user.readingHistory.length;
        // const checkURL = user.readingHistory.some(history => history.url === articleID);
        const checkURL = user.readingHistory.some(h => h.historyId.toString() === articleID);
        console.log(checkURL)
        if(checkURL) {
            user.readingHistory = user.readingHistory.filter(h => h.historyId.toString() !== articleID);
            await user.save();
            return res.status(200).json({
                message : "Reading history article deleted successfully",
                readingHistory : user.readingHistory
            });
        } 
        const afterCount = user.readingHistory.length;

        if(user.readingHistory.length === 0) {
            return res.status(200).json({
                message : "Reading history is already empty",})
         }
           else if(beforeCount === afterCount) {
            return res.status(404).json({
                message : "History article not found"
            });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
};

export const getReadingHistory = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({
                message: " User not found"
            })
        }
        const history = user.readingHistory.length;
        console.log(history);
        if(history === 0) {
            return res.status(200).json({
                message : "Reading history is empty",
                readingHistory : []
            });
        }
        return res.status(200).json({
            message : "Reading history fetched successfully",
            readingHistory : user.readingHistory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
};
