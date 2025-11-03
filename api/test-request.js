(async ()=>{
  try{
    const res = await fetch('http://localhost:3005/api/auth/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'testuser12345',email:'testuser12345@example.com',password:'pass1234'})});
    console.log('status',res.status);
    const text = await res.text();
    console.log('body:',text);
  }catch(e){console.error('err',e.message)}
})();