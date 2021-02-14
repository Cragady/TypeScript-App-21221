import 'dotenv/config';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

console.log(process.env.DB_USER);

const main = async () => { 
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    // const post = orm.em.create(Post, {title: 'my first post'});
    // await orm.em.persistAndFlush(post);

    const posts = await orm.em.find(Post, {});
    console.log(posts);
}

main().catch((err) => {
    console.error(err);
});