const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const _ = require("lodash")
const mongoose= require("mongoose")


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
const fecha = require (__dirname + "/date.js")

mongoose.connect("mongodb+srv://santiagomarinodiaz:olasanty96@cluster0.qgdvvsd.mongodb.net/ToList")

app.set("view engine","ejs")

app.listen(3000, () => console.log("funciona"))

const itemschema = new mongoose.Schema({
    nombre:String
},{collection:"List"})
const Item = mongoose.model("Item",itemschema)

const estudy = new Item ({
    nombre : "estudiar"
})
const trabajar = new Item ({
    nombre : "trabajar"
})
const ingles = new Item ({
    nombre : "ingles"
})
const insertar = [estudy,trabajar,ingles]
const listSchema = new mongoose.Schema({
    nombre: String,
    default: [itemschema]
},{collection:"parametros"})
const parametros = new mongoose.model("parametros",listSchema) 
app.get("/", function (req,resp) {
    

    
    Item.find({}).then((Este)=>{
        if (Este.length===0) {
            
            Item.insertMany(insertar)
            resp.redirect("/")
        } else {
        
        resp.render("list",{dia:dia,nuevaTarea: Este})
        }
        }).catch((err)=>{
            console.error(err);
        })
    fecha.XDia()

})
app.post("/",(req,resp)=>{

    let Tareas = req.body.tarea;
    const Tarea = new Item({
        nombre: Tareas
    })
    if (req.body.boton===dia) {
    Tarea.save()
    resp.redirect("/")
    } else {
        parametros.findOne({nombre:req.body.boton}).then((newparam)=>{
            newparam.default.push(Tarea)
            resp.redirect("/" + req.body.boton)
            newparam.save()
        }).catch((err)=>{console.error(err);})
    }

   
})
app.post("/delete",(req,resp)=>{
    const elimina = req.body.cuadro;
    const listt = req.body.elicustom
    if (listt===dia) {
        Item.deleteOne({_id:elimina}).then((result)=>{
        result
        }).catch((err)=>{console.error(err);})
        resp.redirect("/")
    } else {
        parametros.findOneAndUpdate({nombre:listt},{$pull:{default:{_id:elimina}}}).then((resut)=>{
            resp.redirect("/"+ listt)
        })
    }

})
app.get("/:listCat",(req,resp)=>{
   const listCat = _.capitalize(req.params.listCat);

   parametros.findOne({nombre:listCat}).then((esta)=>{
    if (!esta) {
        const Busqueda = new parametros({
            nombre : listCat,
            default : insertar
           })
           Busqueda.save()
           resp.redirect("/" + listCat )
    } else {
        resp.render("list",{dia:esta.nombre,nuevaTarea:esta.default})
    }
   }
   ).catch((err)=>{console.error(err)})


 
})

