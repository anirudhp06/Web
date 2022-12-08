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
var card=document.querySelector("#CardNumber");
var amt=document.querySelector("#CardAmount");

var refun_card=document.querySelector("#refun_num");
var findBal=document.querySelector("#balance");

var updateBtn=document.querySelector("#updateCard");
var chkBtn=document.querySelector("#check");

var refundBtn=document.querySelector("#refun");

function updateCard(){
    get(ref(db,"Card/"+card.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            update(ref(db,"Card/"+card.value),{
                Amount: amt.value
            })
            .then(()=>{
                alert("Card Updated");
            })
        }else{
            alert(card.value+" does not exists");
        }
    })
    .catch((error)=>{
        alert(error);
    })
    alert("Update Button Clicked");
}

function checkCard(){
    const dbref=ref(db);
    get(child(dbref,"Card/"+refun_card.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            findBal.innerHtml=snapshot.val().Amount+"/- available";
        }else{
            alert("card Not found");
        }
    })
    alert("Check Button Clicked");
}

function refundBal(){
    get(ref(db,"Card/"+card.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            update(ref(db,"Card/"+card.value),{
                Amount: 0
            })
            .then(()=>{
                alert("Amount Refunded");
            })
        }else{
            alert(card.value+" does not exists");
        }
    })
    .catch((error)=>{
        alert(error);
    })
    alert("Refund Button Clicked!");
}

updateBtn.addEventListener('click',updateCard);
refundBtn.addEventListener('click',refundBal);
chkBtn.addEventListener('click',checkCard);