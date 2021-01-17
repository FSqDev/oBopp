const registerUser = async (registerInfo) => {
    const res = await fetch("https://obopp.herokuapp.com/register", {
        method: "POST",
        body: JSON.stringify(registerInfo),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
      return await res.json();
    }

    throw new Error(await res.text());
};

const loginUser = async (loginInfo) => {
    const res = await fetch("https://obopp.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
      return await res.json();
    }

    throw new Error(await res.text());
};

export { registerUser, loginUser }
