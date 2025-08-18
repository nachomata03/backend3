export default class UserController {
    async getUsers(req, res) {
            try{
                const result = await usersService.getUsers()
                res.json({status: 'success', response: result})
            } catch (error) {
                const statusCode = error.statusCode || 500;
                res.status(statusCode).json({ status: 'error', message: error.message });
            }
        }
    
        async getUser(req, res) {
            const id = req.params.id;
            try{
                const result = await usersService.getUser(id)
                res.json({status: 'success', response: result})
            } catch (error) {
                const statusCode = error.statusCode || 500;
                res.status(statusCode).json({ status: 'error', message: error.message });
            }
        }
    
        async createUser(req, res){
            const body = req.body;
            try{
                const result = await usersService.createUser(body)
                res.status(201).json({ status: 'success', response: result });
            } catch (error) {
                const statusCode = error.statusCode || 500;
                res.status(statusCode).json({ status: 'error', message: error.message });
            }
        }
    
        async updateUser(req, res){
            const id = req.params.id;
            const body = req.body;
            try {
                const result = await usersService.updateUser(id, body);
                res.json({ status: 'success', response: result });
            } catch (error) {
                const statusCode = error.statusCode || 500;
                res.status(statusCode).json({ status: 'error', message: error.message });
            } 
        }
    
        async deleteUser(req, res){
            const id = req.params.id;
            try{
                const result = await usersService.deleteUser(id)
                res.json({status: 'success', response: result})
            }catch(error){
                const statusCode = error.statusCode || 500;
                res.status(statusCode).json({ status: 'error', message: error.message });
            }
        }    
}