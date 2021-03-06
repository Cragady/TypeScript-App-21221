import "reflect-metadata";
import 'dotenv/config';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => { 
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    const app = express(),
        apolloServer = new ApolloServer({ 
            schema: await buildSchema({
                resolvers: [ HelloResolver, PostResolver, UserResolver ],
                validate: false
            }),
            context: () => ({ em: orm.em })
        }),
        PORT = process.env.PORT || 3000;


    apolloServer.applyMiddleware({ app });

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
