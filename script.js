function show(id){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* STORAGE */
let stocks = JSON.parse(localStorage.getItem("stocks")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let invests = JSON.parse(localStorage.getItem("invests")) || [];
let monthlyIncome = JSON.parse(localStorage.getItem("monthlyIncome")) || [];

/* SAVE */
function save(){
localStorage.setItem("stocks",JSON.stringify(stocks));
localStorage.setItem("expenses",JSON.stringify(expenses));
localStorage.setItem("incomes",JSON.stringify(incomes));
localStorage.setItem("invests",JSON.stringify(invests));
localStorage.setItem("monthlyIncome",JSON.stringify(monthlyIncome));
}

/* ================= STOCK ================= */
function addStock(){
stocks.push({
name:sname.value,
buy:buyprice.value,
qty:sqty.value,
sellname:sname2.value,
sell:sellprice.value
});
save();renderStock();updateDashboard();
}

function renderStock(){
stockList.innerHTML="";
stocks.forEach((s,i)=>{
stockList.innerHTML+=`
<div class="card">
<b>${s.name}</b><br>
Buy:${s.buy} Qty:${s.qty}<br>
Sell:${s.sellname || "-"} Price:${s.sell || "-"}
<div class="action">
<div class="smallbtn" onclick="editStock(${i})">Edit</div>
<div class="smallbtn del" onclick="delStock(${i})">Delete</div>
</div>
</div>`;
});
}

function delStock(i){
stocks.splice(i,1);
save();renderStock();updateDashboard();
}

function editStock(i){
let s=stocks[i];
sname.value=s.name;
buyprice.value=s.buy;
sqty.value=s.qty;
sname2.value=s.sellname;
sellprice.value=s.sell;
stocks.splice(i,1);
save();renderStock();updateDashboard();
}

/* ================= EXPENSE ================= */
function addExpense(){
expenses.push({amt:eamt.value});
save();renderExpense();updateDashboard();
}

function renderExpense(){
expenseList.innerHTML="";
expenses.forEach((e,i)=>{
expenseList.innerHTML+=`
<div class="card">
${e.amt}
<div class="action">
<div class="smallbtn" onclick="editExpense(${i})">Edit</div>
<div class="smallbtn del" onclick="delExpense(${i})">Delete</div>
</div>
</div>`;
});
}

function delExpense(i){
expenses.splice(i,1);
save();renderExpense();updateDashboard();
}

function editExpense(i){
let e=expenses[i];
eamt.value=e.amt;
expenses.splice(i,1);
save();renderExpense();updateDashboard();
}

/* ================= INCOME ================= */
function addIncome(){
incomes.push({amt:iamt.value});
save();renderIncome();updateDashboard();
}

function renderIncome(){
incomeList.innerHTML="";
incomes.forEach((i,j)=>{
incomeList.innerHTML+=`
<div class="card">
${i.amt}
<div class="action">
<div class="smallbtn" onclick="editIncome(${j})">Edit</div>
<div class="smallbtn del" onclick="delIncome(${j})">Delete</div>
</div>
</div>`;
});
}

function delIncome(i){
incomes.splice(i,1);
save();renderIncome();updateDashboard();
}

function editIncome(i){
let x=incomes[i];
iamt.value=x.amt;
incomes.splice(i,1);
save();renderIncome();updateDashboard();
}

/* ================= INVESTMENT ================= */
function addInvest(){
invests.push({amt:iamount.value});
save();renderInvest();updateDashboard();
}

function renderInvest(){
investList.innerHTML="";
invests.forEach((i,k)=>{
investList.innerHTML+=`
<div class="card">
${i.amt}
<div class="action">
<div class="smallbtn" onclick="editInvest(${k})">Edit</div>
<div class="smallbtn del" onclick="delInvest(${k})">Delete</div>
</div>
</div>`;
});
}

function delInvest(i){
invests.splice(i,1);
save();renderInvest();updateDashboard();
}

function editInvest(i){
let x=invests[i];
iamount.value=x.amt;
invests.splice(i,1);
save();renderInvest();updateDashboard();
}

/* ================= CALENDAR (RESTORED FIX) ================= */
function loadCalendar(){
let cal=document.getElementById("cal");
if(!cal) return;

cal.innerHTML="";
for(let i=1;i<=30;i++){
cal.innerHTML+=`<div class="day">${i}</div>`;
}
}

/* ================= MONTHLY INCOME (NEW FEATURE) ================= */
function addMonthlyIncome(){
monthlyIncome.push({amt:monamt.value});
save();renderMonthlyIncome();updateDashboard();
}

function renderMonthlyIncome(){
if(!document.getElementById("monthlyBox")) return;

document.getElementById("monthlyBox").innerHTML="";

monthlyIncome.forEach((m,i)=>{
document.getElementById("monthlyBox").innerHTML+=`
<div class="card">
Monthly Income: ${m.amt}
<div class="action">
<div class="smallbtn" onclick="editMonthly(${i})">Edit</div>
<div class="smallbtn del" onclick="delMonthly(${i})">Delete</div>
</div>
</div>`;
});
}

function delMonthly(i){
monthlyIncome.splice(i,1);
save();renderMonthlyIncome();updateDashboard();
}

function editMonthly(i){
let x=monthlyIncome[i];
monamt.value=x.amt;
monthlyIncome.splice(i,1);
save();renderMonthlyIncome();updateDashboard();
}

/* ================= DASHBOARD ================= */
function updateDashboard(){

let income = incomes.reduce((a,b)=>a+Number(b.amt||0),0);
let expense = expenses.reduce((a,b)=>a+Number(b.amt||0),0);
let invest = invests.reduce((a,b)=>a+Number(b.amt||0),0);

let stockProfit = stocks.reduce((a,b)=>{
return a + ((Number(b.sell||0) - Number(b.buy||0)) * Number(b.qty||1));
},0);

let profit = income + invest + stockProfit - expense;

/* HOME CHART */
let chart=document.getElementById("chart");
if(chart){
let val=Math.min(Math.abs(profit),100);
chart.innerHTML = profit>=0
? `<h3>Profit: ${profit}</h3><div style="background:green;width:${val}%;height:15px"></div>`
: `<h3>Loss: ${profit}</h3><div style="background:red;width:${val}%;height:15px"></div>`;
}

/* MONTHLY SUMMARY */
if(document.getElementById("monthlyBox")){
document.getElementById("monthlyBox").innerHTML=`
<div class="card">Stocks: ${stocks.length}</div>
<div class="card">Expenses: ${expenses.length}</div>
<div class="card">Income: ${incomes.length}</div>
<div class="card">Investments: ${invests.length}</div>
<div class="card">Monthly Income Entries: ${monthlyIncome.length}</div>
<div class="card">Profit: ${profit}</div>
`;
}
}

/* INIT */
loadCalendar();
renderStock();
renderExpense();
renderIncome();
renderInvest();
renderMonthlyIncome();
updateDashboard()