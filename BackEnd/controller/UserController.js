import User from "../model/UserModel.js";

export const getUsers = async (req, res)=>{
    try{
        const response = await User.findAll();
        res.status(200).json(response)
    }catch (error){
        console.log(error.message);
    }
}

export const getUsersByID = async (req, res)=>{
    try{
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response)
    }catch (error){
        console.log(error.message);
    }
}

export const createUser = async(req,res)=>{
    try{
        await User.create(req.body);
        res.status(201).json({msg:"User Created"})
    } catch (error){
        console.log(error.message);
        }
    }


//Update
export const updateUser = async (req, res) => {
    try{
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Data berhasil diubah!"
        })
    } catch (error){
        console.log(error.message);
    }
}

//delete
export const deleteUser = async (req, res) => {
    await User.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({
        message: "Data berhasil dihapus!",
    });
}