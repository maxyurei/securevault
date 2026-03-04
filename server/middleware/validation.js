export const validateSignup = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({error: 'Email and Password are required'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({error: 'Invalid email format'});
    }

    if (password.length < 6) {
        return res.status(400).json({error: 'Password must be at least 6 characters'});
    }

    next();
}

export const validatePassword = (req, res, next) => {
    const {website, username, password} = req.body;

    if (!website || !username || !password) {
        res.status(400).json({error: 'Websiter, username, and password are required'});
    }

    next();
}