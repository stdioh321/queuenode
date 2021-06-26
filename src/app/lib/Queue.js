import Queue from 'bull';
import mail from '../../config/mail';

import redisConfig from '../../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => {
    return { bull: new Queue(job.key, redisConfig), name: job.key, handle: job.handle };
})

export default {
    queues,
    add(name, data) {
        const queue = this.queues.find(q => q.name == name);
        return queue.bull.add(data);
    },
    process() {
        return this.queues.forEach(q => {
            q.bull.process(q.handle);
            q.bull.on("failed", (job, err) => {
                console.log("Job Failed");
                console.log(job.id);
                console.log(q.name);
                console.log(job.data);
            });
        })
    }
}
// import RegistrationMail from '../jobs/RegistrationMail';

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);
// mailQueue.on("failed", (jog, err) => {
//     console.log("Job Failed");
//     console.log(jog.id);
//     console.log(jog.name);
//     console.log(jog.data);
// });
// export default mailQueue;