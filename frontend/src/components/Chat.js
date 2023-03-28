import React, {useEffect, useRef, useState} from 'react';
import './chat.css'
import axios from 'axios'
import io from "socket.io-client";
const socket = io('http://localhost:9000', {transports: ['websocket', 'polling', 'flashsocket']});
export const Chat = () => {

  useEffect(() => {
  
    let comment=document.getElementById('comments')
    let form=document.getElementById('form')
    let input=document.getElementById('input')
    form.addEventListener('submit',function(e){
        e.preventDefault();
     
        if(input.value){
            socket.emit('comment',input.value)
            input.value='';
        }
    })
    let msg=[]
    socket.on('output-messages',function(data){
    console.log(data)
 

for(let i=0;i<data.length;i++){
    msg[i]=`<li>${data[i].chat}</li>`
}
console.log(msg);
comment.innerHTML=msg;

    })
    socket.on('comment demo',function(mesg){
        let item=document.createElement('li');
        item.textContent=mesg;
       comment.appendChild(item)
    })
  }, [])
  


    return (
        <div>
           
           <ul id="comments" >
     
     </ul>
     <form id="form" action="" >
     
       <input id="input" autoComplete='off'  type="text" placeholder="type a message"  />
       <button type='submit'>Send</button>
     </form>
        </div>
    )
}
