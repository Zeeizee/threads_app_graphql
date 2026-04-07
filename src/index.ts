import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

const initServer = async () => {
  const app = express();
  app.use(express.json())
  const PORT = process.env.PORT || 8000;
  const server=new ApolloServer({
    typeDefs:`
    type Query{
    hello:String
    sayHelloToParametrTime(to:String,times:Int):String
    }
    `,
    resolvers:{
        Query:{
            hello:()=>'i am zeni',
            sayHelloToParametrTime:(_,{to,times}:{to:string,times:number})=>{
                return `Hello ${to} ${times} times`
            }
        }
    }
  })
  await server.start()
  app.use('/graphql',expressMiddleware(server))
  app.get("/", (req, res) => {
    res.send("i am working");
  });
  app.listen(PORT, () => {
    console.log(`servers is running at ${PORT}`);
  });
};
initServer();
