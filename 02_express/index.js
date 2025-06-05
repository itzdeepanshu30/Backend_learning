import express from "express";

const app = express();
const port = 3000;
// app.get("/",(req,res)=>{
//     res.send("hello from Deepanshu ")
// })
// app.get("/ice-tea",(req,res)=>{
//     res.send("Do you like ice-tea? ")
// })
// app.get("/coffee",(req,res)=>{
//     res.send("Do you like coffe? ")
// })
app.use(express.json());
let teaData = [];
let nextId = 1;
// add new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;

  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});
// route all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});
// get tea with id
app.get('/teas/:id',(req,res)=>{
   const tea= teaData.find(t=> t.id===parseInt(req.params.id));
   if(!tea){
    return res.status(404).send("Data is not Found")
   }
   res.status(200).send(tea)
})
 
// update
 
app.put('/teas/:id',(req,res)=>{
    const tea= teaData.find(t=> t.id===parseInt(req.params.id));

   if(!tea){
    return res.status(404).send("Data is not Found")
   }
   const {name,price} = req.body
   tea.name= name;
   tea.price= price
   res.status(200).send(tea)
})
// delete tea
 app.delete('/teas/:id',(req,res)=>{
    const index= teaData.findIndex(t=> t.id===parseInt(req.params.id));
   if(index===-1){
    return res.status(404).send("Data is not Found")
   }
    teaData.splice(index,1)
    return res.status(200).send(`Tea with ID ${req.params.id} has been deleted.`);
   // other way is finding index and splice it 
 })
app.listen(port, () => {
  console.log(`server is listening at port:${port}..`);
});
