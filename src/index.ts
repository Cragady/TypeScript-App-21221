import 'dotenv/config';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express';

const main = async () => { 
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    const app = express(),
        PORT = process.env.PORT || 3000;

    app.get('/', (_, res) => {
        res.send("Hello");
    });

    app.listen(PORT, () => {
        console.log(`Server up on http://localhost:${PORT}`);
    });

    // const post = orm.em.create(Post, {title: 'my first post'});
    // await orm.em.persistAndFlush(post);

    // const posts = await orm.em.find(Post, {});
    // console.log(posts);
}

main().catch((err) => {
    console.error(err);
});
