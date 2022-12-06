// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLtbu7znzhba1IkzxfptkSbCIaQgUSDlE",
  authDomain: "fir-bcaf6.firebaseapp.com",
  databaseURL: "https://fir-bcaf6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-bcaf6",
  storageBucket: "fir-bcaf6.appspot.com",
  messagingSenderId: "214512315771",
  appId: "1:214512315771:web:bb12e5cc764754212161de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import{getDatabase, set,get,remove,update,ref,child} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

const db=getDatabase();
var enterID=document.querySelector("#enterID");
var enterName=document.querySelector("#enterName");
var enterAge=document.querySelector("#enterAge");

var findID=document.querySelector("#findID");
var findName=document.querySelector("#findName");
var findAge=document.querySelector("#findAge");

var insertBtn=document.querySelector("#insert");
var updateBtn=document.querySelector("#update");
var removeBtn=document.querySelector("#remove");
var findBtn=document.querySelector("#find");

function InsertData(){
    set(ref(db,"People/"+enterID.value),{
        Name:enterName.value,
        ID:enterID.value,
        Age:enterAge.value
    })
    .then(()=>{
        alert("Inserted Data!");
    })
    .catch((error)=>{
        alert(error);
    })
}

function FindData(){
    const dbref=ref(db);
    get(child(dbref,"People/"+findID.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            findName.innerHTML="Name:"+snapshot.val().Name;
            findAge.innerHTML="Age: "+snapshot.val().Age;
        }else{
            alert("No data Found");
        }
    })
    .catch((error)=>{
        alert(error);
    })
}

function UpdateData(){
    get(ref(db,"People/"+enterID.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
           update(ref(db,"People/"+enterID.value),{
            Name: enterName.value,
            Age: enterAge.value
           }) 
           .then(()=>{
            alert("Data Updated Successfully!");
           })
        }else{
            alert(enterID.value+" does not exists");
        }
    })
    .catch((error)=>{
        alert(error);
    })
}

function RemoveData(){
    remove(ref(db,"People/"+enterID.value))
    .then(()=>{
        alert("data removed!");
    })
    .catch((error)=>{
        alert(error);
    })
}

insertBtn.addEventListener('click', InsertData);
updateBtn.addEventListener('click', UpdateData);
removeBtn.addEventListener('click', RemoveData);
findBtn.addEventListener('click', FindData);