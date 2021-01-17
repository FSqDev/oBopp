const getCameras = async (userId) => {
    const res = await fetch("https://obopp.herokuapp.com/camlist/" + userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
      return await res.json();
    }

    throw new Error(await res.text());
};

export { getCameras }