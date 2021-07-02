const db = firebase.firestore();
const form = document.querySelector('.formulario');

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const errors = [];
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let about = document.getElementById("sobre").value;
    let number = document.getElementById("number").value;

    const datos = [nombre, apellido, about, number];
    datos.map(item=>{
        if(item.length <= 3){
            errors.push("Campos completados incorrectamente");
        }
    });
    if(email.includes("@") == false || email.includes(".com") == false){
        errors.push("Completado incorrectamente");
    }
    if(errors.length == 0){
        const datos = {
            nombre:nombre,
            apellido:apellido,
            email:email,
            about:about,
            number:number            
        }
        await db.collection("cliente").doc().set(datos);
        try{
            messageTrue();
        }
        catch(e){
            error();
        }
    }else{
        error();
    }
})
function closeAlert(node){
    node.style.display="none";
}
function error(){
    let node = document.getElementById('mensaje')
    node.style.display="block";
    node.innerHTML = 'Asegurese de escribir bien los campos'
    node.classList.remove("true-message");
    node.classList.add("false-message");
    scrollFunct();
    setTimeout((e)=>{
        closeAlert(node);
    },2000)
}
function messageTrue(){
    let node = document.getElementById('mensaje')
    node.style.display="block";
    node.innerHTML = 'Mensaje enviado con exito'
    node.classList.remove("false-message");
    node.classList.add("true-message");
    scrollFunct();
    setTimeout((e)=>{
        closeAlert(node);
    },2000)
}
function scrollFunct(){
        window.scrollBy(0, -window.innerHeight);
}
