

const setUser = () => {
    localStorage.setItem("loginStatus", 'true')
}


const getUser = () => {
    const value = localStorage.getItem("loginStatus")
    if (value === "true") {
        return true
    } else {
        return false
    }
}

const LogoutUser = () => {
    localStorage.removeItem("loginStatus")
}

export { getUser, setUser, LogoutUser }