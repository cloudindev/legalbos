async function test() {
  try {
    const fd = new FormData();
    fd.append("email", "counsel@firm.com");
    fd.append("password", "password123");
    fd.append("redirect", "false");
    
    // Simulate what next-auth does
    const res = await fetch("http://localhost:3000/api/auth/callback/credentials", {
      method: "POST",
      body: fd,
      headers: {
        "x-auth-return-redirect": "1"
      }
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
    console.log("Cookies:", res.headers.get("set-cookie"));
  } catch (e) {
    console.error(e);
  }
}
test();
