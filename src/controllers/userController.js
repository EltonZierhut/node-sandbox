const { createUser, getALLUsers, getUserById, updateUser, deleteUser } = require('../service/user');

module.exports = {
    createUser: async (req, res) => {
        const { name, email, password } = req.query;

        try {
            await createUser(name, email, password);
            res.status(201).json({ message: 'Success' });
        } catch (error) {
            res.status(500).send({
                message: 'Error adding user!',
                body: error.message,
            });
        }},
    getALLUsers: async (req, res) => {
        try {
            const rows = await getALLUsers();
    
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).send({
                message: 'Error getting users!',
                body: error.message,
            });
        }
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
    
        try {
            const user = await getUserById(id);
    
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({
                message: 'Error getting user!',
                body: error.message,
            });
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, password } = req.query;
    
        try {
            const rows = await updateUser(id, name, email, password);
    
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).send({
                message: 'Error updating user!',
                body: error.message,
            });
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
    
        try {
            await deleteUser(id);
    
            res.status(200).send({ message: 'User deleted successfully!' });
        } catch (error) {
            res.status(500).send({
                message: 'Error deleting user!',
                body: error.message,
            });
        }
    },
};
