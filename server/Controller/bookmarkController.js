import User from "../Model/model.js";

export const addBookmark = async (req,res) => {

    try {

    const { id } = req.params;
    const {article} = req.body;
    const user = await User.findById(id)
    console.log(article)
    if(!user) {
        return res.status(404).json({message:"User not found"});
    }
    const bookmarkExists = user.bookMarks.some(bookmark => bookmark.url === article.url);
    console.log(bookmarkExists)

    if(bookmarkExists) {
        return res.status(400).json({message : "Article already exists"});
    }

    const newBookmark = {
      url: article.url,
      title: article.title,
      description: article.description
    };

    user.bookMarks.push(newBookmark);

    // user.bookMarks.push(article);
    await user.save();
    return res.status(200).json({
        message : "Bookmark added successfully",
        bookMarks : user.bookMarks
    });
    

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
};


export const getBookmark = async(req,res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({message : "User not found"});
        }
        return res.status(200).json({
            data : user.bookMarks
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
};

export const deleteBookmark = async(req,res) => {
    try{
        const {articleID , id} =  req.params;
        console.log(articleID)
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({
                message: " User not found"
            })
        }
        const beforeCount = user.bookMarks.length;
        user.bookMarks = user.bookMarks.filter(book => book.bookmarkId.toString() !== articleID);
        const afterCount = user.bookMarks.length;
        if(beforeCount === afterCount) {
            return res.status(404).json({
                message : "Bookmark not found"
            });
        }
        await user.save();
        return res.status(200).json({
            message : "Bookmark deleted successfully",
            bookMarks : user.bookMarks
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
};
