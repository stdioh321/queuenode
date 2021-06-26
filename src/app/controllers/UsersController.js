import Mail from '../lib/Mail';
import Queue from '../lib/Queue';


export default {
    async store(req, res) {

        try {
            const { name, email, password } = req.body;
            const user = {
                name,
                email,
                password
            };
            //Enviar EMAIL
            var tmp = await Queue.add("RegistrationMail", { user });
            var userReport = await Queue.add("UserReport", { "tmp": 123 });
            return res.json(user);
        } catch (error) {
            return error;
        }
    }
}