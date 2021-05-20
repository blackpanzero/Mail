document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

 

  // By default, load the inbox
  load_mailbox('inbox');
  document.querySelector('#inbox').onclick=inbox
  document.querySelector('body').onload=inbox

 
  
function inbox(){
  document.querySelector('#alert').style.display = 'none';
  

    fetch('/emails/inbox')
    .then(response => response.json())
    .then(emails => {
        // Print emails
        if( emails.length==0){
          console.log("empty")
          var h3= document.createElement('H4');
          h3.innerHTML='No messages yet'
          document.querySelector('#emails-view').append(h3)
        }
        
        
        const li=document.createElement('li');
        console.log(emails)
        for(i in emails){

          const clas=emails[i].id
          let div = document.createElement('div');
          let div1=document.createElement('div');
          let div2=document.createElement('div');
          let div3=document.createElement('div');
          let fa=document.createElement('i')

          let br = document.createElement('br')
          let a=document.createElement('div')
          var btn = document.createElement("BUTTON");   // Create a <button> element
          btn.innerHTML = "archive"; 
        

          
          if(emails[i].read===true){a.style.backgroundColor = "grey";fa.setAttribute("class","col-sm-1 fa fa-envelope-open")}
          else{fa.setAttribute("class","col-sm-1 fa fa-envelope")}

          a.setAttribute("class","row others-msg")
          console.log(`${emails[i].read}`)
          fa.setAttribute("style","font-size:28px")
          
          
        
          a.setAttribute("id",`email${clas}`)
          div.setAttribute("class","dropdown-divider")
          div.setAttribute("id","dropdown-divider")
          div1.setAttribute("class","col-sm-4")
          div2.setAttribute("class","col-sm-4")
          div3.setAttribute("class","col-sm-3")

          


          div1.innerHTML=`${emails[i].sender}`
          div2.innerHTML=`subject-${emails[i].subject}`
          div3.innerHTML=`${emails[i].timestamp}`


          
          
          a.innerHTML+=fa.outerHTML
          a.innerHTML+=div1.outerHTML +  br.outerHTML ;
          a.innerHTML+=div2.outerHTML + br.outerHTML
          a.innerHTML+=div3.outerHTML + br.outerHTML;

        
          document.querySelector('#emails-view').append(a) ;
          document.querySelector('#emails-view').append(div) ;

          
          
          document.querySelector(`#email${clas}`).onclick=()=>{
            
            fetch(`/emails/${clas}`, {
              method: 'PUT',
              body: JSON.stringify({
                  read: true
              })
            })
          
         
          
          

          
              fetch(`/emails/${clas}`)

            .then(response => response.json())
            .then(email => {     

          let p = document.createElement('div');
          let br = document.createElement('br')
          let a=document.createElement('a')
          let button=document.createElement("BUTTON");
          var btn = document.createElement("i");   // Create a <button> element
          var i=document.createElement("i"); 
          let archive= document.createElement("BUTTON");
          let to="To"
          let from="From"
          let subject="subject"
          let date="Time"
          let div=document.createElement('div')

          div.innerHTML=`${email.timestamp}`
          div.setAttribute("class"," font-weight-bold float-right")
        
           

          a.setAttribute("href","#")
       
          p.setAttribute("class","dropdown-divider")
          btn.setAttribute("class","fa fa-archive")
  
       
          
          i.setAttribute("class","fa fa-reply")
          button.setAttribute("class","reply btn btn-outline-primary")
          button.innerHTML+="reply"+i.outerHTML
          archive.setAttribute("class","archive btn btn-outline-primary float-right")
          archive.innerHTML+="archive"+btn.outerHTML

          a.innerHTML+= div.outerHTML+`${from.bold()}: ${email.sender}` +  br.outerHTML ;
          a.innerHTML+=`${to.bold()}: ${email.recipients}` + br.outerHTML ;
          a.innerHTML+=`${subject.bold()}: ${email.subject}` + br.outerHTML;
          a.innerHTML+= br.outerHTML+archive.outerHTML+button.outerHTML+ p.outerHTML;

          a.innerHTML+=`${email.body}` + br.outerHTML ;
       
          document.querySelector('#emails-view').innerHTML=a.innerHTML
                // Print email
              
            

                document.querySelector(".archive").onclick=()=>{
                  console.log("helo")
                  fetch(`/emails/${email.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        archived: true
                        
                    })
                  })
                  
                  location.reload()
                }


                document.querySelector(".reply").onclick=()=>{
               
                 
                  compose_email()
                  document.querySelector('#compose-recipients').setAttribute("value",`${email.sender}`)  
                  document.querySelector('#compose-recipients').value=`${email.sender}`
                  document.querySelector('#compose-subject').value=`RE:${email.subject}`
                  document.querySelector('#compose-body').value=`On ${email.timestamp} ${email.sender} wrote:${email.body}`

                  


                 
                 

                }
               
              
            })
          }

 
     
          

      

        }
        
       
    
        // ... do something else with emails ...
    });
    

  }



  document.querySelector('#compose-form').onsubmit=compose
 

  function compose() {
     fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: document.querySelector('#compose-recipients').value,
          subject: document.querySelector('#compose-subject').value,
          body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        if(result.error){
        document.querySelector('#message').innerHTML=result.error

        document.querySelector('#alert').style.display = 'block';
        compose_email()

      }
        else{
          document.querySelector('#message').innerHTML=result.message

          document.querySelector('#alert').style.display = 'block';
          console.log(result);
          load_mailbox('sent');
      document.querySelector('body').onload=sent
      sent()


        }
 

   
    });
    
  }

document.querySelector('#sent').onclick=sent
function sent() {

  

  fetch('/emails/sent')
.then(response => response.json())
.then(emails => {
       // Print emails
       if( emails.length==0){
        console.log("empty")
        var h3= document.createElement('H4');
        h3.innerHTML='You have not sent any messages yet'
        document.querySelector('#emails-view').append(h3)
      }
      
      
        
        
       const li=document.createElement('li');
       for(i in emails){

         const clas=emails[i].id
         let div = document.createElement('div');
         let div1=document.createElement('div');
         let div2=document.createElement('div');
         let div3=document.createElement('div');
         let fa=document.createElement('i')
         

         let br = document.createElement('br')
         let a=document.createElement('div')
         var btn = document.createElement("BUTTON");   // Create a <button> element
         btn.innerHTML = "archive"; 

         let icon=document.createElement('i')
         let button=document.createElement('BUTTON')

         a.setAttribute("href","#")
         a.setAttribute("class","row read  others-msg")
         a.setAttribute("id",`email${clas}`)
         div.setAttribute("class","dropdown-divider")
         div1.setAttribute("class","col-sm-4")
         div2.setAttribute("class","col-sm-4")
         div2.setAttribute("class","col-sm-3")
         fa.setAttribute("class","col-sm-1 fa fa-paper-plane")
         fa.setAttribute("style","font-size:24px")


         div1.innerHTML=`To:${emails[i].recipients}`
         div2.innerHTML=`Subject-:${emails[i].subject}`
         div3.innerHTML=`${emails[i].timestamp}`

         
       

         
         
         a.innerHTML+=fa.outerHTML
         a.innerHTML+=div1.outerHTML +  br.outerHTML;
         a.innerHTML+=div2.outerHTML + br.outerHTML
         a.innerHTML+=div3.outerHTML + br.outerHTML;
       
         document.querySelector('#emails-view').append(a) ;
         document.querySelector('#emails-view').append(div) ;

         
         
         document.querySelector(`#email${clas}`).onclick=()=>{
          document.querySelector('#alert').style.display = 'none';
           console.log(`${clas}`)
             fetch(`/emails/${clas}`)

           .then(response => response.json())
           .then(email => {
            let p = document.createElement('div');
            let br = document.createElement('br')
            let a=document.createElement('a')
            let to="To"
            let from="From"
            let subject="subject"
            let date="Time"
            let div=document.createElement('div')
  
            div.innerHTML=`${email.timestamp}`
            div.setAttribute("class"," font-weight-bold float-right")
          
             
  
            a.setAttribute("href","#")
         
            p.setAttribute("class","dropdown-divider")
        
  
            a.innerHTML+= div.outerHTML+`${from.bold()}: Me` +  br.outerHTML ;
            a.innerHTML+=`${to.bold()}: ${email.recipients}` + br.outerHTML ;
            a.innerHTML+=`${subject.bold()}: ${email.subject}` + br.outerHTML;
            a.innerHTML+= br.outerHTML+ p.outerHTML;
  
            a.innerHTML+=`${email.body}` + br.outerHTML ;
      
         document.querySelector('#emails-view').innerHTML=a.innerHTML
               // Print email
             
               console.log(email);
         
             
           })
         }


    
         

     

       }
       
      
   
     
    // ... do something else with emails ...
});
}


document.querySelector('#archived').onclick=()=>{
  document.querySelector('#alert').style.display = 'none';



  
  fetch('/emails/archive')
.then(response => response.json())
.then(emails => {
       // Print emails
       if( emails.length==0){
        console.log("empty")
        var h3= document.createElement('H4');
        h3.innerHTML='No archived messages'
        document.querySelector('#emails-view').append(h3)
      }
      
      
        
       const li=document.createElement('li');
       for(i in emails){

         const clas=emails[i].id
         let div = document.createElement('div');
         let div1=document.createElement('div');
         let div2=document.createElement('div');
         let div3=document.createElement('div');
         let fa=document.createElement('i')

         let br = document.createElement('br')
         let a=document.createElement('div')
         var btn = document.createElement("BUTTON");   // Create a <button> element
         btn.innerHTML = "archive"; 

         a.setAttribute("href","#")
         a.setAttribute("class","row read others-msg")
         a.setAttribute("id",`email${clas}`)
         div.setAttribute("class","dropdown-divider")
         div1.setAttribute("class","col-sm-4")
         div2.setAttribute("class","col-sm-4")
         div2.setAttribute("class","col-sm-3")
         fa.setAttribute("class","col-sm-1 fa fa-archive")
         fa.setAttribute("style","font-size:24px")


         div1.innerHTML=`${emails[i].sender}`
         div2.innerHTML=`subject-${emails[i].subject}`
         div3.innerHTML=`${emails[i].timestamp}`


         
         
         a.innerHTML+=fa.outerHTML;
         a.innerHTML+=div1.outerHTML +  br.outerHTML;
         a.innerHTML+=div2.outerHTML + br.outerHTML
         a.innerHTML+=div3.outerHTML + br.outerHTML;
       
         document.querySelector('#emails-view').append(a) ;
         document.querySelector('#emails-view').append(div) ;

         
         
         document.querySelector(`#email${clas}`).onclick=()=>{
           console.log(`${clas}`)
             fetch(`/emails/${clas}`)

           .then(response => response.json())
           .then(email => {
             
             
          let p = document.createElement('div');
          let br = document.createElement('br')
          let a=document.createElement('a')
        
          var btn = document.createElement("i");   // Create a <button> element
        
          let archive= document.createElement("BUTTON");
          let to="To"
          let from="From"
          let subject="subject"
          let date="Time"
          let div=document.createElement('div')

          div.innerHTML=`${email.timestamp}`
          div.setAttribute("class"," font-weight-bold float-right")
        
           

          a.setAttribute("href","#")
       
          p.setAttribute("class","dropdown-divider")
          btn.setAttribute("class","fa fa-archive")
  
       
          
         
       
          archive.setAttribute("class","archive btn btn-outline-primary ")
          archive.innerHTML+="unarchive"+btn.outerHTML

          a.innerHTML+= div.outerHTML+`${from.bold()}: ${email.sender}` +  br.outerHTML ;
          a.innerHTML+=`${to.bold()}: ${email.recipients}` + br.outerHTML ;
          a.innerHTML+=`${subject.bold()}: ${email.subject}` + br.outerHTML;
          a.innerHTML+= archive.outerHTML+br.outerHTML+ p.outerHTML;

          a.innerHTML+=`${email.body}` + br.outerHTML ;

       
         document.querySelector('#emails-view').innerHTML=a.innerHTML
               // Print email
             
               console.log(email);
               document.querySelector(".archive").onclick=()=>{
                        
         
                 fetch(`/emails/${email.id}`, {
                   method: 'PUT',
                   body: JSON.stringify({
                       archived: false
                       
                   })
                 })
                 location.reload()
               }
             
           })
         }


    
         

     

       }
       
      
   
       // ... do something else with emails ...

    // ... do something else with emails ...
});

}





});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}