const env = {
    LANDING_PAGE_URL: "http://localhost:3000",
    APP_URL: "http://localhost:5173",
}

if (process.env.NODE_ENV === "production") {
    env.LANDING_PAGE_URL = "https://formify.com.br"
    env.APP_URL = "https://app.formify.com.br"
}

export default env