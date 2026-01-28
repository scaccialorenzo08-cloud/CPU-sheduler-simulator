
let p = [];   //ARRAY PROCESSI
let at = [];  //ARRAY TEMPO DI ARRIVO
let bt = [];  //ARRAY TEMPO DI BURST
let rbt = []; //ARRAY TEMPO DI BURST RIMANENTE


/* FUNZIONE CREA INPUT
   Crea i campi per inserire tempo di arrivo
*/
function creaInput(){

   let n = document.getElementById("numProcessi").value;

   if(n === "" || n <= 0){
      alert("Inserisci un numero valido di processi");
      return;
   }

   let div = document.getElementById("inputProcessi");

   div.innerHTML = "";

   for(let i=0; i<n; i++){

      div.innerHTML +=
      "Processo " + (i+1) + " : " +
      " Arrival <input type='number' id='at"+i+"'> " +
      " Burst <input type='number' id='bt"+i+"'> <br><br>";
   }
}


/* FUNZIONE RESET
   La tabella dei processi viene sostituita con una tabella vuota
   Il contenuto dei div relativi all'output viene cancellato
*/
function resetAll(){

   // svuoto valori precedenti
   p = [];
   at = [];
   bt = [];
   rbt = [];

   // Svuoto input
   document.getElementById("numProcessi").value = "";
   document.getElementById("inputProcessi").innerHTML = "";

   // Nascondo tabella
   document.getElementById("idTable").style.display = "none";

   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement('tbody');

   tableEl.replaceChild(newTBodyEl, oldTBodyEl);

   document.getElementById("output").style.display = "none";
}


/* FUNZIONE START
   si inseriscono nel corpo della tabella i dati dei processi
   (nome, tempo di arrivo, tempo di burst, tempo di burst rimanente)
   si mostra il diagramma di Gantt di attivazione dei processi
*/
function start(){

   let n = document.getElementById("numProcessi").value;

   if(n === "" || n <= 0){
      alert("Inserisci prima il numero dei processi");
      return;
   }

   // svuoto array
   p = [];
   at = [];
   bt = [];
   rbt = [];


   // Lettura input
   for(let i=0; i<n; i++){

      let arrival = document.getElementById("at"+i).value;
      let burst = document.getElementById("bt"+i).value;

      if(arrival === "" || burst === ""){
         alert("Compila tutti i campi");
         return;
      }

      if(isNaN(arrival) || isNaN(burst)){
         alert("Inserisci solo numeri");
         return;
      }

      p.push("P" + (i+1));
      at.push(Number(arrival));
      bt.push(Number(burst));
   }


   /* applico FCFS */

   let processi = [];

   for(let i=0; i<p.length; i++){

      processi.push({
         nome: p[i],
         at: at[i],
         bt: bt[i]
      });
   }

   processi.sort(function(a,b){
      return a.at - b.at;
   });


   
   p = [];
   at = [];
   bt = [];

   for(let i=0; i<processi.length; i++){

      p.push(processi[i].nome);
      at.push(processi[i].at);
      bt.push(processi[i].bt);
   }


   // Remaining burst = burst
   rbt = bt.slice();


   // inserisce nella tabella i dati dei processi
   let tableEl = document.getElementById("idTable");

   tableEl.style.display = "table";

   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement("tbody");

   let i;

   for(i=0; i<p.length; i++) {

       const trEl = newTBodyEl.insertRow();

       let tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(p[i]));

       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(at[i]));

       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(bt[i]));

       tdEl = trEl.insertCell();
       tdEl.id = "idP" + i;
       tdEl.appendChild(document.createTextNode(rbt[i]));

   }

   tableEl.replaceChild(newTBodyEl, oldTBodyEl);

   document.getElementById("output").style.display = "block";
}