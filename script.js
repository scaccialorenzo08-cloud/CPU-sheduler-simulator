console.log('Happy developing ')

// DICHIARAZIONE VARIABILI GLOBALI
let p = ["A","B","C","D"]; //ARRAY PROCESSI
let at = ["9","9.05","9.07","9.08"]; //ARRAY TEMPO DI ARRIVO
let bt = ["18","14","11","12"]; //ARRAY TEMPO DI BURST
let rbt = []; //ARRAY TEMPO DI BURST RIMANENTE

/* FUNZIONE RESET
 La tabella dei processi viene sostituita con una tabella vuota
 Il contenuto dei div relativi all'output viene cancellato
*/
function reset(){
   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement('tbody');

   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
   document.getElementById("output").style.display = "none";
}
/* FUNZIONE START
 si inseriscono nel corpo della tabella i dati dei processi  (nome, tempo di arrivo, tempo di burst, tempo di burst rimanente, priorità)  si mostra il diagramma di Gantt di attivazione dei processi
*/
function start(){
   let i;
   rbt = bt;
   // si inseriscono nel corpo della tabella i dati dei processi 
   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement("tbody");
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
       tdEl = trEl.insertCell();
   }
   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
   document.getElementById("output").style.display = "block";
}
